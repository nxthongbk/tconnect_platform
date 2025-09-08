import { 
  Factory, 
  Package2, 
  BarChart3, 
  ClipboardCheck, 
  ShieldCheck, 
  TrendingUp,
  Users,
  Cog
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Factory className="h-8 w-8 text-blue-600" />,
      title: "Production Planning",
      description: "Optimize production schedules and resource allocation. Plan capacity, manage workflows, and ensure on-time delivery with intelligent scheduling."
    },
    {
      icon: <Package2 className="h-8 w-8 text-green-600" />,
      title: "Inventory Management",
      description: "Real-time tracking of raw materials, WIP, and finished goods. Automated reordering and demand forecasting prevent stockouts and reduce carrying costs."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Production Analytics",
      description: "Comprehensive OEE reporting and KPI dashboards. Track efficiency, quality metrics, and costs to optimize manufacturing performance."
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-orange-600" />,
      title: "Quality Control",
      description: "Integrated quality management with inspection workflows. Track defects, manage corrective actions, and ensure consistent product quality."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-red-600" />,
      title: "Compliance Tracking",
      description: "Maintain ISO, FDA, and industry compliance with automated documentation. Track certifications, audits, and regulatory requirements."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-yellow-600" />,
      title: "Performance Optimization",
      description: "Continuous improvement through lean manufacturing principles. Identify bottlenecks, reduce waste, and optimize throughput."
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Workforce Management",
      description: "Manage shift schedules, track labor costs, and optimize workforce allocation. Improve communication across production teams."
    },
    {
      icon: <Cog className="h-8 w-8 text-pink-600" />,
      title: "Equipment Integration",
      description: "Connect with existing machinery and IoT sensors. Real-time monitoring and predictive maintenance for maximum uptime."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl smallLaptop:text-4xl font-bold text-gray-900 mb-4">
            Complete Manufacturing Management Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our integrated platform provides all the tools necessary to optimize your 
            manufacturing operations, improve quality, and maximize profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl group transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;