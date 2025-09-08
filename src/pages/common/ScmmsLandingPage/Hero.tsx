import { Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
        <div className="grid smallLaptop:grid-cols-2 smallLaptop:gap-12 items-center">
          <div className="mb-10 smallLaptop:mb-0">
            <h1 className="text-4xl mobile:text-5xl miniLaptop:text-6xl font-bold text-gray-900 mb-6">
              Transform Your
              <span className="text-blue-600 block">Manufacturing Operations</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Increase production efficiency by 35% and reduce waste by 50% with our comprehensive
              manufacturing management platform. Optimize workflows, ensure quality control, and
              maximize profitability across your entire operation.
            </p>
            <div className="flex flex-col mobile:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center">
                Start Free 30-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Setup in minutes • Cancel anytime
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Manufacturing production line dashboard"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-green-600">35%</div>
              <div className="text-sm text-gray-600">Efficiency Increase</div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">$250K</div>
              <div className="text-sm text-gray-600">Avg. Annual Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
