
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, List } from 'lucide-react';
import { TaskItem } from './TaskItem';

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

interface WeeklyGoal {
  week: string;
  focus: string;
  tasks: Task[];
  milestone: string;
}

interface WeeklyGoalCardProps {
  goal: WeeklyGoal;
  goalIndex: number;
  checkedTasks: Set<string>;
  onTaskToggle: (taskId: string) => void;
}

export const WeeklyGoalCard = ({ 
  goal, 
  goalIndex, 
  checkedTasks, 
  onTaskToggle 
}: WeeklyGoalCardProps) => {
  return (
    <Card className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {goalIndex + 1}
          </div>
          <div>
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{goal.week}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{goal.focus}</p>
          </div>
        </div>
        <Badge variant="outline" className="border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20">
          Phase {goalIndex + 1}
        </Badge>
      </div>

      {/* Task Checklist */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
          <List className="w-4 h-4" />
          Practical Tasks & Activities
        </h4>
        {goal.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isChecked={checkedTasks.has(task.id)}
            onToggle={onTaskToggle}
          />
        ))}
      </div>

      {/* Week Milestone */}
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-800 dark:text-green-300">Phase {goalIndex + 1} Goal:</span>
        </div>
        <p className="text-sm text-green-700 dark:text-green-200">{goal.milestone}</p>
      </div>
    </Card>
  );
};
