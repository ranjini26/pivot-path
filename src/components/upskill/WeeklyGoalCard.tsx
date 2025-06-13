
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, List, Target } from 'lucide-react';
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
  const completedTasks = goal.tasks.filter(task => checkedTasks.has(task.id)).length;
  const progressPercentage = goal.tasks.length > 0 ? Math.round((completedTasks / goal.tasks.length) * 100) : 0;

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center font-bold text-lg">
              {goalIndex + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{goal.week}</h3>
              <p className="text-white/90">{goal.focus}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-white/20 text-white border-white/30 mb-2">
              Phase {goalIndex + 1}
            </Badge>
            <div className="text-sm">
              <span className="font-medium">{completedTasks}/{goal.tasks.length}</span>
              <span className="text-white/70"> tasks</span>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Tasks */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <List className="w-5 h-5 text-indigo-600" />
            Practical Tasks & Activities
          </h4>
          <div className="space-y-3">
            {goal.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isChecked={checkedTasks.has(task.id)}
                onToggle={onTaskToggle}
              />
            ))}
          </div>
        </div>

        {/* Milestone */}
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mt-0.5">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h5 className="font-medium text-emerald-900 mb-1">Phase {goalIndex + 1} Milestone</h5>
              <p className="text-sm text-emerald-700">{goal.milestone}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
