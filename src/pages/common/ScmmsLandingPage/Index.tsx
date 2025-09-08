import Benefits from './Benefits';
import Contact from './Contact';
import Features from './Features';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';
import Pricing from './Pricing';
import Testimonials from './Testimonials';

export default function SCMMSLandingPage() {
  return (
    <div className="overflow-y-auto max-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
