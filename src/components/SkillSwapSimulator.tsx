
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw, TrendingUp, ArrowRight, CheckCircle, ArrowLeft, BookOpen } from 'lucide-react';

interface SkillSwapSimulatorProps {
  onBack: () => void;
  onStartLearningPlan: (industry: string) => void;
  industries?: any[];
}

export const SkillSwapSimulator = ({ onBack, onStartLearningPlan, industries = [] }: SkillSwapSimulatorProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Use provided industries or fallback to default data
  const defaultIndustries = [
    {
      name: "EdTech/Instructional Design",
      match: 92,
      skills: ["Teaching", "Curriculum Development", "Communication"],
      newSkills: ["Learning Management Systems", "Digital Content Creation"],
      growth: "High"
    },
    {
      name: "Customer Success",
      match: 85,
      skills: ["Relationship Building", "Problem Solving", "Communication"],
      newSkills: ["CRM Software", "Data Analysis"],
      growth: "High"
    },
    {
      name: "UX Research",
      match: 78,
      skills: ["Empathy", "Research Methods", "Communication"],
      newSkills: ["User Testing Tools", "Design Thinking"],
      growth: "High"
    },
    {
      name: "Project Management",
      match: 82,
      skills: ["Organization", "Leadership", "Planning"],
      newSkills: ["Agile Methodologies", "Project Management Tools"],
      growth: "Steady"
    },
    {
      name: "Sales Training",
      match: 88,
      skills: ["Presentation", "Coaching", "Communication"],
      newSkills: ["Sales Methodologies", "CRM Platforms"],
      growth: "High"
    },
    {
      name: "Content Marketing",
      match: 75,
      skills: ["Writing", "Research", "Communication"],
      newSkills: ["SEO", "Analytics Tools"],
      growth: "Medium"
    }
  ];

  const industriesToShow = industries.length > 0 ? industries : defaultIndustries;

  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case 'High': return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg';
      case 'Medium': return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg';
      default: return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Skill Swap Simulator</h2>
            <p className="text-base sm:text-xl text-gray-600 mt-1">Discover how your skills transfer across trending industries</p>
          </div>
        </div>
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm sm:text-base">Back to Career Paths</span>
        </Button>
      </div>

      {/* Introduction Card */}
      <Card className="p-4 sm:p-6 lg:p-8 border-l-4 border-l-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
          <h3 className="font-bold text-xl sm:text-2xl text-gray-900">Your Skill Transfer Analysis</h3>
        </div>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Based on your background, here's how your skills map to trending industries. 
          Click on any industry to see the detailed breakdown and start your learning journey.
        </p>
      </Card>

      {/* Industry Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {industriesToShow.map((industry, index) => (
          <Card 
            key={index} 
            className={`p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 bg-white ${
              selectedIndustry === industry.name 
                ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl' 
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => setSelectedIndustry(industry.name)}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <h4 className="font-bold text-lg sm:text-xl text-gray-900 flex-1">{industry.name}</h4>
                <Badge className={`${getGrowthColor(industry.growth)} px-3 py-1 sm:px-4 sm:py-2 font-semibold rounded-full text-xs sm:text-sm`}>
                  {industry.growth} Growth
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">Skills Match</span>
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {industry.match}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 shadow-inner">
                  <div 
                    className="h-3 sm:h-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 shadow-lg"
                    style={{ width: `${industry.match}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                  <p className="text-sm font-bold text-emerald-700 mb-2 sm:mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Your transferable skills:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industry.skills.map((skill, i) => (
                      <Badge key={i} className="bg-emerald-100 text-emerald-800 border-emerald-200 px-2 py-1 sm:px-3 sm:py-2 font-medium shadow-sm text-xs sm:text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-700 mb-2 sm:mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Skills to learn:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industry.newSkills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-blue-200 text-blue-700 px-2 py-1 sm:px-3 sm:py-2 font-medium shadow-sm text-xs sm:text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedIndustry === industry.name && (
                <Button 
                  onClick={() => onStartLearningPlan(industry.name)}
                  className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 sm:py-4 text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  Start 90-Day Learning Plan
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
