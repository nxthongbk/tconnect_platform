import { Equipment, MaintenanceRecord, InventoryItem, User } from '../types';

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Hydraulic Press A1',
    model: 'HP-2000X',
    serialNumber: 'HP2000X-001',
    category: 'Hydraulic Press',
    location: 'Production Line A - Zone 1',
    status: 'operational',
    installDate: '2022-01-15',
    lastMaintenance: '2024-11-01',
    nextMaintenance: '2024-12-01',
    maintenanceInterval: 30,
    description: 'Main hydraulic press for component manufacturing',
    imageUrl: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Conveyor Belt B2',
    model: 'CT-500L',
    serialNumber: 'CT500L-087',
    category: 'Conveyor',
    location: 'Production Line B - Zone 2',
    status: 'maintenance',
    installDate: '2021-08-20',
    lastMaintenance: '2024-11-10',
    nextMaintenance: '2024-11-15',
    maintenanceInterval: 14,
    description: 'Product transport conveyor between stations',
    imageUrl: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Welding Robot R3',
    model: 'WR-600',
    serialNumber: 'WR600-155',
    category: 'Welding Robot',
    location: 'Production Line C - Zone 3',
    status: 'broken',
    installDate: '2023-03-10',
    lastMaintenance: '2024-10-25',
    nextMaintenance: '2024-11-25',
    maintenanceInterval: 21,
    description: 'Automated welding robot for production process',
    imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'CNC Machine M4',
    model: 'CNC-1500',
    serialNumber: 'CNC1500-042',
    category: 'CNC Machine',
    location: 'Machining Center - Zone 1',
    status: 'operational',
    installDate: '2022-06-12',
    lastMaintenance: '2024-10-20',
    nextMaintenance: '2024-11-20',
    maintenanceInterval: 30,
    description: 'Precision CNC machining center',
    imageUrl: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockMaintenance: MaintenanceRecord[] = [
  {
    id: 'M001',
    equipmentId: '1',
    equipmentName: 'Hydraulic Press A1',
    type: 'preventive',
    status: 'completed',
    scheduledDate: '2024-11-01',
    completedDate: '2024-11-01',
    technician: 'John Smith',
    description: 'Routine hydraulic system maintenance',
    partsUsed: [
      { itemId: 'P001', itemName: 'Hydraulic Oil', quantity: 5, unitPrice: 25 },
      { itemId: 'P002', itemName: 'Gasket Seal', quantity: 2, unitPrice: 15 }
    ],
    cost: 155,
    duration: 120,
    notes: 'Oil change and system check completed successfully',
    beforeImages: [
      'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    afterImages: [
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=400'
    ]
  },
  {
    id: 'M002',
    equipmentId: '2',
    equipmentName: 'Conveyor Belt B2',
    type: 'corrective',
    status: 'in-progress',
    scheduledDate: '2024-11-12',
    technician: 'Sarah Johnson',
    description: 'Repair faulty conveyor motor',
    partsUsed: [
      { itemId: 'P003', itemName: '3HP Electric Motor', quantity: 1, unitPrice: 450 }
    ],
    cost: 450,
    duration: 180,
    notes: 'Replacing motor unit',
    beforeImages: [
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    afterImages: []
  },
  {
    id: 'M003',
    equipmentId: '4',
    equipmentName: 'CNC Machine M4',
    type: 'preventive',
    status: 'scheduled',
    scheduledDate: '2024-11-20',
    technician: 'Mike Wilson',
    description: 'Monthly precision calibration and lubrication',
    partsUsed: [],
    cost: 0,
    duration: 90,
    notes: 'Scheduled maintenance',
    beforeImages: [],
    afterImages: []
  }
];

// Additional maintenance records for equipment history
export const additionalMaintenanceHistory: MaintenanceRecord[] = [
  {
    id: 'M004',
    equipmentId: '1',
    equipmentName: 'Hydraulic Press A1',
    type: 'preventive',
    status: 'completed',
    scheduledDate: '2024-10-01',
    completedDate: '2024-10-01',
    technician: 'Mike Wilson',
    description: 'Monthly hydraulic system inspection',
    partsUsed: [
      { itemId: 'P002', itemName: 'Gasket Seal', quantity: 1, unitPrice: 15 }
    ],
    cost: 85,
    duration: 90,
    notes: 'Routine inspection completed, minor seal replacement'
  },
  {
    id: 'M005',
    equipmentId: '1',
    equipmentName: 'Hydraulic Press A1',
    type: 'corrective',
    status: 'completed',
    scheduledDate: '2024-09-15',
    completedDate: '2024-09-15',
    technician: 'Sarah Johnson',
    description: 'Pressure sensor calibration',
    partsUsed: [],
    cost: 120,
    duration: 60,
    notes: 'Sensor recalibrated to factory specifications'
  },
  {
    id: 'M006',
    equipmentId: '2',
    equipmentName: 'Conveyor Belt B2',
    type: 'preventive',
    status: 'completed',
    scheduledDate: '2024-10-28',
    completedDate: '2024-10-28',
    technician: 'John Smith',
    description: 'Belt tension adjustment and lubrication',
    partsUsed: [
      { itemId: 'P001', itemName: 'Hydraulic Oil', quantity: 2, unitPrice: 25 }
    ],
    cost: 75,
    duration: 45,
    notes: 'Belt tension optimized, all bearings lubricated'
  },
  {
    id: 'M007',
    equipmentId: '2',
    equipmentName: 'Conveyor Belt B2',
    type: 'emergency',
    status: 'completed',
    scheduledDate: '2024-09-22',
    completedDate: '2024-09-22',
    technician: 'Mike Wilson',
    description: 'Emergency belt replacement',
    partsUsed: [
      { itemId: 'P003', itemName: '3HP Electric Motor', quantity: 1, unitPrice: 450 }
    ],
    cost: 650,
    duration: 240,
    notes: 'Belt snapped during operation, replaced with upgraded model'
  },
  {
    id: 'M008',
    equipmentId: '3',
    equipmentName: 'Welding Robot R3',
    type: 'preventive',
    status: 'completed',
    scheduledDate: '2024-10-25',
    completedDate: '2024-10-25',
    technician: 'Sarah Johnson',
    description: 'Welding tip replacement and calibration',
    partsUsed: [
      { itemId: 'P004', itemName: 'Ball Bearing Set', quantity: 1, unitPrice: 35 }
    ],
    cost: 185,
    duration: 150,
    notes: 'New welding tips installed, robot recalibrated'
  },
  {
    id: 'M009',
    equipmentId: '4',
    equipmentName: 'CNC Machine M4',
    type: 'preventive',
    status: 'completed',
    scheduledDate: '2024-10-20',
    completedDate: '2024-10-20',
    technician: 'John Smith',
    description: 'Spindle maintenance and tool calibration',
    partsUsed: [
      { itemId: 'P001', itemName: 'Hydraulic Oil', quantity: 1, unitPrice: 25 },
      { itemId: 'P004', itemName: 'Ball Bearing Set', quantity: 2, unitPrice: 35 }
    ],
    cost: 195,
    duration: 180,
    notes: 'Spindle serviced, all cutting tools recalibrated'
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'P001',
    name: 'Hydraulic Oil',
    sku: 'OIL-HYD-001',
    category: 'Lubricants',
    unit: 'Liters',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unitPrice: 25,
    supplier: 'Industrial Lubricants Inc.',
    location: 'Warehouse A - Shelf 1',
    lastRestocked: '2024-10-15'
  },
  {
    id: 'P002',
    name: 'Gasket Seal',
    sku: 'SEAL-GAS-002',
    category: 'Seals',
    unit: 'Pieces',
    currentStock: 8,
    minStock: 10,
    maxStock: 50,
    unitPrice: 15,
    supplier: 'Precision Parts Ltd.',
    location: 'Warehouse B - Shelf 3',
    lastRestocked: '2024-09-20'
  },
  {
    id: 'P003',
    name: '3HP Electric Motor',
    sku: 'MOT-3HP-003',
    category: 'Motors',
    unit: 'Pieces',
    currentStock: 2,
    minStock: 1,
    maxStock: 5,
    unitPrice: 450,
    supplier: 'Motor Solutions Ltd',
    location: 'Warehouse C - Shelf 1',
    lastRestocked: '2024-11-01'
  },
  {
    id: 'P004',
    name: 'Ball Bearing Set',
    sku: 'BRG-BALL-004',
    category: 'Bearings',
    unit: 'Sets',
    currentStock: 15,
    minStock: 5,
    maxStock: 30,
    unitPrice: 35,
    supplier: 'Bearing Specialists Co.',
    location: 'Warehouse A - Shelf 2',
    lastRestocked: '2024-10-28'
  },
  {
    id: 'P005',
    name: 'Air Filter',
    sku: 'FLT-AIR-005',
    category: 'Filters',
    unit: 'Pieces',
    currentStock: 3,
    minStock: 8,
    maxStock: 25,
    unitPrice: 22,
    supplier: 'Filter Tech Solutions',
    location: 'Warehouse B - Shelf 1',
    lastRestocked: '2024-09-15'
  }
];

export const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'John Smith',
    email: 'john.smith@factory.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'technician',
    department: 'Maintenance'
  },
  {
    id: 'U002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@factory.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'technician',
    department: 'Maintenance'
  },
  {
    id: 'U003',
    name: 'Mike Wilson',
    email: 'mike.wilson@factory.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'supervisor',
    department: 'Production'
  },
  {
    id: 'U004',
    name: 'Emily Davis',
    email: 'emily.davis@factory.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'admin',
    department: 'Operations'
  }
];