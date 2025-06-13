
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Calendar, ArrowLeft, Trash2, Edit3, Target } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

interface JournalProps {
  onBack: () => void;
}

export const Journal = ({ onBack }: JournalProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [currentTags, setCurrentTags] = useState('');

  const handleSaveEntry = () => {
    if (!currentTitle.trim() || !currentContent.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: currentTitle.trim(),
      content: currentContent.trim(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      tags: currentTags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentTitle('');
    setCurrentContent('');
    setCurrentTags('');
    setIsWriting(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const quickPrompts = [
    "Today I learned about...",
    "My biggest challenge this week was...",
    "I'm feeling excited about...",
    "My next learning goal is...",
    "I need to focus more on...",
    "Something I discovered about myself..."
  ];

  const handleQuickPrompt = (prompt: string) => {
    setCurrentContent(prompt + " ");
    setCurrentTitle("Learning Reflection - " + new Date().toLocaleDateString());
    setIsWriting(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={onBack} 
              variant="ghost" 
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Learning Journey Journal</h1>
              <p className="text-white/90 text-lg">
                Document your career transformation thoughts, progress, and insights
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Total Entries</span>
              </div>
              <p className="text-2xl font-bold">{entries.length}</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">This Month</span>
              </div>
              <p className="text-2xl font-bold">
                {entries.filter(entry => 
                  new Date(entry.date).getMonth() === new Date().getMonth()
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      {!isWriting && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg text-foreground mb-4">Quick writing prompts to get started</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-left p-4 text-sm rounded-lg border border-border hover:bg-muted transition-colors bg-card group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Edit3 className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium text-foreground">Start writing</span>
                </div>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {prompt}
                </p>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* New Entry Form */}
      {isWriting ? (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">New Journal Entry</h3>
            </div>
            
            <Input
              placeholder="Entry title..."
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="text-lg font-medium h-12"
            />
            
            <Textarea
              placeholder="Share your thoughts, learnings, challenges, or plans..."
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              rows={10}
              className="resize-none text-base leading-relaxed"
            />
            
            <Input
              placeholder="Tags (comma separated, e.g. learning, challenge, goal)"
              value={currentTags}
              onChange={(e) => setCurrentTags(e.target.value)}
              className="text-sm"
            />
            
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleSaveEntry} 
                disabled={!currentTitle.trim() || !currentContent.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6"
              >
                Save Entry
              </Button>
              <Button 
                onClick={() => setIsWriting(false)} 
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center border-dashed border-2">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <Plus className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Ready to write?</h3>
              <p className="text-muted-foreground mb-4">
                Capture your thoughts, progress, and insights on your career journey.
              </p>
            </div>
            <Button 
              onClick={() => setIsWriting(true)} 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Write New Entry
            </Button>
          </div>
        </Card>
      )}

      {/* Journal Entries */}
      <div className="space-y-6">
        {entries.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Your journal is empty</h3>
            <p className="text-muted-foreground">
              Start documenting your learning journey and career transformation thoughts.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Your Entries</h2>
              <Badge variant="secondary" className="px-3 py-1">
                {entries.length} entries
              </Badge>
            </div>
            
            {entries.map((entry) => (
              <Card key={entry.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-2">{entry.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{entry.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDeleteEntry(entry.id)}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="prose prose-sm max-w-none mb-4">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </div>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
