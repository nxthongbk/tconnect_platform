import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChartBar,
  Shield,
  List,
  ArrowRight,
  GearSix,
  Wrench,
  CalendarBlank,
  WarningCircle,
  Gear,
  Play,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export default function MesLandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/login');
  };

  const features = [
    {
      icon: <Wrench className="text-blue-600" size={40} />,
      title: t('sCMMS.landingPage.features.workOrder.title'),
      desc: t('sCMMS.landingPage.features.workOrder.desc'),
      bg: 'bg-blue-50',
    },
    {
      icon: <CalendarBlank className="text-green-600 " size={40} />,
      title: t('sCMMS.landingPage.features.preventive.title'),
      desc: t('sCMMS.landingPage.features.preventive.desc'),
      bg: 'bg-green-50',
    },
    {
      icon: <ChartBar className="text-purple-600" size={40} />,
      title: t('sCMMS.landingPage.features.analytics.title'),
      desc: t('sCMMS.landingPage.features.analytics.desc'),
      bg: 'bg-purple-50',
    },
    {
      icon: <WarningCircle className="text-red-500 " size={40} />,
      title: t('sCMMS.landingPage.features.alerts.title'),
      desc: t('sCMMS.landingPage.features.alerts.desc'),
      bg: 'bg-red-50',
    },
    {
      icon: <Gear className="text-yellow-600 " size={40} />,
      title: t('sCMMS.landingPage.features.asset.title'),
      desc: t('sCMMS.landingPage.features.asset.desc'),
      bg: 'bg-yellow-50',
    },
    {
      icon: <Shield className="text-indigo-600 " size={40} />,
      title: t('sCMMS.landingPage.features.compliance.title'),
      desc: t('sCMMS.landingPage.features.compliance.desc'),
      bg: 'bg-indigo-50',
    },
  ];

  const testimonials = [
    {
      rating: 5,
      quote: t('sCMMS.landingPage.testimonials.list.0.quote'),
      name: t('sCMMS.landingPage.testimonials.list.0.name'),
      role: t('sCMMS.landingPage.testimonials.list.0.role'),
      companyUrl: '#',
    },
    {
      rating: 5,
      quote: t('sCMMS.landingPage.testimonials.list.1.quote'),
      name: t('sCMMS.landingPage.testimonials.list.1.name'),
      role: t('sCMMS.landingPage.testimonials.list.1.role'),
      companyUrl: '#',
    },
    {
      rating: 5,
      quote: t('sCMMS.landingPage.testimonials.list.2.quote'),
      name: t('sCMMS.landingPage.testimonials.list.2.name'),
      role: t('sCMMS.landingPage.testimonials.list.2.role'),
      companyUrl: '#',
    },
  ];

  const footerLinks = [
    {
      title: t('sCMMS.landingPage.footer.product.title'),
      links: [
        { label: t('sCMMS.landingPage.footer.product.features'), href: '#home' },
        { label: t('sCMMS.landingPage.footer.product.pricing'), href: '#pricing' },
        { label: t('sCMMS.landingPage.footer.product.integrations'), href: '#integrations' },
        { label: t('sCMMS.landingPage.footer.product.api'), href: '#api' },
      ],
    },
    {
      title: t('sCMMS.landingPage.footer.company.title'),
      links: [
        { label: t('sCMMS.landingPage.footer.company.about'), href: '#about' },
        { label: t('sCMMS.landingPage.footer.company.careers'), href: '#careers' },
        { label: t('sCMMS.landingPage.footer.company.contact'), href: '#contact' },
        { label: t('sCMMS.landingPage.footer.company.blog'), href: '#blog' },
      ],
    },
    {
      title: t('sCMMS.landingPage.footer.support.title'),
      links: [
        { label: t('sCMMS.landingPage.footer.support.documentation'), href: '#docs' },
        { label: t('sCMMS.landingPage.footer.support.helpCenter'), href: '#help' },
        { label: t('sCMMS.landingPage.footer.support.training'), href: '#training' },
        { label: t('sCMMS.landingPage.footer.support.status'), href: '#status' },
      ],
    },
  ];

  return (
    <div className="overflow-y-auto max-h-screen bg-white">
      <header>
        <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 mobile:px-6 miniLaptop:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <GearSix size={40} className="text-blue-600 mr-2" />
                  <span className="text-lg font-bold text-gray-900">FactoryCMMS</span>
                </div>
              </div>
              <div className="hidden tablet:flex ml-10 items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t('sCMMS.landingPage.menu.features')}
                </a>
                <a
                  href="#benefits"
                  className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t('sCMMS.landingPage.menu.benefits')}
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t('sCMMS.landingPage.menu.testimonials')}
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t('sCMMS.landingPage.menu.pricing')}
                </a>
              </div>

              <div className="hidden tablet:flex items-center space-x-4">
                <a
                  href="/login"
                  className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  onClick={handleSignIn}
                >
                  {t('sCMMS.landingPage.menu.login')}
                </a>
                <a
                  href="#get-started"
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                  {t('sCMMS.landingPage.menu.getStarted')}
                </a>
              </div>

              <div className="tablet:hidden">
                <button
                  className="text-gray-600 hover:text-blue-700 text-sm transition-colors"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <List size={24} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30 transition-opacity"
            onClick={() => setMenuOpen(false)}
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="relative w-full bg-white border-b border-gray-200 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className=" flex items-center justify-center">
                  <GearSix size={40} className="text-blue-600 p-1 rounded-md mr-2" />
                  <span className="text-lg font-bold text-gray-900">FactoryCMMS</span>
                </div>
              </div>
              <button
                className="text-2xl text-gray-600 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>
            <nav className="flex flex-col gap-4 px-4 py-2">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-700 px-3 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('sCMMS.landingPage.menu.features')}
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-blue-700 px-3 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('sCMMS.landingPage.menu.benefits')}
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-700 px-3 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('sCMMS.landingPage.menu.testimonials')}
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-700 px-3 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('sCMMS.landingPage.menu.pricing')}
              </a>
              <hr />
              <button
                className="text-gray-600 hover:text-blue-700 px-3  text-sm font-medium transition-colors flex items-center"
                onClick={handleSignIn}
              >
                {t('sCMMS.landingPage.menu.login')}
              </button>
              <a
                className="mt-1 w-full bg-blue-600 text-white py-2 rounded-lg text-center font-semibold hover:bg-blue-700 transition"
                href="#contact"
              >
                {t('sCMMS.landingPage.menu.getStarted')}
              </a>
            </nav>
          </div>
        </div>
      )}

      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8 py-24">
          <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl laptop:text-6xl font-bold leading-tight mb-6">
                {t('sCMMS.landingPage.hero.headline1')}
                <span className="text-orange-400 block">
                  {t('sCMMS.landingPage.hero.headline2')}
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {t('sCMMS.landingPage.hero.description')}
              </p>
              <div className="flex flex-col mobile:flex-row gap-4">
                <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center justify-center">
                  {t('sCMMS.landingPage.hero.startTrial')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  {t('sCMMS.landingPage.hero.watchDemo')}
                </button>
              </div>
            </div>
            <div className="smallLaptop:pl-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                <h3 className="text-2xl font-bold mb-6">{t('sCMMS.landingPage.stats.trusted')}</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">
                      {t('sCMMS.landingPage.stats.downtimeReduction')}
                    </div>
                    <div className="text-sm text-blue-100">
                      {t('sCMMS.landingPage.stats.downtimeReductionLabel')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">
                      {t('sCMMS.landingPage.stats.costSavings')}
                    </div>
                    <div className="text-sm text-blue-100">
                      {t('sCMMS.landingPage.stats.costSavingsLabel')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">
                      {t('sCMMS.landingPage.stats.systemUptime')}
                    </div>
                    <div className="text-sm text-blue-100">
                      {t('sCMMS.landingPage.stats.systemUptimeLabel')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">
                      {t('sCMMS.landingPage.stats.support')}
                    </div>
                    <div className="text-sm text-blue-100">
                      {t('sCMMS.landingPage.stats.supportLabel')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('sCMMS.landingPage.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('sCMMS.landingPage.features.subTitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:${feature.bg.replace('bg-', 'bg-').replace('-50', '-300')} ${feature.bg}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
          <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t('sCMMS.landingPage.results.title')}
              </h2>
              <p className="text-base text-gray-600 mb-8">{t('sCMMS.landingPage.results.desc')}</p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check-circle h-6 w-6 text-green-600"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('sCMMS.landingPage.results.reduceDowntime.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('sCMMS.landingPage.results.reduceDowntime.desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-dollar-sign h-6 w-6 text-blue-600"
                    >
                      <line x1="12" x2="12" y1="2" y2="22"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('sCMMS.landingPage.results.lowerCosts.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('sCMMS.landingPage.results.lowerCosts.desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trending-up h-6 w-6 text-purple-600"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('sCMMS.landingPage.results.increaseLifespan.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('sCMMS.landingPage.results.increaseLifespan.desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clock h-6 w-6 text-orange-600"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('sCMMS.landingPage.results.improveResponse.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('sCMMS.landingPage.results.improveResponse.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="smallLaptop:pl-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {t('sCMMS.landingPage.roiCalculator.title')}
                </h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-700">
                      {t('sCMMS.landingPage.roiCalculator.annualSavings')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('sCMMS.landingPage.roiCalculator.annualSavingsLabel')}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                    <div className="text-2xl font-bold text-green-700">
                      {t('sCMMS.landingPage.roiCalculator.roi')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('sCMMS.landingPage.roiCalculator.roiLabel')}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                    <div className="text-2xl font-bold text-purple-700">
                      {t('sCMMS.landingPage.roiCalculator.timeSaved')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('sCMMS.landingPage.roiCalculator.timeSavedLabel')}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                    <div className="text-2xl font-bold text-orange-700">
                      {t('sCMMS.landingPage.roiCalculator.payback')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('sCMMS.landingPage.roiCalculator.paybackLabel')}
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  {t('sCMMS.landingPage.roiCalculator.button')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
          <h2 className="text-3xl smallLaptop:text-4xl font-bold text-gray-900 mb-4 text-center">
            {t('sCMMS.landingPage.testimonials.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-10 text-center">
            {t('sCMMS.landingPage.testimonials.subTitle')}
          </p>
          <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="flex text-yellow-400 text-2xl">{'★★★★★'}</span>
                </div>
                <p className="text-gray-800 mb-6 leading-relaxed italic text-base">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 text-base">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 mobile:px-6 smallLaptop:px-8">
          <h2 className="text-3xl smallLaptop:text-4xl font-bold text-white mb-6">
            {t('sCMMS.landingPage.cta.headline')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">{t('sCMMS.landingPage.cta.subheadline')}</p>
          <div className="flex flex-col mobile:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
              {t('sCMMS.landingPage.cta.startTrial')}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {t('sCMMS.landingPage.cta.scheduleDemo')}
            </button>
          </div>
          <p className="text-gray-300 text-sm mt-4">{t('sCMMS.landingPage.cta.joinFactories')}</p>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 mobile:px-6 laptop:px-8 flex flex-col miniLaptop:flex-row gap-12 miniLaptop:gap-0 justify-between">
          <div className="flex-1 mb-8 miniLaptop:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center">
                <GearSix size={40} className="text-blue-600 p-1 rounded-md mr-2" />
                <span className="text-xl font-bold text-white">FactoryCMMS</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 miniLaptop:max-w-xs">
              {t('sCMMS.landingPage.footer.desc')}
            </p>
          </div>
          <div className="flex-[2] grid grid-cols-1 tablet:grid-cols-3 gap-8">
            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, lidx) => (
                    <li key={lidx}>
                      <a href={link.href} className="text-gray-400 hover:text-white transition">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="border-gray-700 my-8 max-w-7xl mx-auto" />
        <div className="text-center text-gray-400 text-sm">
          {t('sCMMS.landingPage.footer.copyright')}
        </div>
      </footer>
    </div>
  );
}
