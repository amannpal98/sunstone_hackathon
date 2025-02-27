import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Info, AlertTriangle, Heart, User, Bot, ArrowRight } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import { Message, UserProfile } from './types';
import { healthData } from './data/healthData';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: '',
    gender: '',
    allergies: '',
    medicalConditions: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue, userProfile);
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (input: string, profile: UserProfile): Message => {
    const inputLower = input.toLowerCase();
    let responseText = '';
    let severity = '';

    // Check for emergency keywords
    if (
      inputLower.includes('emergency') || 
      inputLower.includes('severe pain') || 
      inputLower.includes('unconscious') ||
      inputLower.includes('not breathing') ||
      inputLower.includes('heart attack') ||
      inputLower.includes('stroke')
    ) {
      return {
        id: Date.now().toString(),
        text: "⚠️ This sounds like a medical emergency. Please call emergency services (911/999/112) immediately. Do not wait for further chat responses.",
        sender: 'bot',
        timestamp: new Date(),
        severity: 'emergency'
      };
    }

    // First aid guidance
    if (
      inputLower.includes('burn') || 
      inputLower.includes('cut') || 
      inputLower.includes('bleeding') ||
      inputLower.includes('choking') ||
      inputLower.includes('faint')
    ) {
      if (inputLower.includes('burn')) {
        responseText = healthData.firstAid.burns;
        severity = 'moderate';
      } else if (inputLower.includes('cut') || inputLower.includes('bleeding')) {
        responseText = healthData.firstAid.cuts;
        severity = 'moderate';
      } else if (inputLower.includes('choking')) {
        responseText = healthData.firstAid.choking;
        severity = 'severe';
      } else if (inputLower.includes('faint')) {
        responseText = healthData.firstAid.fainting;
        severity = 'moderate';
      }
    } 
    // Symptom analysis
    else if (
      inputLower.includes('headache') || 
      inputLower.includes('fever') || 
      inputLower.includes('cough') ||
      inputLower.includes('pain') ||
      inputLower.includes('symptom')
    ) {
      if (inputLower.includes('headache')) {
        responseText = healthData.symptoms.headache;
        severity = 'mild';
        
        // Personalization based on profile
        if (profile.age && parseInt(profile.age) > 60) {
          responseText += "\n\nNote: For individuals over 60, persistent headaches should be discussed with a healthcare provider, especially if they're sudden or severe.";
        }
      } else if (inputLower.includes('fever')) {
        responseText = healthData.symptoms.fever;
        severity = 'moderate';
        
        // Personalization
        if (profile.medicalConditions && profile.medicalConditions.toLowerCase().includes('immune')) {
          responseText += "\n\nImportant: With your immune condition, fever requires closer monitoring. Consider contacting your doctor sooner than generally recommended.";
        }
      } else if (inputLower.includes('cough')) {
        responseText = healthData.symptoms.cough;
        severity = 'mild';
      } else {
        responseText = "I notice you're mentioning some symptoms. Could you provide more details about what you're experiencing? This will help me give you more specific information.";
      }
    }
    // Health tips and general information
    else if (
      inputLower.includes('diet') || 
      inputLower.includes('exercise') || 
      inputLower.includes('sleep') ||
      inputLower.includes('stress') ||
      inputLower.includes('health tip')
    ) {
      if (inputLower.includes('diet')) {
        responseText = healthData.healthTips.diet;
      } else if (inputLower.includes('exercise')) {
        responseText = healthData.healthTips.exercise;
        
        // Personalization
        if (profile.age) {
          const age = parseInt(profile.age);
          if (age > 65) {
            responseText += "\n\nFor adults over 65: Focus on balance exercises and gentle strength training. Always consult your doctor before starting a new exercise program.";
          } else if (age < 18) {
            responseText += "\n\nFor younger individuals: At least 60 minutes of moderate to vigorous activity daily is recommended, with a mix of aerobic activity and strength training.";
          }
        }
      } else if (inputLower.includes('sleep')) {
        responseText = healthData.healthTips.sleep;
      } else if (inputLower.includes('stress')) {
        responseText = healthData.healthTips.stress;
      } else {
        responseText = healthData.healthTips.general;
      }
    }
    // Default response if no specific match
    else {
      responseText = "I'm your health assistant, ready to help with symptom analysis, first-aid guidance, and health information. How can I assist you today?";
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      severity: severity
    };
  };

  const startChat = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowWelcome(false);
    
    // Initial greeting message
    const initialMessage: Message = {
      id: Date.now().toString(),
      text: `Hello${profile.age ? ' and thank you for sharing your information' : ''}! I'm your AI health assistant. I can help with symptom analysis, first-aid guidance, and general health information. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={startChat} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userProfile={userProfile}
        updateProfile={setUserProfile}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <h1 className="text-xl font-semibold text-gray-800">Health Assistant</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </header>
        
        <ChatInterface 
          messages={messages} 
          isLoading={isLoading} 
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
        />
      </div>
    </div>
  );
}

export default App;