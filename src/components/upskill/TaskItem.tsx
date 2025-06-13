
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, Clock, ExternalLink, CheckCircle, Target, List } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  type: 'Course' | 'Video' | 'Article' | 'Practice' | 'Project' | 'Research';
  platform: string;
  url: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  isChecked: boolean;
  onToggle: (taskId: string) => void;
}

export const TaskItem = ({ task, isChecked, onToggle }: TaskItemProps) => {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'Course':
        return <BookOpen className="w-4 h-4" />;
      case 'Video':
        return <Clock className="w-4 h-4" />;
      case 'Article':
        return <ExternalLink className="w-4 h-4" />;
      case 'Practice':
        return <CheckCircle className="w-4 h-4" />;
      case 'Project':
        return <Target className="w-4 h-4" />;
      case 'Research':
        return <List className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'Course':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Video':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Article':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'Practice':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Project':
        return 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300';
      case 'Research':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors">
      <Checkbox
        id={task.id}
        checked={isChecked}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-1"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <label 
              htmlFor={task.id} 
              className={`font-medium cursor-pointer block ${
                isChecked 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {task.title}
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {task.description}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Badge className={`text-xs ${getTaskColor(task.type)}`}>
                <span className="flex items-center gap-1">
                  {getTaskIcon(task.type)}
                  {task.type}
                </span>
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {task.platform} • {task.estimatedTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
