import React from 'react';
import { X, User, Settings } from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userProfile, updateProfile }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateProfile({
      ...userProfile,
      [name]: value
    });
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center">
            <User className="h-5 w-5 mr-2" />
            Your Profile
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-gray-600 mb-4">
            Providing your information helps us personalize health recommendations. All data is stored locally on your device.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={userProfile.age}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your age"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={userProfile.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                Allergies
              </label>
              <textarea
                id="allergies"
                name="allergies"
                value={userProfile.allergies}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="List any allergies"
                rows={2}
              />
            </div>

            <div>
              <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">
                Medical Conditions
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={userProfile.medicalConditions}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="List any medical conditions"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              Privacy Information
            </h3>
            <p className="mt-2 text-xs text-blue-700">
              Your health information is stored locally on your device and is not transmitted to any server. This data is used only to personalize the assistant's responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;