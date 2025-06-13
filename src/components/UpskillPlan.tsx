
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ProgressOverview } from './upskill/ProgressOverview';
import { WeeklyGoalCard } from './upskill/WeeklyGoalCard';

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

interface UpskillPlanProps {
  careerPath: string;
  weeklyGoals: WeeklyGoal[];
  onBack: () => void;
  onStartCoaching: () => void;
}

export const UpskillPlan = ({
  careerPath,
  weeklyGoals,
  onBack,
  onStartCoaching
}: UpskillPlanProps) => {
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const handleTaskToggle = (taskId: string) => {
    const newCheckedTasks = new Set(checkedTasks);
    if (newCheckedTasks.has(taskId)) {
      newCheckedTasks.delete(taskId);
    } else {
      newCheckedTasks.add(taskId);
    }
    setCheckedTasks(newCheckedTasks);
  };

  const calculateProgress = () => {
    const totalTasks = weeklyGoals.reduce((acc, goal) => acc + goal.tasks.length, 0);
    const completedTasks = checkedTasks.size;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const totalTasks = weeklyGoals.reduce((acc, goal) => acc + goal.tasks.length, 0);

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">90-Day Practical Skills Plan</h1>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Your hands-on checklist to master <span className="font-semibold text-indigo-600 dark:text-indigo-400">{careerPath}</span> skills
          </p>
        </div>
        <Button onClick={onBack} variant="outline" className="border-gray-300 dark:border-gray-600">
          ← Back to Suggestions
        </Button>
      </div>

      {/* Progress Overview */}
      <ProgressOverview 
        checkedTasksCount={checkedTasks.size}
        totalTasksCount={totalTasks}
        progressPercentage={calculateProgress()}
      />

      {/* Task Checklist by Week */}
      <div className="space-y-6">
        {weeklyGoals.map((goal, goalIndex) => (
          <WeeklyGoalCard
            key={goalIndex}
            goal={goal}
            goalIndex={goalIndex}
            checkedTasks={checkedTasks}
            onTaskToggle={handleTaskToggle}
          />
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center border-0 shadow-lg">
        <div className="text-white">
          <h3 className="font-semibold text-2xl mb-3">Stay accountable with daily check-ins</h3>
          <p className="text-indigo-100 mb-6 text-lg">
            Get daily motivation, progress tracking, and personalized guidance throughout your journey.
          </p>
          <Button 
            onClick={onStartCoaching} 
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white backdrop-blur-sm px-8 py-3 text-lg"
          >
            Enable Daily Progress Coaching
          </Button>
        </div>
      </Card>
    </div>
  );
};
