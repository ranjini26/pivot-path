
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, ExternalLink, CheckCircle, Clock, BookOpen, Target, User, Upload } from 'lucide-react';

interface WeeklyGoal {
  week: string;
  focus: string;
  resources: {
    title: string;
    type: 'Course' | 'Video' | 'Article' | 'Practice';
    platform: string;
    duration: string;
    url: string;
  }[];
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
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Course':
        return <BookOpen className="w-4 h-4" />;
      case 'Video':
        return <Clock className="w-4 h-4" />;
      case 'Article':
        return <ExternalLink className="w-4 h-4" />;
      case 'Practice':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'Course':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Video':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Article':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'Practice':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const setupTasks = [
    { icon: User, label: "Create an account", description: "Set up your learning profile and goals", completed: true },
    { icon: Target, label: "Define your goals", description: "Clarify your career transition objectives", completed: true },
    { icon: Upload, label: "Upload your progress", description: "Track your learning journey weekly", completed: false },
    { icon: CheckCircle, label: "Complete your first milestone", description: "Finish week 1 foundation building", completed: false }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">90-Day Upskill Plan</h1>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Your path to becoming a <span className="font-semibold text-indigo-600 dark:text-indigo-400">{careerPath}</span>
          </p>
        </div>
        <Button onClick={onBack} variant="outline" className="border-gray-300 dark:border-gray-600">
          ← Back to Suggestions
        </Button>
      </div>

      {/* Setup Progress Card */}
      <Card className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">You are all set up!</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl">🤩</span>
              <Progress value={50} className="w-32" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">50%</span>
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

      {/* Learning Journey Card */}
      <Card className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Your Learning Journey</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          This plan uses 100% free resources from trusted platforms. Dedicate 5-10 hours per week for best results.
        </p>
      </Card>

      {/* Weekly Goals */}
      <div className="space-y-6">
        {weeklyGoals.map((goal, index) => (
          <Card key={index} className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{goal.week}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{goal.focus}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20">
                Week {index + 1}
              </Badge>
            </div>

            <div className="space-y-4 mb-6">
              {goal.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getResourceIcon(resource.type)}
                      <span className="font-medium text-gray-900 dark:text-white">{resource.title}</span>
                    </div>
                    <Badge className={`text-xs ${getResourceColor(resource.type)}`}>
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{resource.platform}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{resource.duration}</span>
                    <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">Week {index + 1} Milestone:</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-200">{goal.milestone}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center border-0 shadow-lg">
        <div className="text-white">
          <h3 className="font-semibold text-2xl mb-3">Ready to start your transformation?</h3>
          <p className="text-indigo-100 mb-6 text-lg">
            Get daily check-ins, motivation, and personalized advice throughout your journey.
          </p>
          <Button 
            onClick={onStartCoaching} 
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white backdrop-blur-sm px-8 py-3 text-lg"
          >
            Enable Daily Coaching Support
          </Button>
        </div>
      </Card>
    </div>
  );
};
