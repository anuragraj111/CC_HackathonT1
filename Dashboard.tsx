import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types.ts';
import { generateDailyHoroscope, generateCosmicAdvice } from '../services/ai.ts';
import MarkdownRenderer from './MarkdownRenderer.tsx';
import { Moon, Sun, Star, MessageCircle, Loader2, RefreshCw } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onReset }) => {
  const [horoscope, setHoroscope] = useState<string | null>(null);
  const [isLoadingHoroscope, setIsLoadingHoroscope] = useState(true);
  const [horoscopeError, setHoroscopeError] = useState<string | null>(null);

  const [adviceQuestion, setAdviceQuestion] = useState('');
  const [adviceAnswer, setAdviceAnswer] = useState<string | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);
  const [adviceError, setAdviceError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchHoroscope = async () => {
      setIsLoadingHoroscope(true);
      setHoroscopeError(null);
      try {
        const result = await generateDailyHoroscope(profile);
        if (isMounted) setHoroscope(result);
      } catch (err: any) {
        if (isMounted) setHoroscopeError(err.message || "Failed to load horoscope.");
      } finally {
        if (isMounted) setIsLoadingHoroscope(false);
      }
    };

    fetchHoroscope();

    return () => {
      isMounted = false;
    };
  }, [profile]);

  const handleAskAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adviceQuestion.trim()) return;

    setIsLoadingAdvice(true);
    setAdviceError(null);
    setAdviceAnswer(null);

    try {
      const result = await generateCosmicAdvice(profile, adviceQuestion);
      setAdviceAnswer(result);
    } catch (err: any) {
      setAdviceError(err.message || "Failed to get advice.");
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-mystic-accent/20 rounded-full">
            <Star className="w-6 h-6 text-mystic-gold" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Your Cosmic Profile</h2>
            <p className="text-sm text-white/60">
              {new Date(profile.dob).toLocaleDateString()} • {profile.location}
            </p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
        >
          <RefreshCw className="w-4 h-4" /> Update Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Horoscope Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Sun className="w-24 h-24 text-mystic-gold animate-spin-slow" style={{ animationDuration: '20s' }} />
          </div>
          
          <h3 className="text-2xl font-bold text-mystic-gold mb-6 flex items-center gap-2 relative z-10">
            <Moon className="w-6 h-6" /> Daily Horoscope
          </h3>

          <div className="relative z-10 min-h-[200px]">
            {isLoadingHoroscope ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-white/60 py-12">
                <Loader2 className="w-8 h-8 animate-spin text-mystic-accent" />
                <p>Consulting the stars...</p>
              </div>
            ) : horoscopeError ? (
              <div className="text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                {horoscopeError}
              </div>
            ) : horoscope ? (
              <div className="custom-scrollbar overflow-y-auto max-h-[500px] pr-2">
                 <MarkdownRenderer content={horoscope} />
              </div>
            ) : null}
          </div>
        </div>

        {/* Quick Advice Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl flex flex-col">
          <h3 className="text-2xl font-bold text-mystic-gold mb-2 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" /> Cosmic Guidance
          </h3>
          <p className="text-sm text-white/70 mb-6">
            Ask the stars for advice on a specific situation today.
          </p>

          <form onSubmit={handleAskAdvice} className="mb-6">
            <div className="relative">
              <textarea
                value={adviceQuestion}
                onChange={(e) => setAdviceQuestion(e.target.value)}
                placeholder="e.g., I have an important meeting today, how can I succeed?"
                className="w-full bg-mystic-900/50 border border-mystic-accent/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-mystic-accent focus:ring-1 focus:ring-mystic-accent transition-colors resize-none h-24"
                required
              />
              <button
                type="submit"
                disabled={isLoadingAdvice || !adviceQuestion.trim()}
                className="absolute bottom-3 right-3 bg-mystic-accent hover:bg-purple-500 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingAdvice ? <Loader2 className="w-5 h-5 animate-spin" /> : <Star className="w-5 h-5" />}
              </button>
            </div>
          </form>

          <div className="flex-grow bg-mystic-900/30 rounded-xl p-4 border border-white/5 overflow-y-auto max-h-[300px]">
            {isLoadingAdvice ? (
               <div className="flex items-center justify-center h-full text-white/60 gap-2">
                 <Loader2 className="w-5 h-5 animate-spin text-mystic-accent" />
                 <span>Channeling cosmic wisdom...</span>
               </div>
            ) : adviceError ? (
              <div className="text-red-400 text-sm">{adviceError}</div>
            ) : adviceAnswer ? (
              <div className="text-white/90 text-sm leading-relaxed">
                <MarkdownRenderer content={adviceAnswer} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-white/40 text-sm italic text-center">
                Your personalized advice will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
