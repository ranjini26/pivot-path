
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Calendar, ArrowLeft, Trash2, Edit3, Target, Save, X } from 'lucide-react';

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

  const handleCancel = () => {
    setCurrentTitle('');
    setCurrentContent('');
    setCurrentTags('');
    setIsWriting(false);
  };

  const quickPrompts = [
    "Today I learned about...",
    "My biggest challenge this week was...",
    "I'm feeling excited about...",
    "My next learning goal is...",
    "Something I discovered about myself..."
  ];

  const handleQuickPrompt = (prompt: string) => {
    setCurrentContent(prompt + " ");
    setCurrentTitle("Learning Reflection - " + new Date().toLocaleDateString());
    setIsWriting(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Simple Header */}
      <div className="flex items-center justify-between">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Learning Journal</h1>
          <p className="text-gray-600">Track your career transformation journey</p>
        </div>
        
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-center gap-8 py-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">{entries.length}</div>
          <div className="text-sm text-gray-600">Total Entries</div>
        </div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {entries.filter(entry => 
              new Date(entry.date).getMonth() === new Date().getMonth()
            ).length}
          </div>
          <div className="text-sm text-gray-600">This Month</div>
        </div>
      </div>

      {/* Writing Interface */}
      {isWriting ? (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                New Entry
              </h3>
              <Button 
                onClick={handleCancel} 
                variant="ghost" 
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
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
            
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleSaveEntry} 
                disabled={!currentTitle.trim() || !currentContent.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
              <Button 
                onClick={handleCancel} 
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {/* Quick Start Section */}
          {entries.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Learning Journey</h3>
              <p className="text-gray-600 mb-6">
                Document your thoughts, progress, and insights as you transform your career.
              </p>
              <Button 
                onClick={() => setIsWriting(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Write First Entry
              </Button>
            </Card>
          ) : (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Your Entries</h2>
              <Button 
                onClick={() => setIsWriting(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </div>
          )}

          {/* Quick Prompts */}
          {!isWriting && entries.length < 3 && (
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Writing Prompts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-left p-4 text-sm rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Edit3 className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium text-gray-900">Start writing</span>
                    </div>
                    <p className="text-gray-600">
                      {prompt}
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Journal Entries */}
      {entries.length > 0 && (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{entry.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{entry.date}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleDeleteEntry(entry.id)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
              
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
          ))}
        </div>
      )}
    </div>
  );
};
