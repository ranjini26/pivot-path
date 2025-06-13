
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface JournalHeaderProps {
  onBack: () => void;
}

export const JournalHeader = ({ onBack }: JournalHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Button 
        onClick={onBack} 
        variant="ghost" 
        className="text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Learning Journal</h1>
        <p className="text-gray-600">Track your career transformation journey</p>
      </div>
      
      <div className="w-20"></div>
    </div>
  );
};
