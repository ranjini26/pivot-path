
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';

interface EmptyStateProps {
  onStartWriting: () => void;
}

export const EmptyState = ({ onStartWriting }: EmptyStateProps) => {
  return (
    <Card className="p-12 text-center mb-8">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-10 h-10 text-indigo-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">Start Your Learning Journey</h3>
      <p className="text-gray-600 mb-8 text-lg">
        Document your thoughts, progress, and insights as you transform your career.
      </p>
      <Button 
        onClick={onStartWriting} 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Write First Entry
      </Button>
    </Card>
  );
};
