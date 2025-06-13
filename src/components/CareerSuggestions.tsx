
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, BookOpen, MessageCircle, BarChart3, ArrowRight } from 'lucide-react';

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
        return 'bg-emerald-500 text-white';
      case 'Medium':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Career Paths</p>
              <p className="text-2xl font-bold text-blue-900">{suggestions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm font-medium">Best Match</p>
              <p className="text-2xl font-bold text-emerald-900">
                {Math.max(...suggestions.map(s => s.skillMatchPercentage))}%
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">High Growth</p>
              <p className="text-2xl font-bold text-purple-900">
                {suggestions.filter(s => s.growthPotential === 'High').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Career Suggestions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Recommended Career Paths</h2>
          <Badge variant="secondary" className="px-3 py-1">
            {suggestions.length} matches found
          </Badge>
        </div>
        
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-indigo-500">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{suggestion.title}</h3>
                    <Badge className={`${getGrowthColor(suggestion.growthPotential)} px-3 py-1 text-sm font-medium rounded-full`}>
                      {suggestion.growthPotential} Growth
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{suggestion.description}</p>
                </div>
              </div>

              {/* Skills Match Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Skills Match</span>
                  <span className="text-sm font-bold text-indigo-600">{suggestion.skillMatchPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${suggestion.skillMatchPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Skills you already have
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.transferableSkills.map((skill, i) => (
                      <Badge key={i} className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Skills to develop
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.newSkillsNeeded.map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-blue-200 text-blue-700 px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={() => onGetUpskillPlan(suggestion.title)} 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white h-12 text-base font-medium"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Get 90-Day Learning Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Success Story */}
      {successStory && (
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-amber-900 mb-2">Success Story</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-amber-900">{successStory.name}</span>
                  <span className="text-amber-700">transitioned from</span>
                  <Badge variant="outline" className="border-amber-300 text-amber-800">{successStory.fromRole}</Badge>
                  <span className="text-amber-700">to</span>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{successStory.toRole}</Badge>
                </div>
                <p className="text-sm text-amber-700">Timeline: {successStory.timeframe}</p>
                <blockquote className="border-l-4 border-amber-300 pl-4 py-2 bg-white/50 rounded-r">
                  <p className="text-amber-900 italic">"{successStory.keyInsight}"</p>
                </blockquote>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Micro-Coaching CTA */}
      <Card className="p-8 text-center bg-gradient-to-r from-indigo-500 to-purple-600 border-0">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-xl text-white mb-2">Need guidance or motivation?</h3>
            <p className="text-white/90 mb-6">
              Get personalized coaching on interview prep, job search strategies, or career advice.
            </p>
          </div>
          <Button 
            onClick={onMicroCoaching} 
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-3"
          >
            Start Coaching Session
          </Button>
        </div>
      </Card>
    </div>
  );
};
