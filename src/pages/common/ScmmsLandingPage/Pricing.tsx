import { Check, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: 'per user/month',
      description: 'Perfect for small manufacturers getting started with production optimization',
      features: [
        'Up to 50 production lines',
        'Basic production planning',
        'Quality control workflows',
        'Mobile app access',
        'Email support',
        'Basic reporting',
      ],
      highlighted: false,
      cta: 'Start Free Trial',
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per user/month',
      description: 'Advanced features for growing manufacturing operations',
      features: [
        'Unlimited production lines',
        'Advanced production planning',
        'Advanced inventory management',
        'OEE analytics & reporting',
        'API integrations',
        'Priority support',
        'Real-time dashboards',
        'Compliance tracking',
      ],
      highlighted: true,
      cta: 'Start Free Trial',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solutions for large manufacturing enterprises',
      features: [
        'Everything in Professional',
        'Multi-site management',
        'Custom integrations',
        'Dedicated account manager',
        'On-premise deployment',
        'Advanced security',
        'Custom training',
        'SLA guarantees',
      ],
      highlighted: false,
      cta: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl smallLaptop:text-4xl font-bold text-gray-900 mb-4">
            Flexible Pricing for Every Manufacturer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your manufacturing needs. All plans include a 30-day free
            trial with no credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 relative ${
                plan.highlighted
                  ? 'ring-2 ring-blue-600 shadow-2xl scale-105'
                  : 'shadow-lg hover:shadow-xl'
              } transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We offer flexible pricing for enterprise customers.
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            Contact our sales team →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
