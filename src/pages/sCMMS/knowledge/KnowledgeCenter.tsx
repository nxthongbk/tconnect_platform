import { useState } from 'react';
import {
  BookOpen,
  Upload,
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Brain,
  Lightbulb,
  History,
  Settings,
  Eye,
  X,
  RefreshCw,
  Database,
  Cpu,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  File,
  FileImage,
  File as FilePdf,
  FileSpreadsheet,
  FileVideo,
  Paperclip,
} from 'lucide-react';

interface KnowledgeDocument {
  id: string;
  title: string;
  type: 'manual' | 'procedure' | 'troubleshooting' | 'maintenance' | 'safety';
  category: string;
  content: string;
  tags: string[];
  lastUpdated: string;
  author: string;
  version: string;
  equipmentId?: string;
  attachments?: FileAttachment[];
  fileUrl?: string;
  fileSize?: number;
  fileType?: string;
}

interface FileAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface HistoricalData {
  id: string;
  equipmentId: string;
  equipmentName: string;
  dataType: 'maintenance' | 'failure' | 'performance' | 'sensor';
  timestamp: string;
  data: any;
  outcome: 'success' | 'failure' | 'warning';
  lessons: string[];
  recommendations: string[];
}

interface AIInsight {
  id: string;
  type: 'recommendation' | 'prediction' | 'optimization' | 'alert';
  title: string;
  description: string;
  confidence: number;
  basedOn: string[];
  actionItems: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
}

const mockKnowledgeDocs: KnowledgeDocument[] = [
  {
    id: 'doc_001',
    title: 'Hydraulic Press A1 Operation Manual',
    type: 'manual',
    category: 'Equipment Operation',
    content: `# Hydraulic Press A1 Operation Manual

## Safety Procedures
1. Always wear safety equipment
2. Check hydraulic fluid levels before operation
3. Ensure emergency stop is functional

## Operating Instructions
1. Power on the main control panel
2. Set pressure to required specifications
3. Position workpiece correctly
4. Engage safety guards
5. Start operation cycle

## Maintenance Schedule
- Daily: Visual inspection, fluid level check
- Weekly: Pressure calibration, safety system test
- Monthly: Full hydraulic system inspection
- Quarterly: Replace hydraulic filters

## Troubleshooting
### Problem: Low pressure
- Check hydraulic fluid level
- Inspect for leaks
- Verify pump operation

### Problem: Irregular operation
- Check electrical connections
- Inspect control valves
- Calibrate pressure sensors`,
    tags: ['hydraulic', 'press', 'operation', 'safety'],
    lastUpdated: '2024-11-10',
    author: 'John Smith',
    version: '2.1',
    equipmentId: '1',
    attachments: [
      {
        id: 'att_001',
        name: 'hydraulic_press_diagram.pdf',
        url: '/files/hydraulic_press_diagram.pdf',
        size: 2048576,
        type: 'application/pdf',
        uploadedAt: '2024-11-10T08:00:00Z',
      },
      {
        id: 'att_002',
        name: 'safety_checklist.pdf',
        url: '/files/safety_checklist.pdf',
        size: 1024768,
        type: 'application/pdf',
        uploadedAt: '2024-11-10T08:30:00Z',
      },
    ],
  },
  {
    id: 'doc_002',
    title: 'Preventive Maintenance Best Practices',
    type: 'procedure',
    category: 'Maintenance',
    content: `# Preventive Maintenance Best Practices

## Planning Phase
1. Review equipment history
2. Analyze failure patterns
3. Schedule based on criticality
4. Prepare required tools and parts

## Execution Phase
1. Follow safety lockout procedures
2. Document all findings
3. Take before/after photos
4. Update maintenance records

## Quality Control
1. Verify all work completed
2. Test equipment functionality
3. Update documentation
4. Schedule next maintenance`,
    tags: ['maintenance', 'procedure', 'best-practices'],
    lastUpdated: '2024-11-08',
    author: 'Sarah Johnson',
    version: '1.3',
  },
  {
    id: 'doc_003',
    title: 'Emergency Shutdown Procedures',
    type: 'safety',
    category: 'Safety',
    content: `# Emergency Shutdown Procedures

## Immediate Actions
1. Press emergency stop button
2. Isolate power sources
3. Secure the area
4. Account for all personnel

## Equipment-Specific Procedures
### Hydraulic Systems
- Release pressure gradually
- Secure hydraulic lines
- Check for fluid leaks

### Electrical Systems
- Verify power isolation
- Lock out electrical panels
- Test for zero energy

## Post-Emergency
1. Investigate root cause
2. Document incident
3. Implement corrective actions
4. Update procedures if needed`,
    tags: ['emergency', 'safety', 'shutdown'],
    lastUpdated: '2024-11-05',
    author: 'Mike Wilson',
    version: '1.0',
  },
];

const mockHistoricalData: HistoricalData[] = [
  {
    id: 'hist_001',
    equipmentId: '1',
    equipmentName: 'Hydraulic Press A1',
    dataType: 'maintenance',
    timestamp: '2024-11-01T10:30:00Z',
    data: {
      action: 'Hydraulic oil change',
      duration: 120,
      cost: 155,
      partsUsed: ['Hydraulic Oil', 'Gasket Seal'],
      technician: 'John Smith',
    },
    outcome: 'success',
    lessons: [
      'Oil change improved pressure stability',
      'New gasket eliminated minor leak',
      'Equipment performance increased by 15%',
    ],
    recommendations: [
      'Schedule oil changes every 30 days',
      'Monitor pressure readings daily',
      'Keep spare gaskets in inventory',
    ],
  },
  {
    id: 'hist_002',
    equipmentId: '2',
    equipmentName: 'Conveyor Belt B2',
    dataType: 'failure',
    timestamp: '2024-10-28T14:15:00Z',
    data: {
      issue: 'Motor failure',
      downtime: 240,
      rootCause: 'Bearing wear',
      repairCost: 450,
    },
    outcome: 'failure',
    lessons: [
      'Vibration monitoring could have predicted failure',
      'Regular bearing lubrication is critical',
      'Temperature monitoring shows early warning signs',
    ],
    recommendations: [
      'Install vibration sensors',
      'Implement predictive maintenance',
      'Increase bearing inspection frequency',
    ],
  },
  {
    id: 'hist_003',
    equipmentId: '3',
    equipmentName: 'Welding Robot R3',
    dataType: 'performance',
    timestamp: '2024-10-25T09:00:00Z',
    data: {
      metric: 'Weld quality',
      before: 85,
      after: 95,
      improvement: '10%',
      action: 'Tip replacement and calibration',
    },
    outcome: 'success',
    lessons: [
      'Regular tip replacement maintains quality',
      'Calibration improves precision',
      'Quality metrics show immediate improvement',
    ],
    recommendations: [
      'Replace tips every 150 hours',
      'Calibrate weekly',
      'Monitor weld quality continuously',
    ],
  },
];

const mockAIInsights: AIInsight[] = [
  {
    id: 'insight_001',
    type: 'prediction',
    title: 'Conveyor Belt B2 Motor Replacement Needed',
    description:
      'Based on vibration patterns and temperature trends, the motor is likely to fail within 2-3 weeks.',
    confidence: 87,
    basedOn: ['Historical failure data', 'Current sensor readings', 'Maintenance patterns'],
    actionItems: [
      'Order replacement motor immediately',
      'Schedule maintenance window',
      'Prepare backup equipment',
    ],
    priority: 'high',
    createdAt: '2024-11-12T08:00:00Z',
  },
  {
    id: 'insight_002',
    type: 'optimization',
    title: 'Hydraulic Press Maintenance Interval Optimization',
    description:
      'Analysis suggests extending maintenance interval from 30 to 35 days could reduce costs by 12% without affecting reliability.',
    confidence: 92,
    basedOn: ['Performance data', 'Failure history', 'Cost analysis'],
    actionItems: [
      'Update maintenance schedule',
      'Monitor performance closely',
      'Adjust if needed after 3 cycles',
    ],
    priority: 'medium',
    createdAt: '2024-11-11T15:30:00Z',
  },
  {
    id: 'insight_003',
    type: 'recommendation',
    title: 'Implement Predictive Maintenance for Critical Equipment',
    description:
      'Installing IoT sensors on critical equipment could reduce unplanned downtime by 40% and maintenance costs by 25%.',
    confidence: 95,
    basedOn: ['Industry benchmarks', 'Historical downtime data', 'Cost-benefit analysis'],
    actionItems: [
      'Evaluate sensor options',
      'Prepare budget proposal',
      'Plan phased implementation',
    ],
    priority: 'high',
    createdAt: '2024-11-10T11:00:00Z',
  },
];

export default function KnowledgeCenter() {
  const [activeTab, setActiveTab] = useState<'documents' | 'history' | 'insights' | 'upload'>(
    'documents'
  );
  const [knowledgeDocs] = useState<KnowledgeDocument[]>(mockKnowledgeDocs);
  const [historicalData] = useState<HistoricalData[]>(mockHistoricalData);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>(mockAIInsights);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewingDoc, setViewingDoc] = useState<KnowledgeDocument | null>(null);
  const [editingDoc, setEditingDoc] = useState<KnowledgeDocument | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const categories = [
    'Equipment Operation',
    'Maintenance',
    'Safety',
    'Troubleshooting',
    'Procedures',
  ];
  const types = ['manual', 'procedure', 'troubleshooting', 'maintenance', 'safety'];

  const filteredDocs = knowledgeDocs.filter(doc => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleGenerateInsights = () => {
    // Simulate AI processing
    const newInsight: AIInsight = {
      id: `insight_${Date.now()}`,
      type: 'recommendation',
      title: 'New AI Recommendation Generated',
      description:
        'Based on recent data analysis, new optimization opportunities have been identified.',
      confidence: 89,
      basedOn: ['Recent maintenance data', 'Performance metrics', 'Cost analysis'],
      actionItems: ['Review recommendations', 'Implement changes', 'Monitor results'],
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };

    setAIInsights([newInsight, ...aiInsights]);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setUploadingFiles(fileArray);

    // Simulate file upload progress
    fileArray.forEach((file, index) => {
      const fileId = `${file.name}_${Date.now()}_${index}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    });

    if (showUploadForm) {
      console.log(showUploadForm);
    }
    if (editingDoc) {
      console.log(editingDoc);
    }
  };

  const handleFileDownload = (doc: KnowledgeDocument) => {
    if (doc.fileUrl) {
      // For real files
      const link = document.createElement('a');
      link.href = doc.fileUrl;
      link.download = `${doc.title}.${doc.fileType || 'pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Generate and download content as text file
      const blob = new Blob([doc.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${doc.title}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (!fileType) return <File className="text-blue-600" size={16} />;
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return <FilePdf className="text-red-600" size={16} />;
    if (type.includes('image')) return <FileImage className="text-green-600" size={16} />;
    if (type.includes('video')) return <FileVideo className="text-purple-600" size={16} />;
    if (type.includes('sheet') || type.includes('excel'))
      return <FileSpreadsheet className="text-green-600" size={16} />;
    return <File className="text-blue-600" size={16} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const StatCard = ({ title, value, subtext, icon: Icon, color, bgColor }: any) => (
    <div
      className={`${bgColor} p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          {subtext && <p className="text-gray-400 text-sm mt-1">{subtext}</p>}
        </div>
        <div
          className={`p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${
            color === 'text-blue-600'
              ? 'bg-gradient-to-br from-blue-50 to-blue-100'
              : color === 'text-green-600'
                ? 'bg-gradient-to-br from-green-50 to-green-100'
                : color === 'text-purple-600'
                  ? 'bg-gradient-to-br from-purple-50 to-purple-100'
                  : color === 'text-orange-600'
                    ? 'bg-gradient-to-br from-orange-50 to-orange-100'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }`}
        >
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
        <div className="space-y-4">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search documents, content, or tags..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type} className="capitalize">
                  {type}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={16} />
              Add Document
            </button>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-3 gap-6">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    doc.type === 'manual'
                      ? 'bg-blue-100'
                      : doc.type === 'procedure'
                        ? 'bg-green-100'
                        : doc.type === 'safety'
                          ? 'bg-red-100'
                          : doc.type === 'troubleshooting'
                            ? 'bg-orange-100'
                            : 'bg-purple-100'
                  }`}
                >
                  <FileText
                    className={`${
                      doc.type === 'manual'
                        ? 'text-blue-600'
                        : doc.type === 'procedure'
                          ? 'text-green-600'
                          : doc.type === 'safety'
                            ? 'text-red-600'
                            : doc.type === 'troubleshooting'
                              ? 'text-orange-600'
                              : 'text-purple-600'
                    }`}
                    size={20}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{doc.title}</h3>
                  <p className="text-xs text-gray-500">{doc.category}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  doc.type === 'manual'
                    ? 'bg-blue-100 text-blue-800'
                    : doc.type === 'procedure'
                      ? 'bg-green-100 text-green-800'
                      : doc.type === 'safety'
                        ? 'bg-red-100 text-red-800'
                        : doc.type === 'troubleshooting'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-purple-100 text-purple-800'
                }`}
              >
                {doc.type}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {doc.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {doc.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{doc.tags.length - 3} more
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>Version: {doc.version}</p>
                <p>Updated: {new Date(doc.lastUpdated).toLocaleDateString()}</p>
                <p>Author: {doc.author}</p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <button
                  onClick={() => setViewingDoc(doc)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded"
                  title="View Document"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => setEditingDoc(doc)}
                  className="text-green-600 hover:text-green-800 p-1 rounded"
                  title="Edit Document"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleFileDownload(doc)}
                  className="text-purple-600 hover:text-purple-800 p-1 rounded"
                  title="Download"
                >
                  <Download size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800 p-1 rounded" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* File attachments */}
              {doc.attachments && doc.attachments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Attachments:</p>
                  <div className="flex flex-wrap gap-1">
                    {doc.attachments.slice(0, 2).map(attachment => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs"
                      >
                        {getFileIcon(attachment.type)}
                        <span className="truncate max-w-20">{attachment.name}</span>
                      </div>
                    ))}
                    {doc.attachments.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{doc.attachments.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-6">
        <StatCard
          title="Historical Records"
          value={historicalData.length}
          subtext="Total data points"
          icon={Database}
          color="text-blue-600"
          bgColor="bg-white"
        />
        <StatCard
          title="Success Rate"
          value="78%"
          subtext="Positive outcomes"
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-white"
        />
        <StatCard
          title="Learning Points"
          value={historicalData.reduce((acc, h) => acc + h.lessons.length, 0)}
          subtext="Extracted insights"
          icon={Lightbulb}
          color="text-orange-600"
          bgColor="bg-white"
        />
      </div>

      <div className="space-y-6">
        {historicalData.map(data => (
          <div
            key={data.id}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{data.equipmentName}</h3>
                <p className="text-sm text-gray-600 capitalize">{data.dataType} Event</p>
                <p className="text-xs text-gray-500">{new Date(data.timestamp).toLocaleString()}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  data.outcome === 'success'
                    ? 'bg-green-100 text-green-800'
                    : data.outcome === 'failure'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800'
                }`}
              >
                {data.outcome}
              </span>
            </div>

            <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="text-orange-600" size={16} />
                  Lessons Learned
                </h4>
                <ul className="space-y-1">
                  {data.lessons.map((lesson, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={16} />
                  Recommendations
                </h4>
                <ul className="space-y-1">
                  {data.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-1 smallLaptop:grid-cols-4 gap-6 flex-1">
          <StatCard
            title="AI Insights"
            value={aiInsights.length}
            subtext="Generated recommendations"
            icon={Brain}
            color="text-purple-600"
            bgColor="bg-white"
          />
          <StatCard
            title="High Priority"
            value={
              aiInsights.filter(i => i.priority === 'high' || i.priority === 'critical').length
            }
            subtext="Urgent actions needed"
            icon={AlertCircle}
            color="text-red-600"
            bgColor="bg-white"
          />
          <StatCard
            title="Avg Confidence"
            value={`${Math.round(aiInsights.reduce((acc, i) => acc + i.confidence, 0) / aiInsights.length)}%`}
            subtext="AI prediction accuracy"
            icon={TrendingUp}
            color="text-green-600"
            bgColor="bg-white"
          />
          <StatCard
            title="Active Learning"
            value="24/7"
            subtext="Continuous improvement"
            icon={Cpu}
            color="text-blue-600"
            bgColor="bg-white"
          />
        </div>

        <button
          onClick={handleGenerateInsights}
          className="ml-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <RefreshCw size={16} />
          Generate New Insights
        </button>
      </div>

      <div className="space-y-6">
        {aiInsights.map(insight => (
          <div
            key={insight.id}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    insight.type === 'prediction'
                      ? 'bg-blue-100'
                      : insight.type === 'recommendation'
                        ? 'bg-green-100'
                        : insight.type === 'optimization'
                          ? 'bg-purple-100'
                          : 'bg-red-100'
                  }`}
                >
                  {insight.type === 'prediction' ? (
                    <TrendingUp className="text-blue-600" size={20} />
                  ) : insight.type === 'recommendation' ? (
                    <Lightbulb className="text-green-600" size={20} />
                  ) : insight.type === 'optimization' ? (
                    <Settings className="text-purple-600" size={20} />
                  ) : (
                    <AlertCircle className="text-red-600" size={20} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                  <p className="text-sm text-gray-600 capitalize">{insight.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    insight.priority === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : insight.priority === 'high'
                        ? 'bg-orange-100 text-orange-800'
                        : insight.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                  }`}
                >
                  {insight.priority}
                </span>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{insight.confidence}%</div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{insight.description}</p>

            <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Based On:</h4>
                <ul className="space-y-1">
                  {insight.basedOn.map((source, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <Database size={12} className="text-gray-400" />
                      {source}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Action Items:</h4>
                <ul className="space-y-1">
                  {insight.actionItems.map((action, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle size={12} className="text-green-400" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Generated: {new Date(insight.createdAt).toLocaleString()}
              </span>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded text-sm">
                  Implement
                </button>
                <button className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded text-sm">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Upload Knowledge Documents</h3>

        <div className="space-y-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onDrop={e => {
              e.preventDefault();
              handleFileUpload(e.dataTransfer.files);
            }}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to upload
            </h4>
            <p className="text-gray-600 mb-4">Support for PDF, DOC, TXT, and Markdown files</p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.md,.xlsx,.xls,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
              onChange={e => handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
            >
              Choose Files
            </label>
          </div>

          {/* Upload Progress */}
          {uploadingFiles.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-medium text-blue-900 mb-4 flex items-center gap-2">
                <Upload className="text-blue-600" size={16} />
                Uploading Files ({uploadingFiles.length})
              </h4>
              <div className="space-y-3">
                {uploadingFiles.map((file, index) => {
                  const fileId = `${file.name}_${Date.now()}_${index}`;
                  const progress = uploadProgress[fileId] || 0;
                  return (
                    <div key={fileId} className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.type)}
                          <span className="font-medium text-gray-900">{file.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{progress}% complete</span>
                        <span>{progress === 100 ? 'Completed' : 'Uploading...'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter document title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select type</option>
                <option value="manual">Manual</option>
                <option value="procedure">Procedure</option>
                <option value="troubleshooting">Troubleshooting</option>
                <option value="maintenance">Maintenance</option>
                <option value="safety">Safety</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment (Optional)
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select equipment</option>
                <option value="1">Hydraulic Press A1</option>
                <option value="2">Conveyor Belt B2</option>
                <option value="3">Welding Robot R3</option>
                <option value="4">CNC Machine M4</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., hydraulic, maintenance, safety"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter document content or it will be extracted from uploaded files"
            />
          </div>

          {/* File Management */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attached Files</label>
            <div className="border border-gray-300 rounded-lg p-4 min-h-24">
              {uploadingFiles.length > 0 ? (
                <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-3">
                  {uploadingFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setUploadingFiles(uploadingFiles.filter((_, i) => i !== index))
                        }
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Paperclip className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p>No files attached</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload & Process
            </button>
          </div>
        </div>
      </div>

      {/* AI Processing Status */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-purple-600" size={24} />
          <h3 className="text-lg font-semibold text-purple-900">AI Learning Status</h3>
        </div>

        <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-4">
          <div className="bg-white/50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-blue-600" size={16} />
              <span className="font-medium text-gray-900">Processing Queue</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{uploadingFiles.length}</p>
            <p className="text-sm text-gray-600">Documents pending</p>
          </div>

          <div className="bg-white/50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-green-600" size={16} />
              <span className="font-medium text-gray-900">Processed Today</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{knowledgeDocs.length}</p>
            <p className="text-sm text-gray-600">Documents learned</p>
          </div>

          <div className="bg-white/50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-purple-600" size={16} />
              <span className="font-medium text-gray-900">Knowledge Base</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">98%</p>
            <p className="text-sm text-gray-600">Accuracy score</p>
          </div>
        </div>

        {/* File Processing Status */}
        {uploadingFiles.length > 0 && (
          <div className="mt-4 pt-4 border-t border-purple-200">
            <h4 className="font-medium text-purple-900 mb-3">File Processing Status</h4>
            <div className="space-y-2">
              {uploadingFiles.map((file, index) => {
                const fileId = `${file.name}_${Date.now()}_${index}`;
                const progress = uploadProgress[fileId] || 0;
                return (
                  <div key={fileId} className="flex items-center justify-between text-sm">
                    <span className="text-purple-800">{file.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-purple-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-purple-600 w-12">{progress}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}
          >
            Knowledge Center
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            AI-powered knowledge management and learning system
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl">
            <Brain size={16} />
            <span className="text-sm font-medium">AI Learning Active</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-2">
        <nav className="flex space-x-1">
          {[
            { id: 'documents', label: 'Documents', icon: BookOpen },
            { id: 'history', label: 'Historical Data', icon: History },
            { id: 'insights', label: 'AI Insights', icon: Brain },
            { id: 'upload', label: 'Upload & Learn', icon: Upload },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'documents' && renderDocuments()}
      {activeTab === 'history' && renderHistory()}
      {activeTab === 'insights' && renderInsights()}
      {activeTab === 'upload' && renderUpload()}

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{viewingDoc.title}</h2>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                  {viewingDoc.content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
