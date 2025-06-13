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
  return <div className="space-y-6 sm:space-y-8 animate-fade-in px-4">
      {/* Hero Section */}
      <div className="text-center space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Your Pivot Journey Begins
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Based on your story, here are personalized career paths that leverage your existing skills
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs sm:text-sm font-medium">Career Paths</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-900">{suggestions.length}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-xs sm:text-sm font-medium">Best Match</p>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-900">
                {Math.max(...suggestions.map(s => s.skillMatchPercentage))}%
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs sm:text-sm font-medium">High Growth</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-900">
                {suggestions.filter(s => s.growthPotential === 'High').length}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Career Suggestions */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Recommended Career Paths</h2>
          <Badge className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs sm:text-sm font-medium rounded-full shadow-lg">
            {suggestions.length} matches found
          </Badge>
        </div>
        
        {suggestions.map((suggestion, index) => <Card key={index} className="p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white shadow-lg">
            <div className="space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{suggestion.title}</h3>
                    <Badge className={`${getGrowthColor(suggestion.growthPotential)} px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full flex-shrink-0`}>
                      {suggestion.growthPotential} Growth
                    </Badge>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">{suggestion.description}</p>
                </div>
              </div>

              {/* Skills Match Progress */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Skills Match</span>
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {suggestion.skillMatchPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative shadow-lg" style={{
                width: `${suggestion.skillMatchPercentage}%`
              }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-emerald-700 flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full shadow-lg"></div>
                    Skills you already have
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.transferableSkills.map((skill, i) => <Badge key={i} className="bg-emerald-100 text-emerald-800 border-emerald-200 px-2 py-1 sm:px-3 sm:py-2 font-medium shadow-sm hover:shadow-md transition-shadow text-xs sm:text-sm">
                        {skill}
                      </Badge>)}
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-blue-700 flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full shadow-lg"></div>
                    Skills to develop
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.newSkillsNeeded.map((skill, i) => <Badge key={i} variant="outline" className="border-blue-200 text-blue-700 px-2 py-1 sm:px-3 sm:py-2 font-medium shadow-sm hover:shadow-md transition-shadow text-xs sm:text-sm">
                        {skill}
                      </Badge>)}
                  </div>
                </div>
              </div>
            </div>
          </Card>)}
      </div>

      {/* Success Story */}
      {successStory}

      {/* Next Step CTA */}
      <Card className="p-6 sm:p-8 lg:p-10 text-center bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-2xl">
        <div className="space-y-4 sm:space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl">Ready to explore your skill transferability?</h3>
            <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              See how your skills map across trending industries and discover unexpected opportunities.
            </p>
          </div>
          <Button onClick={onExploreSkillSwap} className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base lg:text-lg w-full sm:w-auto">
            Explore Skill Swap Simulator
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3" />
          </Button>
        </div>
      </Card>
    </div>;
};