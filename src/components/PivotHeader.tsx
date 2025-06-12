
import { Brain, Sparkles } from 'lucide-react';

export const PivotHeader = () => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 rounded-full pivot-gradient">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Pivot
        </h1>
        <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Your AI companion for career transformation. From stuck to unstoppable.
      </p>
    </div>
  );
};
