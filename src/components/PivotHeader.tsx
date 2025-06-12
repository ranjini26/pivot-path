
import { RotateCcw, MessageCircle, Heart, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PivotHeaderProps {
  onFeatureClick?: (feature: string) => void;
}

export const PivotHeader = ({ onFeatureClick }: PivotHeaderProps) => {
  const features = [
    {
      icon: <RotateCcw className="w-5 h-5 text-indigo-600" />,
      title: "Skill Swap Simulator",
      description: "Test how your skills transfer across 10+ trending industries",
      key: "skill-swap"
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-purple-600" />,
      title: "Mock Interview Prep",
      description: "AI interviewer with custom questions & empathetic feedback",
      key: "mock-interview"
    },
    {
      icon: <Heart className="w-5 h-5 text-pink-600" />,
      title: "Emotion Tracker",
      description: "Detects frustration and adapts advice with encouraging nudges",
      key: "emotion-tracker"
    }
  ];

  return (
    <div className="text-center mb-8 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="w-8 h-8 text-indigo-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Pivot
          </h1>
        </div>
        <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Transform career uncertainty into your next breakthrough
        </p>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Whether you're facing layoffs, automation, or industry shifts—you're not stuck. 
          You're just one pivot away from your next chapter.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="glass-effect p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 border-2 hover:border-indigo-300"
            onClick={() => onFeatureClick?.(feature.key)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
