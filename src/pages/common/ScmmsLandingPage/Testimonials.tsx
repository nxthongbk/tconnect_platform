import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "ManufactureMax has revolutionized our production efficiency. We've increased throughput by 40% while reducing waste by 60%. The integrated quality control has eliminated costly recalls.",
      author: 'David Chen',
      title: 'Plant Manager',
      company: 'Precision Manufacturing Inc',
      image:
        'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      quote:
        "The production planning and inventory optimization features have transformed our operations. We've reduced inventory costs by 30% while improving on-time delivery to 99.2%.",
      author: 'Sarah Rodriguez',
      title: 'Operations Director',
      company: 'Advanced Manufacturing Corp',
      image:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      quote:
        "The real-time analytics and OEE tracking have given us unprecedented visibility into our operations. We've identified and eliminated bottlenecks we didn't even know existed.",
      author: 'Michael Thompson',
      title: 'Manufacturing Director',
      company: 'Industrial Solutions Group',
      image:
        'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  ];

  const companies = [
    'Precision Mfg',
    'Industrial Pro',
    'Manufacturing Plus',
    'Production Systems',
    'Quality Corp',
    'Efficiency Inc',
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl smallLaptop:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Manufacturing Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Over 500+ manufacturers rely on ManufactureMax to optimize their production operations
            and achieve operational excellence.
          </p>
        </div>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 relative">
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="h-8 w-8 text-blue-600" />
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.title}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 tablet:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Manufacturers Trust Us</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-gray-600">System Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
