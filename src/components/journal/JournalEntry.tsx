
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trash2 } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

interface JournalEntryProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
}

export const JournalEntryComponent = ({ entry, onDelete }: JournalEntryProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-xl text-gray-900 mb-2">{entry.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{entry.date}</span>
          </div>
        </div>
        <Button 
          onClick={() => onDelete(entry.id)}
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
  );
};
