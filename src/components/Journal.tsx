
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { JournalHeader } from './journal/JournalHeader';
import { JournalStats } from './journal/JournalStats';
import { JournalEntryComponent } from './journal/JournalEntry';
import { JournalEntryForm } from './journal/JournalEntryForm';
import { QuickPrompts } from './journal/QuickPrompts';
import { EmptyState } from './journal/EmptyState';

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

  const handleQuickPrompt = (prompt: string) => {
    setCurrentContent(prompt + " ");
    setCurrentTitle("Learning Reflection - " + new Date().toLocaleDateString());
    setIsWriting(true);
  };

  const monthlyEntries = entries.filter(entry => 
    new Date(entry.date).getMonth() === new Date().getMonth()
  ).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <JournalHeader onBack={onBack} />
      
      <JournalStats totalEntries={entries.length} monthlyEntries={monthlyEntries} />

      {isWriting ? (
        <JournalEntryForm
          title={currentTitle}
          content={currentContent}
          tags={currentTags}
          onTitleChange={setCurrentTitle}
          onContentChange={setCurrentContent}
          onTagsChange={setCurrentTags}
          onSave={handleSaveEntry}
          onCancel={handleCancel}
        />
      ) : (
        <>
          {entries.length === 0 ? (
            <EmptyState onStartWriting={() => setIsWriting(true)} />
          ) : (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Your Entries</h2>
              <Button 
                onClick={() => setIsWriting(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </div>
          )}

          {!isWriting && entries.length < 3 && entries.length > 0 && (
            <QuickPrompts onPromptSelect={handleQuickPrompt} />
          )}
        </>
      )}

      {entries.length > 0 && (
        <div className="space-y-6">
          {entries.map((entry) => (
            <JournalEntryComponent 
              key={entry.id} 
              entry={entry} 
              onDelete={handleDeleteEntry} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
