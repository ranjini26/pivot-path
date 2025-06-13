import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, ExternalLink, CheckCircle, Clock, BookOpen, Target, User, Upload, List } from 'lucide-react';
import { useState } from 'react';

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

  const calculateProgress = () => {
    const totalTasks = weeklyGoals.reduce((acc, goal) => acc + goal.tasks.length, 0);
    const completedTasks = checkedTasks.size;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const setupTasks = [
    { icon: User, label: "Create learning workspace", description: "Set up dedicated space for focused practice", completed: true },
    { icon: Target, label: "Define success metrics", description: "Establish clear goals and progress indicators", completed: true },
    { icon: Upload, label: "Track daily progress", description: "Log completed tasks and learning insights", completed: false },
    { icon: CheckCircle, label: "Complete first week", description: "Finish foundation building tasks", completed: false }
  ];

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
      <Card className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Progress</h2>
            <div className="flex items-center gap-3 mt-2">
              <Progress value={calculateProgress()} className="flex-1 max-w-xs" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {checkedTasks.size} of {weeklyGoals.reduce((acc, goal) => acc + goal.tasks.length, 0)} tasks completed ({calculateProgress()}%)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {setupTasks.map((task, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                task.completed 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {task.completed ? (
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <task.icon className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{task.label}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Task Checklist by Week */}
      <div className="space-y-6">
        {weeklyGoals.map((goal, goalIndex) => (
          <Card key={goalIndex} className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
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
              {goal.tasks.map((task, taskIndex) => (
                <div key={task.id} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors">
                  <Checkbox
                    id={task.id}
                    checked={checkedTasks.has(task.id)}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <label 
                          htmlFor={task.id} 
                          className={`font-medium cursor-pointer block ${
                            checkedTasks.has(task.id) 
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
