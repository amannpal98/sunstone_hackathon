import React, { useState } from 'react';
import { Heart, ArrowRight, Shield, MessageSquare, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types';

interface WelcomeScreenProps {
  onStart: (profile: UserProfile) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    gender: '',
    allergies: '',
    medicalConditions: '',
  });
  const [skipProfile, setSkipProfile] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onStart(profile);
    }
  };

  const handleSkip = () => {
    setSkipProfile(true);
    onStart({
      age: '',
      gender: '',
      allergies: '',
      medicalConditions: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Heart className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            AI Health Assistant
          </h1>
          
          <p className="text-center text-gray-600 mb-6">
            Your personal guide for health information and first-aid assistance
          </p>

          {step === 1 ? (
            <>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Symptom Analysis</h3>
                    <p className="text-sm text-gray-600">Describe your symptoms for instant guidance and severity assessment</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">First-Aid Guidance</h3>
                    <p className="text-sm text-gray-600">Step-by-step instructions for common emergencies</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Reliable Health Information</h3>
                    <p className="text-sm text-gray-600">Evidence-based advice from trusted medical sources</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This assistant is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-700 mb-4">
                Providing your information helps personalize health recommendations. This is optional and stored only on your device.
              </p>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={profile.age}
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
                  value={profile.gender}
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
                  value={profile.allergies}
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
                  value={profile.medicalConditions}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List any medical conditions"
                  rows={2}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {step === 1 ? (
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            ) : (
              <>
                <button
                  onClick={handleSkip}
                  className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Skip
                </button>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;