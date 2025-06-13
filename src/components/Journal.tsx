
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Calendar, ArrowLeft, Trash2 } from 'lucide-react';

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
      date: new Date().toLocaleDateString(),
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
    setIsWriting(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            Learning Journey Journal
          </h2>
          <p className="mt-1 text-muted-foreground">
            Document your thoughts, progress, and insights on your career transformation journey
          </p>
        </div>
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Quick Prompts */}
      {!isWriting && (
        <Card className="glass-effect p-6">
          <h3 className="font-medium mb-4 text-foreground">Quick writing prompts to get you started:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="text-left p-3 text-sm rounded-lg border border-border hover:bg-muted transition-colors bg-background"
              >
                {prompt}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* New Entry Form */}
      {isWriting ? (
        <Card className="glass-effect p-6">
          <div className="space-y-4">
            <Input
              placeholder="Entry title..."
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="text-lg font-medium"
            />
            <Textarea
              placeholder="Share your thoughts, learnings, challenges, or plans..."
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <Input
              placeholder="Tags (comma separated, e.g. learning, challenge, goal)"
              value={currentTags}
              onChange={(e) => setCurrentTags(e.target.value)}
              className="text-sm"
            />
            <div className="flex gap-3">
              <Button 
                onClick={handleSaveEntry} 
                disabled={!currentTitle.trim() || !currentContent.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
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
        <Card className="glass-effect p-6 text-center">
          <Button 
            onClick={() => setIsWriting(true)} 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Write New Entry
          </Button>
        </Card>
      )}

      {/* Journal Entries */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <Card className="glass-effect p-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground mb-2">Your journal is empty</h3>
            <p className="text-muted-foreground text-sm">
              Start documenting your learning journey and career transformation thoughts.
            </p>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="glass-effect p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{entry.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{entry.date}</span>
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
              
              <p className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                {entry.content}
              </p>
              
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
