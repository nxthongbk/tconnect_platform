import React from 'react';
import { User, Mailbox, Phone, Factory } from '@phosphor-icons/react';

interface GetStartedModalProps {
  open: boolean;
  onClose: () => void;
}

const GetStartedModal: React.FC<GetStartedModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full mx-2 p-8 relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Get Started with EnergyFlow</h2>
          <p className="mb-6 text-gray-600">
            Fill out the form below and we'll contact you within 24 hours
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mailbox className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@company.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <div className="relative">
                <Factory className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your company name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
              <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Interested Plan</label>
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                className="flex-1 border rounded-lg px-4 py-3 text-center font-semibold hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                Starter
                <br />
                <span className="text-gray-500 text-sm">$99/month</span>
              </button>
              <button
                type="button"
                className="flex-1 border-2 border-blue-600 bg-blue-50 rounded-lg px-4 py-3 text-center font-semibold text-blue-600 shadow focus:ring-2 focus:ring-blue-500"
              >
                Professional
                <br />
                <span className="text-gray-500 text-sm">$299/month</span>
              </button>
              <button
                type="button"
                className="flex-1 border rounded-lg px-4 py-3 text-center font-semibold hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                Enterprise
                <br />
                <span className="text-gray-500 text-sm">Custom</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Additional Information</label>
            <textarea
              className="w-full border rounded-lg px-4 py-2 min-h-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about your energy monitoring needs, current challenges, or any specific requirements..."
            ></textarea>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Start Free Trial
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              type="button"
              className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStartedModal;
