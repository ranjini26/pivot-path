
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, CheckCircle, Clock, BookOpen } from 'lucide-react';

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

export const UpskillPlan = ({ careerPath, weeklyGoals, onBack, onStartCoaching }: UpskillPlanProps) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Course': return <BookOpen className="w-4 h-4" />;
      case 'Video': return <Clock className="w-4 h-4" />;
      case 'Article': return <ExternalLink className="w-4 h-4" />;
      case 'Practice': return <CheckCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'Course': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Video': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Article': return 'bg-green-100 text-green-800 border-green-200';
      case 'Practice': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">90-Day Upskill Plan</h2>
          <p className="text-muted-foreground mt-1">Your path to becoming a <span className="font-medium text-indigo-600">{careerPath}</span></p>
        </div>
        <Button onClick={onBack} variant="outline">
          ← Back to Suggestions
        </Button>
      </div>

      <Card className="glass-effect p-6 border-l-4 border-l-green-400">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold">Your Learning Journey</h3>
        </div>
        <p className="text-muted-foreground text-sm">
          This plan uses 100% free resources from trusted platforms. Dedicate 5-10 hours per week for best results.
        </p>
      </Card>

      <div className="space-y-6">
        {weeklyGoals.map((goal, index) => (
          <Card key={index} className="glass-effect p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full pivot-gradient flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{goal.week}</h3>
                  <p className="text-muted-foreground">{goal.focus}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary">
                Week {index + 1}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              {goal.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getResourceIcon(resource.type)}
                      <span className="font-medium text-sm">{resource.title}</span>
                    </div>
                    <Badge className={`text-xs ${getResourceColor(resource.type)}`}>
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{resource.platform}</span>
                    <span className="text-xs text-muted-foreground">{resource.duration}</span>
                    <Button size="sm" variant="ghost" className="h-7 px-2">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800 dark:text-green-400">Week {index + 1} Milestone:</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">{goal.milestone}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-effect p-6 text-center pivot-gradient">
        <div className="text-white">
          <h3 className="font-semibold text-lg mb-2">Ready to start your transformation?</h3>
          <p className="text-white/90 mb-4 text-sm">
            Get daily check-ins, motivation, and personalized advice throughout your journey.
          </p>
          <Button 
            onClick={onStartCoaching}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Enable Daily Coaching Support
          </Button>
        </div>
      </Card>
    </div>
  );
};
