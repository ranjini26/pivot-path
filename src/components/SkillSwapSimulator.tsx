import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

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
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RotateCcw className="w-6 h-6 text-indigo-600" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Skill Swap Simulator</h2>
            <p className="text-slate-600 dark:text-slate-400">See how your skills transfer across trending industries</p>
          </div>
        </div>
        <Button onClick={onBack} variant="outline">
          ← Back
        </Button>
      </div>

      <Card className="glass-effect p-6 border-l-4 border-l-indigo-400">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-lg">Your Skill Transfer Analysis</h3>
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          Based on your background as a teacher, here's how your skills map to 10+ trending industries. 
          Click on any industry to see detailed skill breakdown and start your 90-day learning plan.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {industriesToShow.map((industry, index) => (
          <Card 
            key={index} 
            className={`glass-effect p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${
              selectedIndustry === industry.name ? 'border-indigo-400 bg-indigo-50/50' : 'hover:border-indigo-300'
            }`}
            onClick={() => setSelectedIndustry(industry.name)}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-100">{industry.name}</h4>
                <Badge className={getGrowthColor(industry.growth)}>
                  {industry.growth} Growth
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Skills Match</span>
                  <span className="text-sm font-bold text-indigo-600">{industry.match}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000"
                    style={{ width: `${industry.match}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">
                    ✓ Your transferable skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {industry.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">
                    → Skills to learn:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {industry.newSkills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-blue-200 text-blue-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedIndustry === industry.name && (
                <Button 
                  onClick={() => onStartLearningPlan(industry.name)}
                  className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Start 90-Day Learning Plan
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
