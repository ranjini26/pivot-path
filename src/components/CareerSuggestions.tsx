
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, ArrowRight, BarChart3, RotateCcw, User, Clock, Lightbulb } from 'lucide-react';

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
  onExploreSkillSwap: () => void;
}

export const CareerSuggestions = ({
  suggestions,
  successStory,
  onExploreSkillSwap
}: CareerSuggestionsProps) => {
  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case 'High':
        return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg';
      case 'Medium':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Your Pivot Journey Begins
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Based on your story, here are personalized career paths that leverage your existing skills
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Career Paths</p>
              <p className="text-3xl font-bold text-blue-900">{suggestions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm font-medium">Best Match</p>
              <p className="text-3xl font-bold text-emerald-900">
                {Math.max(...suggestions.map(s => s.skillMatchPercentage))}%
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">High Growth</p>
              <p className="text-3xl font-bold text-purple-900">
                {suggestions.filter(s => s.growthPotential === 'High').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Career Suggestions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Recommended Career Paths</h2>
          <Badge className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-full shadow-lg">
            {suggestions.length} matches found
          </Badge>
        </div>
        
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white shadow-lg">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{suggestion.title}</h3>
                    <Badge className={`${getGrowthColor(suggestion.growthPotential)} px-4 py-2 text-sm font-medium rounded-full`}>
                      {suggestion.growthPotential} Growth
                    </Badge>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-700">{suggestion.description}</p>
                </div>
              </div>

              {/* Skills Match Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Skills Match</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {suggestion.skillMatchPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative shadow-lg" 
                    style={{ width: `${suggestion.skillMatchPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-emerald-700 flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg"></div>
                    Skills you already have
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.transferableSkills.map((skill, i) => (
                      <Badge key={i} className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2 font-medium shadow-sm hover:shadow-md transition-shadow">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
                    Skills to develop
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.newSkillsNeeded.map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-blue-200 text-blue-700 px-4 py-2 font-medium shadow-sm hover:shadow-md transition-shadow">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Success Story */}
      {successStory && (
        <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900">Success Story</h3>
                <p className="text-amber-700">Real inspiration from someone who made the leap</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{successStory.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-600">Career Change</p>
                    <p className="font-semibold text-gray-900">{successStory.fromRole} → {successStory.toRole}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-600">Timeframe</p>
                    <p className="font-semibold text-gray-900">{successStory.timeframe}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-amber-100">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Key Insight</p>
                    <p className="text-gray-800 leading-relaxed">{successStory.keyInsight}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Next Step CTA */}
      <Card className="p-8 text-center bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-2xl">
        <div className="space-y-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <RotateCcw className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white mb-3 text-xl">Ready to explore your skill transferability?</h3>
            <p className="text-white/90 mb-8 text-base">
              See how your skills map across trending industries and discover unexpected opportunities.
            </p>
          </div>
          <Button onClick={onExploreSkillSwap} className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-10 py-4 font-semibold shadow-lg hover:shadow-xl transition-all text-base">
            Explore Skill Swap Simulator
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
