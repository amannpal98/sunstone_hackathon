import React, { KeyboardEvent, RefObject } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Message } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  inputValue,
  setInputValue,
  handleSendMessage,
  messagesEndRef
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSeverityClass = (severity?: string) => {
    switch (severity) {
      case 'mild':
        return 'border-l-4 border-blue-400 bg-blue-50';
      case 'moderate':
        return 'border-l-4 border-yellow-400 bg-yellow-50';
      case 'severe':
        return 'border-l-4 border-orange-500 bg-orange-50';
      case 'emergency':
        return 'border-l-4 border-red-500 bg-red-50';
      default:
        return '';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : `bg-white shadow-sm ${getSeverityClass(message.severity)}`
              }`}
            >
              <div className="flex items-start mb-1">
                <div className="mr-2">
                  {message.sender === 'user' ? (
                    <User className="h-5 w-5 text-blue-200" />
                  ) : (
                    <Bot className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <div className={`text-sm ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.sender === 'user' ? 'You' : 'Health Assistant'}
                </div>
              </div>
              <div className="whitespace-pre-line">
                {message.text}
              </div>
              <div className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
                <span className="text-gray-500">Analyzing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms or ask for health advice..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || inputValue.trim() === ''}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 flex items-center">
          <span className="mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </span>
          <span>
            Not a substitute for professional medical advice. In emergencies, call emergency services.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;