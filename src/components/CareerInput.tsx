
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send, Lightbulb, ArrowRight, Upload, FileText, RotateCcw, BookOpen } from 'lucide-react';

interface CareerInputProps {
  onSubmit: (input: string, resume?: File) => void;
  isLoading: boolean;
}

export const CareerInput = ({
  onSubmit,
  isLoading
}: CareerInputProps) => {
  const [input, setInput] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim(), resume || undefined);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setResume(file);
    }
  };

  const examplePrompts = [
    "I'm a retail manager but stores are closing. I feel lost about what's next.",
    "Been in marketing for 10 years, got laid off. Not sure if I should pivot or stay.",
    "I'm a teacher but burnt out. Want to use my skills differently but don't know how."
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Input Section */}
      <Card className="bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Tell me your story</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            Share your current situation, what you're struggling with, and what kind of change you're seeking.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="I'm currently working as... but I'm feeling stuck because..." 
              className="min-h-[140px] resize-none border-2 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-400" 
              disabled={isLoading} 
            />

            {/* Resume Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload your resume (optional but recommended)
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    accept=".pdf,image/*" 
                    onChange={handleResumeUpload} 
                    className="hidden" 
                    disabled={isLoading} 
                  />
                  <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
                    <Upload className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Choose file
                    </span>
                  </div>
                </label>
                {resume && (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <FileText className="w-4 h-4" />
                    <span>{resume.name}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF or image files only. This helps our AI provide more accurate career suggestions.
              </p>
            </div>
            
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading} 
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium py-3 text-base disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing your story & resume...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Start Your Pivot Journey
                </div>
              )}
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <p className="text-base font-medium text-gray-700 dark:text-gray-300">Need inspiration? Try these:</p>
          <div className="space-y-3">
            {examplePrompts.map((prompt, index) => (
              <button 
                key={index} 
                onClick={() => setInput(prompt)} 
                disabled={isLoading} 
                className="w-full text-left p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 dark:text-gray-200"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* App Features Section */}
      <div className="space-y-6">
        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">Skill Swap Simulator</h3>
            </div>
            <p className="text-blue-700 text-sm">
              Test how your skills transfer across 10+ trending industries
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-900">90-Day Learning Plans</h3>
            </div>
            <p className="text-purple-700 text-sm">
              Get practical, step-by-step upskilling roadmaps
            </p>
          </div>
        </div>

        {/* What You'll Get Section */}
        <Card className="bg-white dark:bg-gray-900 p-6 border-l-4 border-l-indigo-400 dark:border-l-indigo-500 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                What you'll get in 60 seconds:
              </h3>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• 3 career directions that match your transferable skills</li>
                <li>• Skill transfer analysis across trending industries</li>
                <li>• 90-day upskilling plan with free resources</li>
                <li>• Access to mock interviews</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
