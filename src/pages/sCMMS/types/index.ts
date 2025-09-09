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