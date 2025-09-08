import { TrendingUp, Clock, DollarSign, Award } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-12 w-12 text-green-500" />,
      title: "Increase Efficiency",
      value: "Up to 35%",
      description: "Optimize production workflows and eliminate bottlenecks with intelligent scheduling and resource allocation."
    },
    {
      icon: <DollarSign className="h-12 w-12 text-green-500" />,
      title: "Reduce Operating Costs",
      value: "Average $250K/year",
      description: "Minimize waste, optimize inventory levels, and improve resource utilization across your manufacturing operations."
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-500" />,
      title: "Faster Time-to-Market",
      value: "50% Faster",
      description: "Accelerate production cycles with optimized planning, quality control, and streamlined workflows."
    },
    {
      icon: <Award className="h-12 w-12 text-purple-500" />,
      title: "Improve Quality",
      value: "99.5% Quality Rate",
      description: "Achieve consistent product quality with integrated quality control and continuous improvement processes."
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl smallLaptop:text-4xl font-bold text-gray-900 mb-4">
            Proven Results for Manufacturing Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of manufacturers that have transformed their operations 
            with ManufactureMax and achieved significant productivity gains and cost reductions.
          </p>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {benefit.value}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Your Manufacturing ROI
          </h3>
          <p className="text-xl mb-6 opacity-90">
            See how much ManufactureMax could improve your manufacturing efficiency and profitability.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get ROI Estimate
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;