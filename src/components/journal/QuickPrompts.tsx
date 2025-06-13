
import { Card } from '@/components/ui/card';
import { Edit3 } from 'lucide-react';

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export const QuickPrompts = ({ onPromptSelect }: QuickPromptsProps) => {
  const prompts = [
    "Today I learned about...",
    "My biggest challenge this week was...",
    "I'm feeling excited about...",
    "My next learning goal is...",
    "Something I discovered about myself..."
  ];

  return (
    <Card className="p-6 mb-8">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Writing Prompts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptSelect(prompt)}
            className="text-left p-4 text-sm rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Edit3 className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-gray-900">Start writing</span>
            </div>
            <p className="text-gray-600">{prompt}</p>
          </button>
        ))}
      </div>
    </Card>
  );
};
