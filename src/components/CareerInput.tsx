
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send, Lightbulb } from 'lucide-react';

interface CareerInputProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

export const CareerInput = ({ onSubmit, isLoading }: CareerInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  const examplePrompts = [
    "I'm a retail manager but stores are closing. I feel lost about what's next.",
    "Been in marketing for 10 years, got laid off. Not sure if I should pivot or stay.",
    "I'm a teacher but burnt out. Want to use my skills differently but don't know how."
  ];

  return (
    <Card className="glass-effect p-6 animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-foreground">Tell me your story</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Share your current situation, what you're struggling with, and what kind of change you're seeking.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I'm currently working as... but I'm feeling stuck because..."
            className="min-h-[120px] resize-none border-2 focus:border-primary/50 transition-colors"
            disabled={isLoading}
          />
          
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="w-full pivot-gradient text-white hover:opacity-90 transition-all duration-200 font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing your story...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Start Your Pivot Journey
              </div>
            )}
          </Button>
        </form>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Need inspiration? Try these:</p>
        <div className="space-y-2">
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInput(prompt)}
              disabled={isLoading}
              className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm border border-transparent hover:border-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};
