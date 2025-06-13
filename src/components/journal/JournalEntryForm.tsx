
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit3, Save, X } from 'lucide-react';

interface JournalEntryFormProps {
  title: string;
  content: string;
  tags: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onTagsChange: (tags: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const JournalEntryForm = ({
  title,
  content,
  tags,
  onTitleChange,
  onContentChange,
  onTagsChange,
  onSave,
  onCancel
}: JournalEntryFormProps) => {
  return (
    <Card className="p-6 mb-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-indigo-600" />
            New Entry
          </h3>
          <Button 
            onClick={onCancel} 
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Entry title..."
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-lg font-medium"
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts, learnings, challenges, or plans..."
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>
          
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Tags (comma separated, e.g. learning, challenge, goal)"
              value={tags}
              onChange={(e) => onTagsChange(e.target.value)}
              className="text-sm"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button 
            onClick={onSave} 
            disabled={!title.trim() || !content.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Entry
          </Button>
          <Button 
            onClick={onCancel} 
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
};
