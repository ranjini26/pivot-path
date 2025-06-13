
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ProgressOverview } from './upskill/ProgressOverview';
import { WeeklyGoalCard } from './upskill/WeeklyGoalCard';
import { ArrowLeft, Calendar, Target, BookOpen, TrendingUp } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={onBack} 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Suggestions
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">90-Day Practical Skills Plan</h1>
                <p className="text-white/90">Master <span className="font-semibold text-yellow-300">{careerPath}</span> skills with hands-on practice</p>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">Total Tasks</span>
                </div>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Progress</span>
                </div>
                <p className="text-2xl font-bold">{calculateProgress()}%</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Weeks</span>
                </div>
                <p className="text-2xl font-bold">{weeklyGoals.length}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <p className="text-2xl font-bold">{checkedTasks.size}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <ProgressOverview 
        checkedTasksCount={checkedTasks.size}
        totalTasksCount={totalTasks}
        progressPercentage={calculateProgress()}
      />

      {/* Weekly Goals */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Learning Path</h2>
          <Badge variant="secondary" className="px-3 py-1">
            {weeklyGoals.length} phases
          </Badge>
        </div>
        
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

      {/* Coaching CTA */}
      <Card className="p-8 text-center bg-gradient-to-r from-emerald-500 to-teal-500 border-0">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-white mb-2">Stay on track with daily check-ins</h3>
            <p className="text-white/90 mb-6 text-lg">
              Get personalized guidance, progress tracking, and motivation throughout your journey.
            </p>
          </div>
          <Button 
            onClick={onStartCoaching} 
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-8 py-3 text-lg"
          >
            Enable Daily Coaching
          </Button>
        </div>
      </Card>
    </div>
  );
};
