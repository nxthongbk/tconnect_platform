import { useState, useEffect } from 'react';
import {
  Zap,
  Shield,
  BarChart3,
  Globe,
  Smartphone,
  Cloud,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  TrendingUp,
  Lock,
  LogIn,
  Network,
  Radio,
  Cpu,
  Database,
  Activity,
  Languages,
  Twitter,
  Facebook,
} from 'lucide-react';
import { translations, Translation } from './translations';
import { useNavigate } from 'react-router-dom';
import ROUTES from '~/constants/routes.constant';
// import LoginForm from '../LogInPage/components/LoginForm';

function TConnectLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const navigate = useNavigate();
  // const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    // setIsMenuOpen(false);
    // setLoginModalOpen(true);
    let url = ROUTES.SCITY_URL;
    const extractExternalUrl = (raw: string) => {
      try {
        //  const lower = raw.toLowerCase();
        const lastHttpIndex = Math.max(raw.lastIndexOf('http://'), raw.lastIndexOf('https://'));
        if (lastHttpIndex > 0) return raw.slice(lastHttpIndex);
      } catch {
        /* ignore */
      }
      return raw;
    };

    if (url.includes('localhost')) {
      url = extractExternalUrl(url);
    }

    if (/^https?:\/\//i.test(url)) {
      window.location.href = url;
      return;
    }

    navigate(url);
  };

  const t: Translation = translations[language];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t.features.items.realtime.title,
      description: t.features.items.realtime.description,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t.features.items.security.title,
      description: t.features.items.security.description,
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t.features.items.analytics.title,
      description: t.features.items.analytics.description,
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t.features.items.connectivity.title,
      description: t.features.items.connectivity.description,
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t.features.items.mobile.title,
      description: t.features.items.mobile.description,
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: t.features.items.cloud.title,
      description: t.features.items.cloud.description,
    },
  ];

  const stats = [
    { number: '10M+', label: t.hero.stats.devices },
    { number: '99.9%', label: t.hero.stats.uptime },
    { number: '150+', label: t.hero.stats.countries },
    { number: '24/7', label: t.hero.stats.support },
  ];

  const testimonials = t.testimonials.items.map(item => ({ ...item, rating: 5 }));

  const networkNodes = [
    { id: 1, x: 20, y: 30, size: 'small' },
    { id: 2, x: 80, y: 20, size: 'large' },
    { id: 3, x: 60, y: 60, size: 'medium' },
    { id: 4, x: 30, y: 80, size: 'small' },
    { id: 5, x: 90, y: 70, size: 'medium' },
    { id: 6, x: 10, y: 60, size: 'small' },
    { id: 7, x: 70, y: 40, size: 'large' },
    { id: 8, x: 40, y: 20, size: 'medium' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-0">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-700 text-2xl font-bold z-10"
              onClick={() => setLoginModalOpen(false)}
              aria-label="Close login modal"
            >
              &times;
            </button>
            <LoginForm setResetMode={() => {}} />
          </div>
        </div>
      )} */}
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-teal-500/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 smallLaptop:px-6 miniLaptop:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Network className="w-8 h-8 text-teal-400" />
              <span className="text-xl font-bold text-white">IoTPlatform</span>
            </div>

            <div className="hidden smallLaptop:block">
              <div className="flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  {t.nav.features}
                </a>
                <a
                  href="#benefits"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  {t.nav.benefits}
                </a>
                <a
                  href="#testimonials"
                  className="text-slate-300 hover:text-teal-400 transition-colors"
                >
                  {t.nav.testimonials}
                </a>
                <a href="#pricing" className="text-slate-300 hover:text-teal-400 transition-colors">
                  {t.nav.pricing}
                </a>

                {/* Language Switcher */}
                <div className="relative">
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
                    className="flex items-center space-x-2 text-slate-300 hover:text-teal-400 transition-colors"
                  >
                    <Languages className="w-4 h-4" />
                    <span className="text-sm font-medium">{language === 'en' ? 'VI' : 'EN'}</span>
                  </button>
                </div>

                <button
                  className="flex items-center space-x-2 bg-transparent border border-teal-400 hover:bg-teal-400 text-teal-400 hover:text-slate-900 px-4 py-2 rounded-lg transition-all duration-300"
                  onClick={handleSignIn}
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.nav.login}</span>
                </button>
                <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-500/25">
                  {t.nav.getStarted}
                </button>
              </div>
            </div>

            <div className="smallLaptop:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-teal-400"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="smallLaptop:hidden bg-slate-900/95 backdrop-blur-md border-t border-teal-500/20">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-slate-300 hover:text-teal-400">
                {t.nav.features}
              </a>
              <a href="#benefits" className="block py-2 text-slate-300 hover:text-teal-400">
                {t.nav.benefits}
              </a>
              <a href="#testimonials" className="block py-2 text-slate-300 hover:text-teal-400">
                {t.nav.testimonials}
              </a>
              <a href="#pricing" className="block py-2 text-slate-300 hover:text-teal-400">
                {t.nav.pricing}
              </a>

              {/* Mobile Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
                className="flex items-center space-x-2 py-2 text-slate-300 hover:text-teal-400 transition-colors"
              >
                <Languages className="w-4 h-4" />
                <span>{language === 'en' ? 'Tiếng Việt' : 'English'}</span>
              </button>

              <button className="w-full mt-2 flex items-center justify-center space-x-2 bg-transparent border border-teal-400 hover:bg-teal-400 text-teal-400 hover:text-slate-900 px-4 py-2 rounded-lg transition-all duration-300">
                <LogIn className="w-4 h-4" />
                <span>{t.nav.login}</span>
              </button>
              <button className="w-full mt-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg transition-all duration-300">
                {t.nav.getStarted}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Animated Network Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          {/* Network Nodes */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines */}
            {networkNodes.map((node, index) =>
              networkNodes
                .slice(index + 1)
                .map((targetNode, targetIndex) => (
                  <line
                    key={`${index}-${targetIndex}`}
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="url(#gradient)"
                    strokeWidth="0.2"
                    opacity="0.6"
                    className="animate-pulse"
                    style={{ animationDelay: `${Math.random() * 2}s` }}
                  />
                ))
            )}

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Network Nodes */}
            {networkNodes.map((node, index) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={node.size === 'small' ? 0.8 : node.size === 'medium' ? 1.2 : 1.8}
                fill="#14b8a6"
                filter="url(#glow)"
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.3}s` }}
              />
            ))}
          </svg>

          {/* Floating Network Icons */}
          <div
            className="absolute top-20 left-10 animate-bounce"
            style={{ animationDelay: '0s', animationDuration: '3s' }}
          >
            <Radio className="w-8 h-8 text-teal-400 opacity-60" />
          </div>
          <div
            className="absolute top-40 right-20 animate-bounce"
            style={{ animationDelay: '1s', animationDuration: '4s' }}
          >
            <Cpu className="w-6 h-6 text-cyan-400 opacity-60" />
          </div>
          <div
            className="absolute bottom-40 left-20 animate-bounce"
            style={{ animationDelay: '2s', animationDuration: '3.5s' }}
          >
            <Database className="w-7 h-7 text-teal-300 opacity-60" />
          </div>
          <div
            className="absolute bottom-20 right-10 animate-bounce"
            style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}
          >
            <Activity className="w-6 h-6 text-cyan-300 opacity-60" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 smallLaptop:px-6 miniLaptop:px-8 text-center">
          <h1 className="text-4xl smallLaptop:text-6xl miniLaptop:text-7xl font-bold text-white mb-6 leading-tight">
            {t.hero.title.connect} {t.hero.title.monitor}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              {t.hero.title.transform}
            </span>
          </h1>

          <p className="text-xl smallLaptop:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col tablet:flex-row items-center justify-center space-y-4 tablet:space-y-0 smallLaptop:space-x-6">
            <button className="group bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25">
              {t.hero.startTrial}
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-teal-400/50 hover:border-teal-400 hover:bg-teal-400/10 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm">
              {t.hero.watchDemo}
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 smallLaptop:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl smallLaptop:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-teal-200 text-sm smallLaptop:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 smallLaptop:px-6 miniLaptop:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl smallLaptop:text-5xl font-bold text-white mb-6">
              {t.features.title}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 hover:border-teal-500/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-teal-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 smallLaptop:px-6 miniLaptop:px-8">
          <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl smallLaptop:text-5xl font-bold text-white mb-8">
                {t.benefits.title}
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: t.benefits.items.efficiency.title,
                    desc: t.benefits.items.efficiency.description,
                  },
                  {
                    icon: <Lock className="w-6 h-6" />,
                    title: t.benefits.items.security.title,
                    desc: t.benefits.items.security.description,
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: t.benefits.items.support.title,
                    desc: t.benefits.items.support.description,
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center text-teal-400">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-slate-300">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-2xl text-white border border-teal-500/30 shadow-2xl shadow-teal-500/20">
                <h3 className="text-2xl font-bold mb-6">{t.benefits.cta.title}</h3>
                <ul className="space-y-3 mb-8">
                  {t.benefits.cta.features.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-teal-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white text-teal-600 py-3 px-6 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-lg">
                  {t.benefits.cta.button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 smallLaptop:px-6 miniLaptop:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl smallLaptop:text-5xl font-bold text-white mb-6">
              {t.testimonials.title}
            </h2>
            <p className="text-xl text-slate-300">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 hover:border-teal-500/50 p-8 rounded-2xl shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-teal-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern
                id="network-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
                <line
                  x1="10"
                  y1="10"
                  x2="30"
                  y2="10"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.2"
                />
                <line
                  x1="10"
                  y1="10"
                  x2="10"
                  y2="30"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.2"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#network-pattern)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 smallLaptop:px-6 miniLaptop:px-8 text-center">
          <h2 className="text-4xl smallLaptop:text-5xl font-bold text-white mb-6">{t.cta.title}</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>

          <div className="flex flex-col tablet:flex-row items-center justify-center space-y-4 tablet:space-y-0 tablet:space-x-6">
            <button className="bg-white hover:bg-slate-100 text-teal-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t.cta.startTrial}
            </button>
            <button className="border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm">
              {t.cta.contactSales}
            </button>
          </div>

          <p className="text-teal-200 mt-6">{t.cta.disclaimer}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 smallLaptop:px-6 miniLaptop:px-8">
          <div className="grid grid-cols-1 smallLaptop:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Network className="w-8 h-8 text-teal-400" />
                <span className="text-xl font-bold">IoTPlatform</span>
              </div>
              <p className="text-slate-400 mb-4">{t.footer.description}</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  <span className="sr-only">
                    <Twitter />
                  </span>
                  <div className="w-6 h-6 bg-slate-600 hover:bg-teal-500 rounded transition-colors"></div>
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  <span className="sr-only">
                    <Facebook />
                  </span>
                  <div className="w-6 h-6 bg-slate-600 hover:bg-teal-500 rounded transition-colors"></div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.product.title}</h3>
              <ul className="space-y-2">
                {t.footer.product.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.company.title}</h3>
              <ul className="space-y-2">
                {t.footer.company.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.support.title}</h3>
              <ul className="space-y-2">
                {t.footer.support.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TConnectLandingPage;
