
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
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-xl shadow-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3">90-Day Practical Skills Plan</h1>
            <p className="text-xl text-indigo-100">
              Your hands-on checklist to master <span className="font-bold text-yellow-300">{careerPath}</span> skills
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Total Tasks: {totalTasks}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Progress: {calculateProgress()}%</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            ← Back to Suggestions
          </Button>
        </div>
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
      <Card className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-center border-0 shadow-2xl">
        <div className="text-white">
          <h3 className="font-bold text-3xl mb-4">Stay accountable with daily check-ins</h3>
          <p className="text-emerald-100 mb-6 text-lg">
            Get daily motivation, progress tracking, and personalized guidance throughout your journey.
          </p>
          <Button 
            onClick={onStartCoaching} 
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white backdrop-blur-sm px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Enable Daily Progress Coaching
          </Button>
        </div>
      </Card>
    </div>
  );
};
