import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, BookOpen, MessageCircle, BarChart3 } from 'lucide-react';
interface CareerSuggestion {
  title: string;
  description: string;
  transferableSkills: string[];
  newSkillsNeeded: string[];
  skillMatchPercentage: number;
  growthPotential: 'High' | 'Medium' | 'Steady';
}
interface SuccessStory {
  name: string;
  fromRole: string;
  toRole: string;
  timeframe: string;
  keyInsight: string;
}
interface CareerSuggestionsProps {
  suggestions: CareerSuggestion[];
  successStory: SuccessStory;
  onGetUpskillPlan: (career: string) => void;
  onMicroCoaching: () => void;
}
export const CareerSuggestions = ({
  suggestions,
  successStory,
  onGetUpskillPlan,
  onMicroCoaching
}: CareerSuggestionsProps) => {
  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case 'High':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  return <div className="space-y-6 animate-fade-in">
      {/* Skills Overview */}
      <Card className="glass-effect p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-lg">Your Skill Shift Preview</h3>
        </div>
        <p className="mb-4 text-zinc-950">
          Great news! Your existing skills are more valuable than you think. Here's how they translate to new opportunities:
        </p>
      </Card>

      {/* Career Suggestions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-xl flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          3 Career Directions for You
        </h3>
        
        {suggestions.map((suggestion, index) => <Card key={index} className="glass-effect p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg text-foreground">{suggestion.title}</h4>
                <p className="mt-1 text-zinc-950">{suggestion.description}</p>
              </div>
              <Badge className={getGrowthColor(suggestion.growthPotential)}>
                {suggestion.growthPotential} Growth
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full pivot-gradient transition-all duration-1000 ease-out" style={{
                width: `${suggestion.skillMatchPercentage}%`
              }} />
                </div>
                <span className="text-sm font-medium text-foreground min-w-fit">
                  {suggestion.skillMatchPercentage}% skills match
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                  ✓ Skills you already have:
                </p>
                <div className="flex flex-wrap gap-1">
                  {suggestion.transferableSkills.map((skill, i) => <Badge key={i} variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {skill}
                    </Badge>)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">
                  → Skills to develop (1-2 focus areas):
                </p>
                <div className="flex flex-wrap gap-1">
                  {suggestion.newSkillsNeeded.map((skill, i) => <Badge key={i} variant="outline" className="text-xs border-blue-200 text-blue-700">
                      {skill}
                    </Badge>)}
                </div>
              </div>
            </div>

            <Button onClick={() => onGetUpskillPlan(suggestion.title)} className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Get 90-Day Upskill Plan
            </Button>
          </Card>)}
      </div>

      {/* Success Story */}
      <Card className="glass-effect p-6 border-l-4 border-l-amber-400">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-lg">Success Story for Motivation</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{successStory.name}</span>
            <span className="text-muted-foreground">pivoted from</span>
            <Badge variant="outline">{successStory.fromRole}</Badge>
            <span className="text-muted-foreground">to</span>
            <Badge className="bg-green-100 text-green-800 border-green-200">{successStory.toRole}</Badge>
          </div>
          <p className="text-sm text-zinc-950">Timeline: {successStory.timeframe}</p>
          <blockquote className="border-l-2 border-amber-200 pl-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-r">
            <p className="text-sm italic text-foreground">"{successStory.keyInsight}"</p>
          </blockquote>
        </div>
      </Card>

      {/* Micro-Coaching CTA */}
      <Card className="glass-effect p-6 text-center pivot-warm-gradient bg-sky-950">
        <MessageCircle className="w-8 h-8 mx-auto mb-3 text-white" />
        <h3 className="font-semibold text-lg text-white mb-2">Need a pep talk or advice?</h3>
        <p className="text-white/90 mb-4 text-sm">
          Ask me about interview tips, job search strategies, or just need some encouragement.
        </p>
        <Button onClick={onMicroCoaching} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
          Start Micro-Coaching
        </Button>
      </Card>
    </div>;
};