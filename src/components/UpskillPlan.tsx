
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ProgressOverview } from './upskill/ProgressOverview';
import { WeeklyGoalCard } from './upskill/WeeklyGoalCard';
import { ArrowLeft, Calendar, Target, BookOpen, TrendingUp, PenTool } from 'lucide-react';

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
  onStartJournal: () => void;
}

export const UpskillPlan = ({
  careerPath,
  weeklyGoals,
  onBack,
  onStartJournal
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
    return totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0;
  };

  const totalTasks = weeklyGoals.reduce((acc, goal) => acc + goal.tasks.length, 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-4">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl"></div>
        <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white bg-sky-950">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Button onClick={onBack} variant="ghost" className="hover:bg-white/20 backdrop-blur-sm text-zinc-50 text-sm sm:text-base">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              Back to Skill Swap
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-50">90-Day Practical Skills Plan</h1>
                <p className="text-white/90 text-sm sm:text-base">Master <span className="font-semibold text-yellow-300">{careerPath}</span> skills with hands-on practice</p>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Total Tasks</span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-zinc-50">{totalTasks}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Progress</span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-zinc-50">{calculateProgress()}%</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Weeks</span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-zinc-50">{weeklyGoals.length}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Completed</span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-zinc-50">{checkedTasks.size}</p>
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
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Learning Path</h2>
          <Badge variant="secondary" className="px-3 py-1 bg-black text-xs sm:text-sm">
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

      {/* Journal CTA */}
      <Card className="p-4 sm:p-6 lg:p-8 text-center bg-gradient-to-r from-emerald-500 to-teal-500 border-0">
        <div className="space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <PenTool className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl sm:text-2xl text-white mb-2">Document your learning journey</h3>
            <p className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg">
              Keep track of your progress, insights, and pivoting thoughts in your personal journal.
            </p>
          </div>
          <Button onClick={onStartJournal} className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg">
            Open Learning Journal
          </Button>
        </div>
      </Card>
    </div>
  );
};
