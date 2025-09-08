import { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import LoginForm from '../LogInPage/components/LoginForm';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setLoginModalOpen(true);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {loginModalOpen && (
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
      )}

      <div className="max-w-7xl mx-auto px-4 mobile:px-6 smallLaptop:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Settings className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ManufactureMax</span>
          </div>

          <nav className="hidden smallLaptop:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">
              Benefits
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden smallLaptop:flex items-center space-x-4">
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
          </div>

          <button className="smallLaptop:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="smallLaptop:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Testimonials
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <div className="pt-4 border-t flex flex-col space-y-2">
                <button className="text-left text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </button>
                <button className="text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
