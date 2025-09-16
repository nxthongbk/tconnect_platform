export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  category: string;
  location: string;
  status: 'operational' | 'maintenance' | 'broken' | 'offline';
  installDate: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  maintenanceInterval: number; // days
  description?: string;
  imageUrl?: string;
  oee?: {
    overall: number;
    availability: number;
    performance: number;
    quality: number;
    trend: number;
    lastUpdated: string;
    weeklyTrend: Array<{
      day: string;
      value: number;
    }>;
    insights: string[];
    recommendations: string[];
  };
}

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'preventive' | 'corrective' | 'emergency';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  completedDate?: string;
  technician: string;
  description: string;
  partsUsed: InventoryUsage[];
  cost: number;
  duration: number; // minutes
  notes?: string;
  beforeImages?: string[];
  afterImages?: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  supplier: string;
  location: string;
  lastRestocked: string;
}

export interface InventoryUsage {
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'technician' | 'supervisor';
  department: string;
}

export interface BlockchainTransaction {
  id: string;
  hash: string;
  timestamp: string;
  equipmentId: string;
  dataType: 'maintenance' | 'sensor' | 'status' | 'firmware';
  data: any;
  signature: string;
  verified: boolean;
  gasUsed?: number;
  blockNumber?: number;
}

export interface IoTDevice {
  id: string;
  equipmentId: string;
  deviceType: 'sensor' | 'controller' | 'gateway';
  macAddress: string;
  ipAddress: string;
  firmwareVersion: string;
  lastUpdate: string;
  status: 'online' | 'offline' | 'updating';
  batteryLevel?: number;
  signalStrength: number;
  sensors: IoTSensor[];
}

export interface IoTSensor {
  id: string;
  type: 'temperature' | 'vibration' | 'pressure' | 'humidity' | 'current' | 'voltage';
  value: number;
  unit: string;
  timestamp: string;
  threshold: {
    min: number;
    max: number;
  };
  status: 'normal' | 'warning' | 'critical';
}

export interface OTAUpdate {
  id: string;
  deviceId: string;
  firmwareVersion: string;
  updateSize: number;
  status: 'pending' | 'downloading' | 'installing' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  completedTime?: string;
  checksum: string;
  signature: string;
}