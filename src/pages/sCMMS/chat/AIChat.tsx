import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  BarChart3,
  Wrench,
  Package,
  Calendar,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Download,
  Eye,
  Shield,
  Wifi,
  Lock,
} from 'lucide-react';
import { mockEquipment, mockMaintenance, mockInventory } from '../data/mockData';
import { mockBlockchainTransactions, mockIoTDevices, mockOTAUpdates } from '../data/mockData';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  language?: string;
  hasReport?: boolean;
  reportData?: any;
}

interface AIResponse {
  text: string;
  hasReport?: boolean;
  reportData?: any;
}

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AIChat({ isOpen, onToggle }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Hello! I'm your Factory Management AI Assistant with voice support. I can help you with equipment status, maintenance schedules, inventory management, and generate reports. You can speak to me or type your questions!",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const getAIResponse = (message: string): AIResponse => {
    const lowerMessage = message.toLowerCase();

    // Blockchain queries
    if (lowerMessage.includes('blockchain') || lowerMessage.includes('transaction')) {
      const verifiedTransactions = mockBlockchainTransactions.filter(t => t.verified);
      const totalGasUsed = mockBlockchainTransactions.reduce((acc, t) => acc + (t.gasUsed || 0), 0);

      return {
        text: `Blockchain Status Overview:\n\n• Total Transactions: ${mockBlockchainTransactions.length}\n• Verified Transactions: ${verifiedTransactions.length}\n• Verification Rate: ${((verifiedTransactions.length / mockBlockchainTransactions.length) * 100).toFixed(1)}%\n• Total Gas Used: ${totalGasUsed.toLocaleString()}\n\nRecent Transactions:\n${mockBlockchainTransactions
          .slice(0, 3)
          .map(
            t =>
              `• ${t.dataType} - Block #${t.blockNumber} (${t.verified ? 'Verified' : 'Pending'})`
          )
          .join('\n')}`,
        hasReport: true,
        reportData: {
          type: 'blockchain',
          totalTransactions: mockBlockchainTransactions.length,
          verified: verifiedTransactions.length,
          totalGasUsed: totalGasUsed,
          recentTransactions: mockBlockchainTransactions.slice(0, 5),
        },
      };
    }

    // IoT Device queries
    if (
      lowerMessage.includes('iot') ||
      lowerMessage.includes('device') ||
      lowerMessage.includes('sensor')
    ) {
      const onlineDevices = mockIoTDevices.filter(d => d.status === 'online');
      const totalSensors = mockIoTDevices.reduce((acc, d) => acc + d.sensors.length, 0);
      const criticalSensors = mockIoTDevices.reduce(
        (acc, d) => acc + d.sensors.filter(s => s.status === 'critical').length,
        0
      );

      return {
        text: `IoT Device Network Status:\n\n• Total Devices: ${mockIoTDevices.length}\n• Online Devices: ${onlineDevices.length}\n• Network Uptime: ${((onlineDevices.length / mockIoTDevices.length) * 100).toFixed(1)}%\n• Total Sensors: ${totalSensors}\n• Critical Alerts: ${criticalSensors}\n\nDevice Status:\n${mockIoTDevices.map(d => `• ${d.deviceType.toUpperCase()} ${d.id}: ${d.status} (${d.sensors.length} sensors)`).join('\n')}`,
        hasReport: true,
        reportData: {
          type: 'iot-devices',
          totalDevices: mockIoTDevices.length,
          onlineDevices: onlineDevices.length,
          totalSensors: totalSensors,
          criticalSensors: criticalSensors,
          devices: mockIoTDevices,
        },
      };
    }

    // OTA Update queries
    if (
      lowerMessage.includes('ota') ||
      lowerMessage.includes('update') ||
      lowerMessage.includes('firmware')
    ) {
      const pendingUpdates = mockOTAUpdates.filter(
        u => u.status === 'pending' || u.status === 'downloading'
      );
      const completedUpdates = mockOTAUpdates.filter(u => u.status === 'completed');
      const failedUpdates = mockOTAUpdates.filter(u => u.status === 'failed');

      return {
        text: `OTA Update Status:\n\n• Total Updates: ${mockOTAUpdates.length}\n• Pending/In Progress: ${pendingUpdates.length}\n• Completed: ${completedUpdates.length}\n• Failed: ${failedUpdates.length}\n• Success Rate: ${mockOTAUpdates.length > 0 ? ((completedUpdates.length / mockOTAUpdates.length) * 100).toFixed(1) : 0}%\n\nUpdate Details:\n${mockOTAUpdates.map(u => `• ${u.deviceId}: v${u.firmwareVersion} - ${u.status} (${u.progress}%)`).join('\n')}`,
        hasReport: true,
        reportData: {
          type: 'ota-updates',
          totalUpdates: mockOTAUpdates.length,
          pending: pendingUpdates.length,
          completed: completedUpdates.length,
          failed: failedUpdates.length,
          updates: mockOTAUpdates,
        },
      };
    }

    // Integrated blockchain + IoT queries
    if (
      lowerMessage.includes('security') ||
      lowerMessage.includes('verification') ||
      (lowerMessage.includes('blockchain') && lowerMessage.includes('iot'))
    ) {
      const verifiedTransactions = mockBlockchainTransactions.filter(t => t.verified);
      const onlineDevices = mockIoTDevices.filter(d => d.status === 'online');

      return {
        text: `Blockchain IoT Security Overview:\n\n🔐 Security Status:\n• Blockchain Verification: ${((verifiedTransactions.length / mockBlockchainTransactions.length) * 100).toFixed(1)}%\n• Device Authentication: ${((onlineDevices.length / mockIoTDevices.length) * 100).toFixed(1)}%\n• Data Integrity: 99.8%\n\n📊 Integration Metrics:\n• Sensor Data Transactions: ${mockBlockchainTransactions.filter(t => t.dataType === 'sensor').length}\n• Maintenance Records: ${mockBlockchainTransactions.filter(t => t.dataType === 'maintenance').length}\n• Firmware Updates: ${mockBlockchainTransactions.filter(t => t.dataType === 'firmware').length}\n\n🛡️ Security Features:\n• End-to-end encryption\n• Immutable audit trail\n• Real-time verification\n• Tamper-proof records`,
        hasReport: true,
        reportData: {
          type: 'blockchain-iot-security',
          verificationRate: (verifiedTransactions.length / mockBlockchainTransactions.length) * 100,
          deviceUptime: (onlineDevices.length / mockIoTDevices.length) * 100,
          sensorTransactions: mockBlockchainTransactions.filter(t => t.dataType === 'sensor')
            .length,
          maintenanceTransactions: mockBlockchainTransactions.filter(
            t => t.dataType === 'maintenance'
          ).length,
          firmwareTransactions: mockBlockchainTransactions.filter(t => t.dataType === 'firmware')
            .length,
        },
      };
    }

    // Equipment status queries
    if (
      lowerMessage.includes('equipment') &&
      (lowerMessage.includes('status') || lowerMessage.includes('condition'))
    ) {
      const operationalCount = mockEquipment.filter(e => e.status === 'operational').length;
      const maintenanceCount = mockEquipment.filter(e => e.status === 'maintenance').length;
      const brokenCount = mockEquipment.filter(e => e.status === 'broken').length;

      return {
        text: `Here's the current equipment status:\n\n• Operational: ${operationalCount} units\n• Under Maintenance: ${maintenanceCount} units\n• Out of Order: ${brokenCount} units\n\nOverall operational rate: ${((operationalCount / mockEquipment.length) * 100).toFixed(1)}%`,
        hasReport: true,
        reportData: {
          type: 'equipment',
          operational: operationalCount,
          maintenance: maintenanceCount,
          broken: brokenCount,
          total: mockEquipment.length,
        },
      };
    }

    // Maintenance queries
    if (
      lowerMessage.includes('maintenance') &&
      (lowerMessage.includes('schedule') || lowerMessage.includes('upcoming'))
    ) {
      const scheduledMaintenance = mockMaintenance.filter(m => m.status === 'scheduled');
      const inProgressMaintenance = mockMaintenance.filter(m => m.status === 'in-progress');

      return {
        text: `Maintenance Schedule Overview:\n\n• Scheduled Tasks: ${scheduledMaintenance.length}\n• In Progress: ${inProgressMaintenance.length}\n• Completed This Month: ${mockMaintenance.filter(m => m.status === 'completed').length}\n\nNext scheduled maintenance:\n${scheduledMaintenance
          .slice(0, 3)
          .map(m => `• ${m.equipmentName} - ${new Date(m.scheduledDate).toLocaleDateString()}`)
          .join('\n')}`,
        hasReport: true,
        reportData: {
          type: 'maintenance',
          scheduled: scheduledMaintenance.length,
          inProgress: inProgressMaintenance.length,
          completed: mockMaintenance.filter(m => m.status === 'completed').length,
        },
      };
    }

    // Inventory queries
    if (lowerMessage.includes('inventory') || lowerMessage.includes('stock')) {
      const lowStockItems = mockInventory.filter(i => i.currentStock <= i.minStock);
      const totalValue = mockInventory.reduce(
        (acc, item) => acc + item.currentStock * item.unitPrice,
        0
      );

      return {
        text: `Inventory Status:\n\n• Total Items: ${mockInventory.length}\n• Low Stock Items: ${lowStockItems.length}\n• Total Inventory Value: $${(totalValue / 1000).toFixed(1)}K\n\nItems needing restock:\n${lowStockItems
          .slice(0, 3)
          .map(item => `• ${item.name}: ${item.currentStock}/${item.minStock} ${item.unit}`)
          .join('\n')}`,
        hasReport: true,
        reportData: {
          type: 'inventory',
          totalItems: mockInventory.length,
          lowStock: lowStockItems.length,
          totalValue: totalValue,
          lowStockItems: lowStockItems.slice(0, 5),
        },
      };
    }

    // Report generation
    if (lowerMessage.includes('report') || lowerMessage.includes('generate')) {
      return {
        text: `I can generate various reports for you:\n\n• Equipment Performance Report\n• Maintenance Schedule Report\n• Inventory Status Report\n• Cost Analysis Report\n\nWhich type of report would you like me to generate?`,
        hasReport: true,
        reportData: {
          type: 'report-options',
          options: ['equipment', 'maintenance', 'inventory', 'cost-analysis'],
        },
      };
    }

    // Cost analysis
    if (lowerMessage.includes('cost') || lowerMessage.includes('expense')) {
      const totalMaintenanceCost = mockMaintenance.reduce((acc, m) => acc + m.cost, 0);
      const avgCost = totalMaintenanceCost / mockMaintenance.length;

      return {
        text: `Maintenance Cost Analysis:\n\n• Total Maintenance Cost: $${totalMaintenanceCost.toLocaleString()}\n• Average Cost per Task: $${avgCost.toFixed(0)}\n• Most Expensive: $${Math.max(...mockMaintenance.map(m => m.cost)).toLocaleString()}\n• Cost Breakdown:\n  - Preventive: 65%\n  - Corrective: 25%\n  - Emergency: 10%`,
        hasReport: true,
        reportData: {
          type: 'cost-analysis',
          total: totalMaintenanceCost,
          average: avgCost,
          breakdown: {
            preventive: 65,
            corrective: 25,
            emergency: 10,
          },
        },
      };
    }

    // Help and capabilities
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return {
        text: `I can help you with:\n\n🔧 Equipment Management:\n• Check equipment status and health\n• View operational statistics\n• Equipment location and details\n\n📅 Maintenance Planning:\n• View scheduled maintenance\n• Track maintenance history\n• Generate maintenance reports\n\n📦 Inventory Control:\n• Check stock levels\n• Identify low stock items\n• Inventory valuation\n\n📊 Reports & Analytics:\n• Performance reports\n• Cost analysis\n• Operational insights\n\n🎤 Voice Support:\n• Speak your questions\n• Listen to responses\n\nJust ask me about any of these topics!`,
      };
    }

    // Default responses
    const defaultResponses = [
      "I understand you're asking about factory operations. Could you be more specific? I can help with equipment status, maintenance schedules, inventory levels, or generate reports.",
      "I'm here to help with your factory management needs. Try asking about equipment status, upcoming maintenance, inventory levels, or request a specific report.",
      'I can provide information about equipment, maintenance, inventory, and generate various reports. What specific information are you looking for?',
      'Let me help you with factory operations. I can check equipment status, maintenance schedules, inventory levels, or create reports. What would you like to know?',
    ];

    return {
      text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse = getAIResponse(inputMessage.trim());
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: aiResponse.text,
          timestamp: new Date(),
          hasReport: aiResponse.hasReport,
          reportData: aiResponse.reportData,
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);

        // Speak the response if voice is enabled
        if (voiceEnabled) {
          speakText(aiResponse.text);
        }
      },
      1000 + Math.random() * 2000
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderReportPanel = (reportData: any) => {
    if (!reportData) return null;

    switch (reportData.type) {
      case 'equipment':
        return (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wrench className="text-blue-600" size={16} />
                <h4 className="font-semibold text-blue-900">Equipment Status Report</h4>
              </div>
              <button
                onClick={() => setSelectedReport('equipment')}
                className="text-blue-600 hover:text-blue-800 p-1 rounded"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-2 rounded">
                <div className="text-green-600 font-bold">{reportData.operational}</div>
                <div className="text-gray-600">Operational</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-orange-600 font-bold">{reportData.maintenance}</div>
                <div className="text-gray-600">Maintenance</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-red-600 font-bold">{reportData.broken}</div>
                <div className="text-gray-600">Out of Order</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-blue-600 font-bold">{reportData.total}</div>
                <div className="text-gray-600">Total Units</div>
              </div>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-orange-600" size={16} />
                <h4 className="font-semibold text-orange-900">Maintenance Overview</h4>
              </div>
              <button
                onClick={() => setSelectedReport('maintenance')}
                className="text-orange-600 hover:text-orange-800 p-1 rounded"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Scheduled Tasks:</span>
                <span className="font-semibold">{reportData.scheduled}</span>
              </div>
              <div className="flex justify-between">
                <span>In Progress:</span>
                <span className="font-semibold">{reportData.inProgress}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-semibold">{reportData.completed}</span>
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="text-green-600" size={16} />
                <h4 className="font-semibold text-green-900">Inventory Summary</h4>
              </div>
              <button
                onClick={() => setSelectedReport('inventory')}
                className="text-green-600 hover:text-green-800 p-1 rounded"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold">{reportData.totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Low Stock:</span>
                <span className="font-semibold text-red-600">{reportData.lowStock}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Value:</span>
                <span className="font-semibold">${(reportData.totalValue / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </div>
        );

      case 'cost-analysis':
        return (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="text-purple-600" size={16} />
                <h4 className="font-semibold text-purple-900">Cost Analysis</h4>
              </div>
              <button
                onClick={() => setSelectedReport('cost-analysis')}
                className="text-purple-600 hover:text-purple-800 p-1 rounded"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Cost:</span>
                <span className="font-semibold">${reportData.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Average per Task:</span>
                <span className="font-semibold">${reportData.average.toFixed(0)}</span>
              </div>
            </div>
          </div>
        );

      case 'blockchain':
        return (
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="text-indigo-600" size={16} />
                <h4 className="font-semibold text-indigo-900">Blockchain Status</h4>
              </div>
              <button
                onClick={() => setSelectedReport('blockchain')}
                className="text-indigo-600 hover:text-indigo-800 p-1 rounded"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Transactions:</span>
                <span className="font-semibold">{reportData.totalTransactions}</span>
              </div>
              <div className="flex justify-between">
                <span>Verified:</span>
                <span className="font-semibold text-green-600">{reportData.verified}</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Used:</span>
                <span className="font-semibold">{reportData.totalGasUsed.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );

      case 'iot-devices':
        return (
          <div className="mt-4 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wifi className="text-cyan-600" size={16} />
                <h4 className="font-semibold text-cyan-900">IoT Network</h4>
              </div>
              <button
                onClick={() => setSelectedReport('iot-devices')}
                className="text-cyan-600 hover:text-cyan-800 p-1 rounded"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Online Devices:</span>
                <span className="font-semibold text-green-600">
                  {reportData.onlineDevices}/{reportData.totalDevices}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Sensors:</span>
                <span className="font-semibold">{reportData.totalSensors}</span>
              </div>
              <div className="flex justify-between">
                <span>Critical Alerts:</span>
                <span className="font-semibold text-red-600">{reportData.criticalSensors}</span>
              </div>
            </div>
          </div>
        );

      case 'ota-updates':
        return (
          <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Download className="text-emerald-600" size={16} />
                <h4 className="font-semibold text-emerald-900">OTA Updates</h4>
              </div>
              <button
                onClick={() => setSelectedReport('ota-updates')}
                className="text-emerald-600 hover:text-emerald-800 p-1 rounded"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-semibold text-orange-600">{reportData.pending}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-semibold text-green-600">{reportData.completed}</span>
              </div>
              <div className="flex justify-between">
                <span>Failed:</span>
                <span className="font-semibold text-red-600">{reportData.failed}</span>
              </div>
            </div>
          </div>
        );

      case 'blockchain-iot-security':
        return (
          <div className="mt-4 p-4 bg-violet-50 rounded-lg border border-violet-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Lock className="text-violet-600" size={16} />
                <h4 className="font-semibold text-violet-900">Security Overview</h4>
              </div>
              <button
                onClick={() => setSelectedReport('blockchain-iot-security')}
                className="text-violet-600 hover:text-violet-800 p-1 rounded"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Verification Rate:</span>
                <span className="font-semibold text-green-600">
                  {reportData.verificationRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Device Uptime:</span>
                <span className="font-semibold text-blue-600">
                  {reportData.deviceUptime.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sensor Transactions:</span>
                <span className="font-semibold">{reportData.sensorTransactions}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPDFReport = () => {
    if (!selectedReport) return null;

    const reportContent = {
      equipment: {
        title: 'Equipment Performance Report',
        content: `
          <div class="report-header">
            <h1>Equipment Performance Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="report-section">
            <h2>Executive Summary</h2>
            <p>Current operational status shows ${mockEquipment.filter(e => e.status === 'operational').length} out of ${mockEquipment.length} equipment units are operational.</p>
          </div>
          <div class="report-section">
            <h2>Equipment Status Breakdown</h2>
            <table>
              <tr><th>Status</th><th>Count</th><th>Percentage</th></tr>
              <tr><td>Operational</td><td>${mockEquipment.filter(e => e.status === 'operational').length}</td><td>${((mockEquipment.filter(e => e.status === 'operational').length / mockEquipment.length) * 100).toFixed(1)}%</td></tr>
              <tr><td>Maintenance</td><td>${mockEquipment.filter(e => e.status === 'maintenance').length}</td><td>${((mockEquipment.filter(e => e.status === 'maintenance').length / mockEquipment.length) * 100).toFixed(1)}%</td></tr>
              <tr><td>Out of Order</td><td>${mockEquipment.filter(e => e.status === 'broken').length}</td><td>${((mockEquipment.filter(e => e.status === 'broken').length / mockEquipment.length) * 100).toFixed(1)}%</td></tr>
            </table>
          </div>
          <div class="report-section">
            <h2>Equipment Details</h2>
            ${mockEquipment
              .map(
                eq => `
              <div class="equipment-item">
                <h3>${eq.name}</h3>
                <p><strong>Model:</strong> ${eq.model}</p>
                <p><strong>Location:</strong> ${eq.location}</p>
                <p><strong>Status:</strong> ${eq.status}</p>
                <p><strong>Last Maintenance:</strong> ${eq.lastMaintenance || 'N/A'}</p>
              </div>
            `
              )
              .join('')}
          </div>
        `,
      },
      maintenance: {
        title: 'Maintenance Schedule Report',
        content: `
          <div class="report-header">
            <h1>Maintenance Schedule Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="report-section">
            <h2>Maintenance Overview</h2>
            <p>Total maintenance records: ${mockMaintenance.length}</p>
            <p>Scheduled tasks: ${mockMaintenance.filter(m => m.status === 'scheduled').length}</p>
            <p>In progress: ${mockMaintenance.filter(m => m.status === 'in-progress').length}</p>
            <p>Completed: ${mockMaintenance.filter(m => m.status === 'completed').length}</p>
          </div>
          <div class="report-section">
            <h2>Upcoming Maintenance</h2>
            ${mockMaintenance
              .filter(m => m.status === 'scheduled')
              .map(
                m => `
              <div class="maintenance-item">
                <h3>${m.equipmentName}</h3>
                <p><strong>Type:</strong> ${m.type}</p>
                <p><strong>Scheduled Date:</strong> ${new Date(m.scheduledDate).toLocaleDateString()}</p>
                <p><strong>Technician:</strong> ${m.technician}</p>
                <p><strong>Description:</strong> ${m.description}</p>
              </div>
            `
              )
              .join('')}
          </div>
        `,
      },
      inventory: {
        title: 'Inventory Status Report',
        content: `
          <div class="report-header">
            <h1>Inventory Status Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="report-section">
            <h2>Inventory Summary</h2>
            <p>Total items: ${mockInventory.length}</p>
            <p>Low stock items: ${mockInventory.filter(i => i.currentStock <= i.minStock).length}</p>
            <p>Total inventory value: $${(mockInventory.reduce((acc, item) => acc + item.currentStock * item.unitPrice, 0) / 1000).toFixed(1)}K</p>
          </div>
          <div class="report-section">
            <h2>Low Stock Items</h2>
            ${mockInventory
              .filter(i => i.currentStock <= i.minStock)
              .map(
                item => `
              <div class="inventory-item">
                <h3>${item.name}</h3>
                <p><strong>SKU:</strong> ${item.sku}</p>
                <p><strong>Current Stock:</strong> ${item.currentStock} ${item.unit}</p>
                <p><strong>Minimum Stock:</strong> ${item.minStock} ${item.unit}</p>
                <p><strong>Supplier:</strong> ${item.supplier}</p>
              </div>
            `
              )
              .join('')}
          </div>
        `,
      },
      'cost-analysis': {
        title: 'Cost Analysis Report',
        content: `
          <div class="report-header">
            <h1>Cost Analysis Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="report-section">
            <h2>Cost Summary</h2>
            <p>Total maintenance cost: $${mockMaintenance.reduce((acc, m) => acc + m.cost, 0).toLocaleString()}</p>
            <p>Average cost per task: $${(mockMaintenance.reduce((acc, m) => acc + m.cost, 0) / mockMaintenance.length).toFixed(0)}</p>
            <p>Highest single cost: $${Math.max(...mockMaintenance.map(m => m.cost)).toLocaleString()}</p>
          </div>
          <div class="report-section">
            <h2>Cost Breakdown by Type</h2>
            <table>
              <tr><th>Type</th><th>Count</th><th>Total Cost</th><th>Average Cost</th></tr>
              <tr><td>Preventive</td><td>${mockMaintenance.filter(m => m.type === 'preventive').length}</td><td>$${mockMaintenance
                .filter(m => m.type === 'preventive')
                .reduce((acc, m) => acc + m.cost, 0)
                .toLocaleString()}</td><td>$${(mockMaintenance.filter(m => m.type === 'preventive').reduce((acc, m) => acc + m.cost, 0) / mockMaintenance.filter(m => m.type === 'preventive').length || 0).toFixed(0)}</td></tr>
              <tr><td>Corrective</td><td>${mockMaintenance.filter(m => m.type === 'corrective').length}</td><td>$${mockMaintenance
                .filter(m => m.type === 'corrective')
                .reduce((acc, m) => acc + m.cost, 0)
                .toLocaleString()}</td><td>$${(mockMaintenance.filter(m => m.type === 'corrective').reduce((acc, m) => acc + m.cost, 0) / mockMaintenance.filter(m => m.type === 'corrective').length || 0).toFixed(0)}</td></tr>
              <tr><td>Emergency</td><td>${mockMaintenance.filter(m => m.type === 'emergency').length}</td><td>$${mockMaintenance
                .filter(m => m.type === 'emergency')
                .reduce((acc, m) => acc + m.cost, 0)
                .toLocaleString()}</td><td>$${(mockMaintenance.filter(m => m.type === 'emergency').reduce((acc, m) => acc + m.cost, 0) / mockMaintenance.filter(m => m.type === 'emergency').length || 0).toFixed(0)}</td></tr>
            </table>
          </div>
        `,
      },
    };

    const report = reportContent[selectedReport as keyof typeof reportContent];
    if (!report) return null;

    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const printWindow = window.open('', '_blank');
                if (printWindow) {
                  printWindow.document.write(`
                    <html>
                      <head>
                        <title>${report.title}</title>
                        <style>
                          body { font-family: Arial, sans-serif; margin: 20px; }
                          .pdf-container { max-width: 210mm; margin: 0 auto; background: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                          .pdf-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 30px; border-bottom: 3px solid #2563eb; margin-bottom: 30px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); }
                          .company-logo { display: flex; align-items: center; gap: 15px; }
                          .logo-circle { width: 60px; height: 60px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; }
                          .company-info h1 { margin: 0; color: #1e293b; font-size: 24px; font-weight: 700; }
                          .company-info p { margin: 5px 0 0 0; color: #64748b; font-size: 14px; }
                          .report-meta { text-align: right; }
                          .report-meta h2 { margin: 0 0 10px 0; color: #1e293b; font-size: 28px; font-weight: 700; }
                          .report-meta p { margin: 3px 0; color: #64748b; font-size: 14px; }
                          
                          .executive-summary { margin: 30px 0; padding: 25px; background: #f8fafc; border-radius: 12px; border-left: 5px solid #2563eb; }
                          .executive-summary h2 { color: #1e293b; margin-bottom: 20px; font-size: 22px; }
                          .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 20px; }
                          .summary-card { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                          .summary-card.scheduled { border-top: 4px solid #f59e0b; }
                          .summary-card.progress { border-top: 4px solid #8b5cf6; }
                          .summary-card.completed { border-top: 4px solid #10b981; }
                          .card-number { font-size: 32px; font-weight: bold; color: #1e293b; margin-bottom: 5px; }
                          .card-label { color: #64748b; font-size: 14px; font-weight: 500; }
                          .summary-stats { display: flex; justify-content: space-around; margin-top: 20px; }
                          .summary-stats p { margin: 0; color: #374151; font-weight: 500; }
                          
                          .maintenance-schedule { margin: 30px 0; }
                          .maintenance-schedule h2 { color: #1e293b; margin-bottom: 20px; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
                          .schedule-table { overflow-x: auto; }
                          table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                          th { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 15px 12px; text-align: left; font-weight: 600; font-size: 14px; }
                          td { padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
                          tr:hover { background: #f8fafc; }
                          
                          .type-badge, .status-badge, .priority-badge { padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
                          .type-badge.preventive { background: #dbeafe; color: #1d4ed8; }
                          .type-badge.corrective { background: #fef3c7; color: #d97706; }
                          .type-badge.emergency { background: #fee2e2; color: #dc2626; }
                          .status-badge.scheduled { background: #dbeafe; color: #1d4ed8; }
                          .priority-badge.high { background: #fee2e2; color: #dc2626; }
                          .priority-badge.medium { background: #fef3c7; color: #d97706; }
                          .priority-badge.normal { background: #d1fae5; color: #059669; }
                          
                          .maintenance-details { margin: 30px 0; }
                          .maintenance-details h2 { color: #1e293b; margin-bottom: 20px; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
                          .maintenance-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
                          .card-header { background: #f8fafc; padding: 15px 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
                          .card-header h3 { margin: 0; color: #1e293b; font-size: 18px; }
                          .card-badges { display: flex; gap: 8px; }
                          .card-content { padding: 20px; }
                          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px; }
                          .info-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
                          .info-item strong { color: #374151; }
                          .info-item span { color: #1e293b; font-weight: 500; }
                          .description { margin: 15px 0; }
                          .description p { margin: 5px 0; color: #4b5563; line-height: 1.5; }
                          .parts-section { margin-top: 15px; }
                          .parts-section ul { margin: 5px 0; padding-left: 20px; }
                          .parts-section li { color: #4b5563; margin: 3px 0; }
                          
                          .maintenance-analytics { margin: 30px 0; }
                          .maintenance-analytics h2 { color: #1e293b; margin-bottom: 20px; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
                          .analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
                          .chart-section, .stats-section { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
                          .chart-section h3, .stats-section h3 { margin: 0 0 15px 0; color: #1e293b; font-size: 16px; }
                          .chart-bars { space-y: 10px; }
                          .bar-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
                          .bar-label { width: 80px; font-size: 12px; color: #64748b; }
                          .bar-container { flex: 1; height: 20px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
                          .bar { height: 100%; border-radius: 10px; }
                          .bar.preventive { background: linear-gradient(90deg, #3b82f6, #2563eb); }
                          .bar.corrective { background: linear-gradient(90deg, #f59e0b, #d97706); }
                          .bar.emergency { background: linear-gradient(90deg, #ef4444, #dc2626); }
                          .bar-value { width: 30px; text-align: right; font-weight: 600; color: #1e293b; font-size: 12px; }
                          .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
                          .kpi-item { text-align: center; padding: 15px; background: #f8fafc; border-radius: 8px; }
                          .kpi-value { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 5px; }
                          .kpi-label { font-size: 12px; color: #64748b; }
                          
                          .recommendations { margin: 30px 0; }
                          .recommendations h2 { color: #1e293b; margin-bottom: 20px; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
                          .recommendation-list { space-y: 15px; }
                          .recommendation-item { display: flex; gap: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 15px; }
                          .rec-icon { font-size: 24px; }
                          .rec-content h4 { margin: 0 0 5px 0; color: #1e293b; font-size: 16px; }
                          .rec-content p { margin: 0; color: #4b5563; font-size: 14px; line-height: 1.4; }
                          
                          .report-footer { margin-top: 40px; padding: 20px 30px; border-top: 2px solid #e5e7eb; background: #f8fafc; }
                          .footer-content { display: flex; justify-content: space-between; }
                          .footer-left p, .footer-right p { margin: 2px 0; font-size: 12px; color: #64748b; }
                          .footer-left p:first-child { font-weight: 600; color: #1e293b; }
                        </style>
                      </head>
                      <body>${report.content}</body>
                    </html>
                  `);
                  printWindow.document.close();
                  printWindow.print();
                }
              }}
              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
              title="Download PDF"
            >
              <Download size={16} />
            </button>
            <button
              onClick={() => setSelectedReport(null)}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: report.content }}
            style={{
              fontFamily: 'Arial, sans-serif',
            }}
          />
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div
      className={`fixed inset-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
        isMinimized ? 'h-16 w-80 bottom-6 right-6 top-auto left-auto' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant with Voice</h3>
            <p className="text-xs text-blue-100">Factory Management Helper</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'
            }`}
            title={voiceEnabled ? 'Disable Voice' : 'Enable Voice'}
          >
            {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={onToggle}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex h-[calc(100%-80px)]">
          {/* Chat Column */}
          <div
            className={`flex flex-col ${selectedReport ? 'w-1/2' : 'w-full'} border-r border-gray-200`}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}

                  <div className={`max-w-[70%] ${message.type === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>

                    {message.hasReport && renderReportPanel(message.reportData)}

                    <p className="text-xs text-gray-500 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about equipment, maintenance, inventory... or use voice"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isTyping}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                  }`}
                  title={isListening ? 'Stop Listening' : 'Start Voice Input'}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              {isListening && (
                <p className="text-xs text-red-600 mt-2 animate-pulse">🎤 Listening... Speak now</p>
              )}
              {isSpeaking && (
                <p className="text-xs text-blue-600 mt-2 animate-pulse">🔊 Speaking...</p>
              )}
            </div>
          </div>

          {/* PDF Report Column */}
          {selectedReport && <div className="w-1/2 bg-gray-50">{renderPDFReport()}</div>}
        </div>
      )}
    </div>
  );
}
