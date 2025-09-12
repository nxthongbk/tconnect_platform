import { useEffect, useRef, useState } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  DirectionalLight,
  ShadowGenerator,
  Mesh,
  Animation,
  AnimationGroup,
  ActionManager,
  ExecuteCodeAction,
  Color4,
} from '@babylonjs/core';
import { mockEquipment } from '../data/mockData';
import { Equipment } from '../types';
import { Play, Pause, ZoomIn, ZoomOut, Home, Eye, EyeOff, Camera, X } from 'lucide-react';

interface Factory3DProps {
  selectedEquipment?: string | null;
  onEquipmentSelect?: (equipmentId: string) => void;
}

export default function Factory3D({
  selectedEquipment,
  onEquipmentSelect,
  isFullscreen,
  onClose,
}: Factory3DProps & { isFullscreen?: boolean; onClose?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const equipmentMeshes = useRef<Map<string, Mesh>>(new Map());
  const animationGroups = useRef<Map<string, AnimationGroup>>(new Map());

  const [isPlaying, setIsPlaying] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [cameraMode, setCameraMode] = useState<'free' | 'top' | 'side'>('free');
  const [showCameraStream, setShowCameraStream] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  const getCameraInfo = (cameraId: string) => {
    const cameras = {
      cam1: { name: 'Production Line Camera 1', location: 'Assembly Area', status: 'Online' },
      cam2: { name: 'Quality Control Camera', location: 'Inspection Station', status: 'Online' },
      cam3: { name: 'Warehouse Camera', location: 'Storage Area', status: 'Online' },
      cam4: { name: 'Security Camera', location: 'Main Entrance', status: 'Online' },
    };
    return (
      cameras[cameraId as keyof typeof cameras] || {
        name: 'Unknown Camera',
        location: 'Unknown',
        status: 'Offline',
      }
    );
  };

  const getCameraStreamUrl = (cameraId: string) => {
    // In a real application, this would return actual camera stream URLs
    const streamUrls = {
      cam1: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      cam2: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop',
      cam3: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      cam4: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop',
    };
    return (
      streamUrls[cameraId as keyof typeof streamUrls] ||
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'
    );
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Babylon.js
    const engine = new Engine(canvasRef.current, true);
    engineRef.current = engine;

    const scene = new Scene(engine);
    sceneRef.current = scene;
    scene.clearColor = new Color4(0.9, 0.95, 1);

    // Create camera
    const camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 3,
      50,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);
    camera.setTarget(Vector3.Zero());

    // Create lights
    const hemisphericLight = new HemisphericLight('hemisphericLight', new Vector3(0, 1, 0), scene);
    hemisphericLight.intensity = 0.6;

    const directionalLight = new DirectionalLight(
      'directionalLight',
      new Vector3(-1, -1, -1),
      scene
    );
    directionalLight.position = new Vector3(20, 40, 20);
    directionalLight.intensity = 0.8;

    // Create shadow generator
    const shadowGenerator = new ShadowGenerator(2048, directionalLight);
    shadowGenerator.useExponentialShadowMap = true;

    // Create factory floor
    const ground = MeshBuilder.CreateGround('ground', { width: 60, height: 40 }, scene);
    const groundMaterial = new StandardMaterial('groundMaterial', scene);
    groundMaterial.diffuseColor = new Color3(0.8, 0.8, 0.9);
    groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    // Create factory walls
    createFactoryWalls(scene, shadowGenerator);

    // Create equipment based on mock data
    createEquipment(scene, shadowGenerator);

    // Create production lines
    createProductionLines(scene);

    // Create security cameras
    createSecurityCameras(scene, shadowGenerator);

    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle resize
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  const createSecurityCameras = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    const cameraPositions = [
      { id: 'cam1', x: -25, y: 6, z: -15 },
      { id: 'cam2', x: 25, y: 6, z: -15 },
      { id: 'cam3', x: -25, y: 6, z: 15 },
      { id: 'cam4', x: 25, y: 6, z: 15 },
    ];

    cameraPositions.forEach(pos => {
      // Camera body
      const cameraBody = MeshBuilder.CreateCylinder(
        `${pos.id}_body`,
        { height: 0.8, diameter: 0.6 },
        scene
      );
      cameraBody.position = new Vector3(pos.x, pos.y, pos.z);
      cameraBody.rotation.z = Math.PI / 2;

      // Camera lens
      const cameraLens = MeshBuilder.CreateCylinder(
        `${pos.id}_lens`,
        { height: 0.3, diameter: 0.4 },
        scene
      );
      cameraLens.position = new Vector3(pos.x - 0.4, pos.y, pos.z);
      cameraLens.rotation.z = Math.PI / 2;

      // Camera mount
      const cameraMount = MeshBuilder.CreateBox(
        `${pos.id}_mount`,
        { width: 0.3, height: 0.3, depth: 0.3 },
        scene
      );
      cameraMount.position = new Vector3(pos.x, pos.y + 0.5, pos.z);

      // Materials
      const cameraMaterial = new StandardMaterial(`${pos.id}_material`, scene);
      cameraMaterial.diffuseColor = new Color3(0.2, 0.2, 0.2);
      cameraMaterial.specularColor = new Color3(0.5, 0.5, 0.5);

      const lensMaterial = new StandardMaterial(`${pos.id}_lens_material`, scene);
      lensMaterial.diffuseColor = new Color3(0.1, 0.1, 0.3);
      lensMaterial.emissiveColor = new Color3(0.05, 0.05, 0.1);

      cameraBody.material = cameraMaterial;
      cameraLens.material = lensMaterial;
      cameraMount.material = cameraMaterial;

      // Add shadows
      shadowGenerator.addShadowCaster(cameraBody);
      shadowGenerator.addShadowCaster(cameraLens);
      shadowGenerator.addShadowCaster(cameraMount);

      // Add click interaction
      cameraBody.actionManager = new ActionManager(scene);
      cameraBody.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
          setSelectedCamera(pos.id);
          setShowCameraStream(true);
        })
      );

      // Camera rotation animation
      const rotationAnimation = new Animation(
        `${pos.id}_rotation`,
        'rotation.y',
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
      );

      const rotationKeys = [];
      rotationKeys.push({ frame: 0, value: 0 });
      rotationKeys.push({ frame: 300, value: Math.PI / 2 });
      rotationKeys.push({ frame: 600, value: -Math.PI / 2 });
      rotationKeys.push({ frame: 900, value: 0 });

      rotationAnimation.setKeys(rotationKeys);
      scene.beginAnimation(cameraBody, 0, 900, true);
    });
  };

  const createFactoryWalls = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    // Back wall
    const backWall = MeshBuilder.CreateBox('backWall', { width: 60, height: 8, depth: 1 }, scene);
    backWall.position = new Vector3(0, 4, -20);

    // Side walls
    const leftWall = MeshBuilder.CreateBox('leftWall', { width: 1, height: 8, depth: 40 }, scene);
    leftWall.position = new Vector3(-30, 4, 0);

    const rightWall = MeshBuilder.CreateBox('rightWall', { width: 1, height: 8, depth: 40 }, scene);
    rightWall.position = new Vector3(30, 4, 0);

    // Wall material
    const wallMaterial = new StandardMaterial('wallMaterial', scene);
    wallMaterial.diffuseColor = new Color3(0.9, 0.9, 0.9);

    [backWall, leftWall, rightWall].forEach(wall => {
      wall.material = wallMaterial;
      wall.receiveShadows = true;
      shadowGenerator.addShadowCaster(wall);
    });
  };

  const createProductionLines = (scene: Scene) => {
    // Conveyor belts
    for (let i = 0; i < 3; i++) {
      const conveyor = MeshBuilder.CreateBox(
        `conveyor${i}`,
        { width: 25, height: 0.5, depth: 2 },
        scene
      );
      conveyor.position = new Vector3(0, 0.25, -10 + i * 10);

      const conveyorMaterial = new StandardMaterial(`conveyorMaterial${i}`, scene);
      conveyorMaterial.diffuseColor = new Color3(0.3, 0.3, 0.3);
      conveyor.material = conveyorMaterial;
    }
  };

  const createEquipment = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    const positions = [
      { x: -20, z: -15 }, // Hydraulic Press A1
      { x: 0, z: -5 }, // Conveyor Belt B2
      { x: 20, z: 5 }, // Welding Robot R3
      { x: -10, z: 15 }, // CNC Machine M4
    ];

    mockEquipment.forEach((equipment, index) => {
      const position = positions[index] || { x: 0, z: 0 };
      const mesh = createEquipmentMesh(equipment, position, scene, shadowGenerator);
      equipmentMeshes.current.set(equipment.id, mesh);

      // Create animations based on status
      createEquipmentAnimation(equipment, mesh, scene);
    });
  };

  const createEquipmentMesh = (
    equipment: Equipment,
    position: { x: number; z: number },
    scene: Scene,
    shadowGenerator: ShadowGenerator
  ): Mesh => {
    let mesh: Mesh | null = null;
    let parentMesh: Mesh;

    // Create different shapes based on equipment type
    switch (equipment.category) {
      case 'Hydraulic Press':
        parentMesh = MeshBuilder.CreateBox(equipment.id, { width: 4, height: 6, depth: 3 }, scene);
        mesh = parentMesh;
        break;
      case 'Conveyor':
        parentMesh = createModernConveyorBelt(equipment.id, scene, shadowGenerator);
        mesh = parentMesh;
        break;
      case 'Welding Robot':
        parentMesh = MeshBuilder.CreateCylinder(equipment.id, { height: 5, diameter: 2 }, scene);
        mesh = parentMesh;
        break;
      case 'CNC Machine':
        // Tạo máy CNC hiện đại với nhiều thành phần
        parentMesh = createModernCNCMachine(equipment.id, scene, shadowGenerator);
        mesh = parentMesh;
        break;
      default:
        parentMesh = MeshBuilder.CreateBox(equipment.id, { width: 3, height: 3, depth: 3 }, scene);
        mesh = parentMesh;
    }

    if (!mesh) return parentMesh;

    mesh.position = new Vector3(
      position.x,
      mesh.getBoundingInfo().boundingBox.extendSize.y,
      position.z
    );

    // Create material based on status
    const material = new StandardMaterial(`${equipment.id}Material`, scene);
    switch (equipment.status) {
      case 'operational':
        material.diffuseColor = new Color3(0.2, 0.8, 0.2); // Green
        material.emissiveColor = new Color3(0.05, 0.2, 0.05);
        break;
      case 'maintenance':
        material.diffuseColor = new Color3(1, 0.6, 0); // Orange
        material.emissiveColor = new Color3(0.2, 0.12, 0);
        break;
      case 'broken':
        material.diffuseColor = new Color3(0.8, 0.2, 0.2); // Red
        material.emissiveColor = new Color3(0.2, 0.05, 0.05);
        break;
      default:
        material.diffuseColor = new Color3(0.5, 0.5, 0.5); // Gray
    }

    mesh.material = material;
    mesh.receiveShadows = true;
    shadowGenerator.addShadowCaster(mesh);

    // Add click interaction
    mesh.actionManager = new ActionManager(scene);
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
        if (onEquipmentSelect) {
          onEquipmentSelect(equipment.id);
        }
      })
    );

    return mesh;
  };

  const createModernCNCMachine = (
    id: string,
    scene: Scene,
    shadowGenerator: ShadowGenerator
  ): Mesh => {
    // Tạo nhóm mesh chính cho máy CNC
    const cncGroup = new Mesh(`${id}_group`, scene);

    // 1. Khung máy chính (Base)
    const base = MeshBuilder.CreateBox(`${id}_base`, { width: 6, height: 1, depth: 5 }, scene);
    base.position = new Vector3(0, 0.5, 0);
    base.parent = cncGroup;

    const baseMaterial = new StandardMaterial(`${id}_baseMaterial`, scene);
    baseMaterial.diffuseColor = new Color3(0.3, 0.3, 0.35);
    baseMaterial.specularColor = new Color3(0.5, 0.5, 0.5);
    base.material = baseMaterial;
    shadowGenerator.addShadowCaster(base);

    // 2. Cột dọc (Column)
    const column = MeshBuilder.CreateBox(
      `${id}_column`,
      { width: 1.5, height: 5, depth: 1.5 },
      scene
    );
    column.position = new Vector3(-2, 3.5, -1.5);
    column.parent = cncGroup;

    const columnMaterial = new StandardMaterial(`${id}_columnMaterial`, scene);
    columnMaterial.diffuseColor = new Color3(0.4, 0.4, 0.45);
    columnMaterial.specularColor = new Color3(0.6, 0.6, 0.6);
    column.material = columnMaterial;
    shadowGenerator.addShadowCaster(column);

    // 3. Đầu cắt (Spindle Head)
    const spindleHead = MeshBuilder.CreateBox(
      `${id}_spindleHead`,
      { width: 2, height: 1.5, depth: 2 },
      scene
    );
    spindleHead.position = new Vector3(-2, 5.5, -1.5);
    spindleHead.parent = cncGroup;

    const spindleMaterial = new StandardMaterial(`${id}_spindleMaterial`, scene);
    spindleMaterial.diffuseColor = new Color3(0.2, 0.2, 0.25);
    spindleMaterial.specularColor = new Color3(0.7, 0.7, 0.7);
    spindleHead.material = spindleMaterial;
    shadowGenerator.addShadowCaster(spindleHead);

    // 4. Trục cắt (Spindle)
    const spindle = MeshBuilder.CreateCylinder(
      `${id}_spindle`,
      { height: 2, diameter: 0.3 },
      scene
    );
    spindle.position = new Vector3(-2, 4.2, -1.5);
    spindle.parent = cncGroup;

    const spindleShaftMaterial = new StandardMaterial(`${id}_spindleShaftMaterial`, scene);
    spindleShaftMaterial.diffuseColor = new Color3(0.8, 0.8, 0.9);
    spindleShaftMaterial.specularColor = new Color3(0.9, 0.9, 0.9);
    spindle.material = spindleShaftMaterial;
    shadowGenerator.addShadowCaster(spindle);

    // 5. Bàn máy (Work Table)
    const workTable = MeshBuilder.CreateBox(
      `${id}_workTable`,
      { width: 4, height: 0.3, depth: 3 },
      scene
    );
    workTable.position = new Vector3(0, 1.65, 0);
    workTable.parent = cncGroup;

    const tableMaterial = new StandardMaterial(`${id}_tableMaterial`, scene);
    tableMaterial.diffuseColor = new Color3(0.5, 0.5, 0.55);
    tableMaterial.specularColor = new Color3(0.8, 0.8, 0.8);
    workTable.material = tableMaterial;
    shadowGenerator.addShadowCaster(workTable);

    // 6. Ray trượt X (X-axis Rail)
    const xRail = MeshBuilder.CreateBox(
      `${id}_xRail`,
      { width: 5, height: 0.2, depth: 0.3 },
      scene
    );
    xRail.position = new Vector3(0, 1.9, -1.2);
    xRail.parent = cncGroup;

    const railMaterial = new StandardMaterial(`${id}_railMaterial`, scene);
    railMaterial.diffuseColor = new Color3(0.6, 0.6, 0.65);
    railMaterial.specularColor = new Color3(0.9, 0.9, 0.9);
    xRail.material = railMaterial;
    shadowGenerator.addShadowCaster(xRail);

    // 7. Ray trượt Y (Y-axis Rail)
    const yRail = MeshBuilder.CreateBox(
      `${id}_yRail`,
      { width: 0.3, height: 0.2, depth: 4 },
      scene
    );
    yRail.position = new Vector3(-1.8, 1.9, 0);
    yRail.parent = cncGroup;
    yRail.material = railMaterial;
    shadowGenerator.addShadowCaster(yRail);

    // 8. Tủ điều khiển (Control Cabinet)
    const controlCabinet = MeshBuilder.CreateBox(
      `${id}_controlCabinet`,
      { width: 1.5, height: 3, depth: 1 },
      scene
    );
    controlCabinet.position = new Vector3(3.5, 2.5, 2);
    controlCabinet.parent = cncGroup;

    const cabinetMaterial = new StandardMaterial(`${id}_cabinetMaterial`, scene);
    cabinetMaterial.diffuseColor = new Color3(0.2, 0.3, 0.4);
    cabinetMaterial.specularColor = new Color3(0.4, 0.4, 0.4);
    controlCabinet.material = cabinetMaterial;
    shadowGenerator.addShadowCaster(controlCabinet);

    // 9. Màn hình điều khiển (Control Screen)
    const controlScreen = MeshBuilder.CreateBox(
      `${id}_controlScreen`,
      { width: 1.2, height: 0.8, depth: 0.1 },
      scene
    );
    controlScreen.position = new Vector3(3.5, 3.5, 2.55);
    controlScreen.parent = cncGroup;

    const screenMaterial = new StandardMaterial(`${id}_screenMaterial`, scene);
    screenMaterial.diffuseColor = new Color3(0.1, 0.1, 0.2);
    screenMaterial.emissiveColor = new Color3(0.0, 0.1, 0.2);
    controlScreen.material = screenMaterial;
    shadowGenerator.addShadowCaster(controlScreen);

    // 10. Đèn LED (LED Lights)
    const ledLight1 = MeshBuilder.CreateCylinder(
      `${id}_led1`,
      { height: 0.1, diameter: 0.3 },
      scene
    );
    ledLight1.position = new Vector3(-1, 6.2, -1);
    ledLight1.parent = cncGroup;

    const ledMaterial = new StandardMaterial(`${id}_ledMaterial`, scene);
    ledMaterial.diffuseColor = new Color3(0.9, 0.9, 1);
    ledMaterial.emissiveColor = new Color3(0.3, 0.3, 0.5);
    ledLight1.material = ledMaterial;

    const ledLight2 = MeshBuilder.CreateCylinder(
      `${id}_led2`,
      { height: 0.1, diameter: 0.3 },
      scene
    );
    ledLight2.position = new Vector3(-3, 6.2, -1);
    ledLight2.parent = cncGroup;
    ledLight2.material = ledMaterial;

    // 11. Hệ thống làm mát (Coolant System)
    const coolantTank = MeshBuilder.CreateCylinder(
      `${id}_coolantTank`,
      { height: 1.5, diameter: 1 },
      scene
    );
    coolantTank.position = new Vector3(2.5, 1.75, -2);
    coolantTank.parent = cncGroup;

    const coolantMaterial = new StandardMaterial(`${id}_coolantMaterial`, scene);
    coolantMaterial.diffuseColor = new Color3(0.3, 0.5, 0.7);
    coolantMaterial.specularColor = new Color3(0.6, 0.6, 0.8);
    coolantTank.material = coolantMaterial;
    shadowGenerator.addShadowCaster(coolantTank);

    // 12. Ống dẫn coolant
    const coolantPipe = MeshBuilder.CreateCylinder(
      `${id}_coolantPipe`,
      { height: 3, diameter: 0.1 },
      scene
    );
    coolantPipe.position = new Vector3(-1.5, 4, -1.5);
    coolantPipe.rotation.z = Math.PI / 6;
    coolantPipe.parent = cncGroup;

    const pipeMaterial = new StandardMaterial(`${id}_pipeMaterial`, scene);
    pipeMaterial.diffuseColor = new Color3(0.4, 0.4, 0.4);
    coolantPipe.material = pipeMaterial;
    shadowGenerator.addShadowCaster(coolantPipe);

    // Lưu các thành phần có thể di chuyển để tạo animation
    cncGroup.metadata = {
      spindle: spindle,
      workTable: workTable,
      spindleHead: spindleHead,
    };

    return cncGroup;
  };

  const createModernConveyorBelt = (
    id: string,
    scene: Scene,
    shadowGenerator: ShadowGenerator
  ): Mesh => {
    // Tạo nhóm mesh chính cho băng tải
    const conveyorGroup = new Mesh(`${id}_group`, scene);

    // 1. Khung băng tải chính (Main Frame)
    const mainFrame = MeshBuilder.CreateBox(
      `${id}_mainFrame`,
      { width: 12, height: 0.8, depth: 3 },
      scene
    );
    mainFrame.position = new Vector3(0, 0.4, 0);
    mainFrame.parent = conveyorGroup;

    const frameMaterial = new StandardMaterial(`${id}_frameMaterial`, scene);
    frameMaterial.diffuseColor = new Color3(0.3, 0.3, 0.35); // Màu xám đậm cho khung
    frameMaterial.specularColor = new Color3(0.5, 0.5, 0.5);
    mainFrame.material = frameMaterial;
    shadowGenerator.addShadowCaster(mainFrame);

    // 2. Băng tải chính (Conveyor Belt) - Màu xanh hiện đại
    const conveyorBelt = MeshBuilder.CreateBox(
      `${id}_belt`,
      { width: 11.5, height: 0.2, depth: 2.5 },
      scene
    );
    conveyorBelt.position = new Vector3(0, 0.9, 0);
    conveyorBelt.parent = conveyorGroup;

    const beltMaterial = new StandardMaterial(`${id}_beltMaterial`, scene);
    beltMaterial.diffuseColor = new Color3(0.1, 0.6, 0.8); // Màu xanh hiện đại
    beltMaterial.specularColor = new Color3(0.3, 0.7, 0.9);
    beltMaterial.emissiveColor = new Color3(0.02, 0.12, 0.16); // Ánh sáng nhẹ
    conveyorBelt.material = beltMaterial;
    shadowGenerator.addShadowCaster(conveyorBelt);

    // 3. Các con lăn đầu và cuối (End Rollers)
    const roller1 = MeshBuilder.CreateCylinder(
      `${id}_roller1`,
      { height: 2.8, diameter: 0.6 },
      scene
    );
    roller1.position = new Vector3(-5.5, 0.9, 0);
    roller1.rotation.z = Math.PI / 2;
    roller1.parent = conveyorGroup;

    const roller2 = MeshBuilder.CreateCylinder(
      `${id}_roller2`,
      { height: 2.8, diameter: 0.6 },
      scene
    );
    roller2.position = new Vector3(5.5, 0.9, 0);
    roller2.rotation.z = Math.PI / 2;
    roller2.parent = conveyorGroup;

    const rollerMaterial = new StandardMaterial(`${id}_rollerMaterial`, scene);
    rollerMaterial.diffuseColor = new Color3(0.4, 0.4, 0.45);
    rollerMaterial.specularColor = new Color3(0.7, 0.7, 0.7);
    roller1.material = rollerMaterial;
    roller2.material = rollerMaterial;
    shadowGenerator.addShadowCaster(roller1);
    shadowGenerator.addShadowCaster(roller2);

    // 4. Các con lăn hỗ trợ (Support Rollers)
    for (let i = -3; i <= 3; i += 2) {
      const supportRoller = MeshBuilder.CreateCylinder(
        `${id}_supportRoller_${i}`,
        { height: 2.6, diameter: 0.3 },
        scene
      );
      supportRoller.position = new Vector3(i, 0.6, 0);
      supportRoller.rotation.z = Math.PI / 2;
      supportRoller.parent = conveyorGroup;
      supportRoller.material = rollerMaterial;
      shadowGenerator.addShadowCaster(supportRoller);
    }

    // 5. Chân đỡ (Support Legs)
    const legPositions = [
      { x: -4, z: -1 },
      { x: -4, z: 1 },
      { x: 0, z: -1 },
      { x: 0, z: 1 },
      { x: 4, z: -1 },
      { x: 4, z: 1 },
    ];

    legPositions.forEach((pos, index) => {
      const leg = MeshBuilder.CreateCylinder(
        `${id}_leg_${index}`,
        { height: 0.8, diameter: 0.2 },
        scene
      );
      leg.position = new Vector3(pos.x, 0.4, pos.z);
      leg.parent = conveyorGroup;

      const legMaterial = new StandardMaterial(`${id}_legMaterial_${index}`, scene);
      legMaterial.diffuseColor = new Color3(0.5, 0.5, 0.55);
      legMaterial.specularColor = new Color3(0.6, 0.6, 0.6);
      leg.material = legMaterial;
      shadowGenerator.addShadowCaster(leg);
    });

    // 6. Hộp điều khiển (Control Box)
    const controlBox = MeshBuilder.CreateBox(
      `${id}_controlBox`,
      { width: 1, height: 1.2, depth: 0.6 },
      scene
    );
    controlBox.position = new Vector3(-6, 1.4, 1.8);
    controlBox.parent = conveyorGroup;

    const controlBoxMaterial = new StandardMaterial(`${id}_controlBoxMaterial`, scene);
    controlBoxMaterial.diffuseColor = new Color3(0.2, 0.3, 0.4);
    controlBoxMaterial.specularColor = new Color3(0.4, 0.4, 0.4);
    controlBox.material = controlBoxMaterial;
    shadowGenerator.addShadowCaster(controlBox);

    // 7. Đèn LED báo trạng thái (Status LED)
    const statusLED = MeshBuilder.CreateCylinder(
      `${id}_statusLED`,
      { height: 0.1, diameter: 0.2 },
      scene
    );
    statusLED.position = new Vector3(-6, 2.1, 1.8);
    statusLED.parent = conveyorGroup;

    const ledMaterial = new StandardMaterial(`${id}_ledMaterial`, scene);
    ledMaterial.diffuseColor = new Color3(0.2, 0.8, 0.2); // Đèn xanh lá
    ledMaterial.emissiveColor = new Color3(0.1, 0.4, 0.1);
    statusLED.material = ledMaterial;

    // 8. Cảm biến (Sensors)
    const sensor1 = MeshBuilder.CreateBox(
      `${id}_sensor1`,
      { width: 0.3, height: 0.2, depth: 0.2 },
      scene
    );
    sensor1.position = new Vector3(-3, 1.3, 1.5);
    sensor1.parent = conveyorGroup;

    const sensor2 = MeshBuilder.CreateBox(
      `${id}_sensor2`,
      { width: 0.3, height: 0.2, depth: 0.2 },
      scene
    );
    sensor2.position = new Vector3(3, 1.3, 1.5);
    sensor2.parent = conveyorGroup;

    const sensorMaterial = new StandardMaterial(`${id}_sensorMaterial`, scene);
    sensorMaterial.diffuseColor = new Color3(0.8, 0.2, 0.2); // Màu đỏ cho cảm biến
    sensorMaterial.emissiveColor = new Color3(0.2, 0.05, 0.05);
    sensor1.material = sensorMaterial;
    sensor2.material = sensorMaterial;
    shadowGenerator.addShadowCaster(sensor1);
    shadowGenerator.addShadowCaster(sensor2);

    // 9. Rào chắn an toàn (Safety Guards)
    const safetyGuard1 = MeshBuilder.CreateBox(
      `${id}_safetyGuard1`,
      { width: 0.1, height: 1, depth: 3 },
      scene
    );
    safetyGuard1.position = new Vector3(-6.2, 1.3, 0);
    safetyGuard1.parent = conveyorGroup;

    const safetyGuard2 = MeshBuilder.CreateBox(
      `${id}_safetyGuard2`,
      { width: 0.1, height: 1, depth: 3 },
      scene
    );
    safetyGuard2.position = new Vector3(6.2, 1.3, 0);
    safetyGuard2.parent = conveyorGroup;

    const guardMaterial = new StandardMaterial(`${id}_guardMaterial`, scene);
    guardMaterial.diffuseColor = new Color3(0.9, 0.9, 0.2); // Màu vàng cảnh báo
    guardMaterial.specularColor = new Color3(0.8, 0.8, 0.3);
    guardMaterial.alpha = 0.7; // Trong suốt một phần
    safetyGuard1.material = guardMaterial;
    safetyGuard2.material = guardMaterial;
    shadowGenerator.addShadowCaster(safetyGuard1);
    shadowGenerator.addShadowCaster(safetyGuard2);

    // 10. Biển báo (Warning Signs)
    const warningSign = MeshBuilder.CreateBox(
      `${id}_warningSign`,
      { width: 0.8, height: 0.6, depth: 0.05 },
      scene
    );
    warningSign.position = new Vector3(-6, 2.5, 1.8);
    warningSign.parent = conveyorGroup;

    const signMaterial = new StandardMaterial(`${id}_signMaterial`, scene);
    signMaterial.diffuseColor = new Color3(0.9, 0.9, 0.1);
    signMaterial.emissiveColor = new Color3(0.2, 0.2, 0.02);
    warningSign.material = signMaterial;
    shadowGenerator.addShadowCaster(warningSign);

    // Lưu các thành phần có thể di chuyển để tạo animation
    conveyorGroup.metadata = {
      belt: conveyorBelt,
      roller1: roller1,
      roller2: roller2,
      statusLED: statusLED,
    };

    return conveyorGroup;
  };

  const createEquipmentAnimation = (equipment: Equipment, mesh: Mesh, scene: Scene) => {
    if (equipment.status !== 'operational') return;

    const animationGroup = new AnimationGroup(`${equipment.id}Animation`, scene);

    // Create different animations based on equipment type
    switch (equipment.category) {
      case 'Hydraulic Press':
        // Up and down movement
        const pressAnimation = new Animation(
          `${equipment.id}Press`,
          'position.y',
          30,
          Animation.ANIMATIONTYPE_FLOAT,
          Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const pressKeys = [];
        pressKeys.push({
          frame: 0,
          value: mesh.position.y,
        });
        pressKeys.push({
          frame: 60,
          value: mesh.position.y - 0.5,
        });
        pressKeys.push({
          frame: 120,
          value: mesh.position.y,
        });

        pressAnimation.setKeys(pressKeys);
        animationGroup.addTargetedAnimation(pressAnimation, mesh);
        break;

      case 'Conveyor':
        // Animation phức tạp cho băng tải hiện đại
        if (mesh.metadata && mesh.metadata.belt) {
          // Animation di chuyển băng tải (Belt Movement)
          const beltMovement = new Animation(
            `${equipment.id}BeltMovement`,
            'material.diffuseTexture.uOffset',
            30,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          const beltKeys = [];
          beltKeys.push({
            frame: 0,
            value: 0,
          });
          beltKeys.push({
            frame: 120,
            value: 1,
          });

          beltMovement.setKeys(beltKeys);
          // animationGroup.addTargetedAnimation(beltMovement, mesh.metadata.belt);

          // Animation quay con lăn (Roller Rotation)
          const rollerRotation1 = new Animation(
            `${equipment.id}RollerRotation1`,
            'rotation.x',
            30,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          const rollerKeys = [];
          rollerKeys.push({
            frame: 0,
            value: 0,
          });
          rollerKeys.push({
            frame: 60,
            value: Math.PI * 2,
          });

          rollerRotation1.setKeys(rollerKeys);
          animationGroup.addTargetedAnimation(rollerRotation1, mesh.metadata.roller1);

          const rollerRotation2 = new Animation(
            `${equipment.id}RollerRotation2`,
            'rotation.x',
            30,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          rollerRotation2.setKeys(rollerKeys);
          animationGroup.addTargetedAnimation(rollerRotation2, mesh.metadata.roller2);

          // Animation nhấp nháy đèn LED (LED Blinking)
          const ledBlinking = new Animation(
            `${equipment.id}LEDBlinking`,
            'material.emissiveColor',
            15,
            Animation.ANIMATIONTYPE_COLOR3,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          const ledKeys = [];
          ledKeys.push({
            frame: 0,
            value: new Color3(0.1, 0.4, 0.1),
          });
          ledKeys.push({
            frame: 30,
            value: new Color3(0.3, 0.8, 0.3),
          });
          ledKeys.push({
            frame: 60,
            value: new Color3(0.1, 0.4, 0.1),
          });

          ledBlinking.setKeys(ledKeys);
          animationGroup.addTargetedAnimation(ledBlinking, mesh.metadata.statusLED);
        }
        break;

      case 'Welding Robot':
        // Rotation animation
        const robotAnimation = new Animation(
          `${equipment.id}Rotate`,
          'rotation.y',
          30,
          Animation.ANIMATIONTYPE_FLOAT,
          Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const robotKeys = [];
        robotKeys.push({
          frame: 0,
          value: 0,
        });
        robotKeys.push({
          frame: 180,
          value: Math.PI * 2,
        });

        robotAnimation.setKeys(robotKeys);
        animationGroup.addTargetedAnimation(robotAnimation, mesh);
        break;

      case 'CNC Machine':
        // Animation phức tạp cho máy CNC hiện đại
        if (mesh.metadata && mesh.metadata.spindle) {
          // Animation quay trục chính (Spindle rotation)
          const spindleRotation = new Animation(
            `${equipment.id}SpindleRotation`,
            'rotation.y',
            60,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          const spindleKeys = [];
          spindleKeys.push({
            frame: 0,
            value: 0,
          });
          spindleKeys.push({
            frame: 60,
            value: Math.PI * 4, // Quay nhanh
          });

          spindleRotation.setKeys(spindleKeys);
          animationGroup.addTargetedAnimation(spindleRotation, mesh.metadata.spindle);

          // Animation di chuyển đầu cắt lên xuống (Z-axis movement)
          const spindleHeadMovement = new Animation(
            `${equipment.id}SpindleHeadMovement`,
            'position.y',
            30,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          const headKeys = [];
          const originalY = mesh.metadata.spindleHead.position.y;
          headKeys.push({
            frame: 0,
            value: originalY,
          });
          headKeys.push({
            frame: 90,
            value: originalY - 0.8,
          });
          headKeys.push({
            frame: 180,
            value: originalY,
          });

          spindleHeadMovement.setKeys(headKeys);
          animationGroup.addTargetedAnimation(spindleHeadMovement, mesh.metadata.spindleHead);

          // Animation di chuyển bàn máy (X-axis movement)
          const tableMovement = new Animation(
            `${equipment.id}TableMovement`,
            'position.x',
            45,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE
          );

          const tableKeys = [];
          const originalX = mesh.metadata.workTable.position.x;
          tableKeys.push({
            frame: 0,
            value: originalX,
          });
          tableKeys.push({
            frame: 135,
            value: originalX + 0.5,
          });
          tableKeys.push({
            frame: 270,
            value: originalX - 0.5,
          });
          tableKeys.push({
            frame: 405,
            value: originalX,
          });

          tableMovement.setKeys(tableKeys);
          animationGroup.addTargetedAnimation(tableMovement, mesh.metadata.workTable);
        }
        break;
    }

    animationGroup.play(true);
    animationGroups.current.set(equipment.id, animationGroup);
  };

  const toggleAnimation = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (isPlaying) {
      scene.animationGroups.forEach(group => group.pause());
    } else {
      scene.animationGroups.forEach(group => group.play(true));
    }
    setIsPlaying(!isPlaying);
  };

  const resetCamera = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    const camera = scene.activeCamera as ArcRotateCamera;
    camera.setTarget(Vector3.Zero());
    camera.alpha = -Math.PI / 2;
    camera.beta = Math.PI / 3;
    camera.radius = 50;
    setCameraMode('free');
  };

  const setCameraView = (mode: 'free' | 'top' | 'side') => {
    const scene = sceneRef.current;
    if (!scene) return;

    const camera = scene.activeCamera as ArcRotateCamera;

    switch (mode) {
      case 'top':
        camera.alpha = 0;
        camera.beta = 0.1;
        camera.radius = 60;
        break;
      case 'side':
        camera.alpha = 0;
        camera.beta = Math.PI / 2;
        camera.radius = 50;
        break;
      default:
        camera.alpha = -Math.PI / 2;
        camera.beta = Math.PI / 3;
        camera.radius = 50;
    }
    setCameraMode(mode);
  };

  const zoomIn = () => {
    const scene = sceneRef.current;
    if (!scene) return;
    const camera = scene.activeCamera as ArcRotateCamera;
    camera.radius = Math.max(camera.radius - 5, 10);
  };

  const zoomOut = () => {
    const scene = sceneRef.current;
    if (!scene) return;
    const camera = scene.activeCamera as ArcRotateCamera;
    camera.radius = Math.min(camera.radius + 5, 100);
  };

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
      {/* Fullscreen Close Button */}
      {isFullscreen && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right- z-50 bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 rounded-full p-2 shadow-xl transition-colors"
          title="Close Fullscreen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" style={{ outline: 'none' }} />

      {/* Control Panel */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAnimation}
              className={`p-2 rounded-lg transition-colors ${
                isPlaying
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isPlaying ? 'Pause Animation' : 'Play Animation'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={resetCamera}
              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              title="Reset Camera"
            >
              <Home size={16} />
            </button>

            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`p-2 rounded-lg transition-colors ${
                showLabels
                  ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={showLabels ? 'Hide Labels' : 'Show Labels'}
            >
              {showLabels ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={zoomIn}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>

            <button
              onClick={zoomOut}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>

            <button
              onClick={() => setCameraView('top')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                cameraMode === 'top'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Top
            </button>

            <button
              onClick={() => setCameraView('side')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                cameraMode === 'side'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Side
            </button>
          </div>
        </div>
      </div>

      {/* Equipment Status Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Equipment Status</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Maintenance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Broken</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Offline</span>
          </div>
        </div>
      </div>

      {/* Equipment Info Panel */}
      {selectedEquipment && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-sm">
          {(() => {
            const equipment = mockEquipment.find(e => e.id === selectedEquipment);
            if (!equipment) return null;

            return (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{equipment.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Model:</span> {equipment.model}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> {equipment.location}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        equipment.status === 'operational'
                          ? 'bg-green-100 text-green-800'
                          : equipment.status === 'maintenance'
                            ? 'bg-orange-100 text-orange-800'
                            : equipment.status === 'broken'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {equipment.status}
                    </span>
                  </p>
                  {equipment.lastMaintenance && (
                    <p>
                      <span className="font-medium">Last Maintenance:</span>{' '}
                      {equipment.lastMaintenance}
                    </p>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white rounded-xl p-3 text-xs">
        <p>Click and drag to rotate • Scroll to zoom • Click equipment/cameras for details</p>
      </div>

      {/* Camera Stream Modal */}
      {showCameraStream && selectedCamera && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Camera className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {getCameraInfo(selectedCamera).name}
                  </h2>
                  <p className="text-sm text-gray-600">{getCameraInfo(selectedCamera).location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">
                    {getCameraInfo(selectedCamera).status}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowCameraStream(false);
                    setSelectedCamera(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Camera Stream */}
            <div className="p-6">
              <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={getCameraStreamUrl(selectedCamera)}
                  alt="Camera Stream"
                  className="w-full h-96 object-cover"
                />

                {/* Stream Overlay */}
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  🔴 LIVE
                </div>

                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-mono">
                  {new Date().toLocaleTimeString()}
                </div>

                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-xs">
                  Camera ID: {selectedCamera.toUpperCase()}
                </div>
              </div>

              {/* Camera Controls */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Camera Settings</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Resolution:</span>
                      <span className="font-medium">1920x1080</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frame Rate:</span>
                      <span className="font-medium">30 FPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="font-medium">HD</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Recording</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      🔴 Start Recording
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      📸 Take Screenshot
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">PTZ Controls</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      ↖️
                    </button>
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      ⬆️
                    </button>
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      ↗️
                    </button>
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      ⬅️
                    </button>
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      🏠
                    </button>
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      ➡️
                    </button>
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      ↙️
                    </button>
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      ⬇️
                    </button>
                    <button className="bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      ↘️
                    </button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      🔍+
                    </button>
                    <button className="flex-1 bg-white hover:bg-gray-100 border border-gray-300 py-2 px-3 rounded-lg text-sm transition-colors">
                      🔍-
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
