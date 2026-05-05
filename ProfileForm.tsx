import React, { useState } from 'react';
import { UserProfile } from '../types.ts';
import { Sparkles, MapPin, Calendar, Clock } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [dob, setDob] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob && timeOfBirth && location) {
      onSubmit({ dob, timeOfBirth, location });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl animate-float">
      <div className="text-center mb-8">
        <Sparkles className="w-12 h-12 text-mystic-gold mx-auto mb-4 animate-twinkle" />
        <h2 className="text-3xl font-bold text-white mb-2 tracking-wider">Cosmic Alignment</h2>
        <p className="text-mystic-gold/80 text-sm">Enter your birth details to unlock your celestial guide.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Date of Birth
          </label>
          <input
            type="date"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-mystic-900/50 border border-mystic-accent/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mystic-accent focus:ring-1 focus:ring-mystic-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Time of Birth
          </label>
          <input
            type="time"
            required
            value={timeOfBirth}
            onChange={(e) => setTimeOfBirth(e.target.value)}
            className="w-full bg-mystic-900/50 border border-mystic-accent/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mystic-accent focus:ring-1 focus:ring-mystic-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> City of Birth
          </label>
          <input
            type="text"
            required
            placeholder="e.g., New York, NY"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-mystic-900/50 border border-mystic-accent/30 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-mystic-accent focus:ring-1 focus:ring-mystic-accent transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-mystic-accent to-purple-600 hover:from-purple-600 hover:to-mystic-accent text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-mystic-accent/20 flex items-center justify-center gap-2"
        >
          Read the Stars
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
