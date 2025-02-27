export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  severity?: 'mild' | 'moderate' | 'severe' | 'emergency';
}

export interface UserProfile {
  age: string;
  gender: string;
  allergies: string;
  medicalConditions: string;
}