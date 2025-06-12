
import { useState } from 'react';
import { PivotHeader } from '@/components/PivotHeader';
import { CareerInput } from '@/components/CareerInput';
import { CareerSuggestions } from '@/components/CareerSuggestions';
import { UpskillPlan } from '@/components/UpskillPlan';
import { MicroCoaching } from '@/components/MicroCoaching';
import { useToast } from '@/hooks/use-toast';

type AppState = 'input' | 'suggestions' | 'upskill' | 'coaching';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('input');
  const [userStory, setUserStory] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const { toast } = useToast();

  // Mock data - in a real app, this would come from an AI API
  const mockSuggestions = [
    {
      title: "Digital Marketing Specialist",
      description: "Leverage your customer service skills in the growing digital marketing field",
      transferableSkills: ["Customer Communication", "Problem Solving", "Data Analysis", "Team Leadership"],
      newSkillsNeeded: ["Google Ads", "Social Media Strategy"],
      skillMatchPercentage: 78,
      growthPotential: "High" as const
    },
    {
      title: "UX/UI Designer",
      description: "Apply your understanding of customer needs to create better user experiences",
      transferableSkills: ["Customer Empathy", "Problem Solving", "Attention to Detail"],
      newSkillsNeeded: ["Design Tools", "User Research"],
      skillMatchPercentage: 65,
      growthPotential: "High" as const
    },
    {
      title: "Customer Success Manager",
      description: "Take your retail management skills into the tech industry",
      transferableSkills: ["Customer Service", "Team Management", "Sales Process", "Conflict Resolution"],
      newSkillsNeeded: ["CRM Software", "Data Analytics"],
      skillMatchPercentage: 85,
      growthPotential: "Steady" as const
    }
  ];

  const mockSuccessStory = {
    name: "Maria Santos",
    fromRole: "Retail Store Manager",
    toRole: "Digital Marketing Manager",
    timeframe: "8 months",
    keyInsight: "I realized my customer insights from retail were exactly what digital marketing teams needed. I just had to learn the tools."
  };

  const mockUpskillPlan = [
    {
      week: "Weeks 1-4: Foundation Building",
      focus: "Digital Marketing Fundamentals & Google Analytics",
      resources: [
        { title: "Google Analytics Beginner Course", type: "Course" as const, platform: "Google Skillshop", duration: "4 hours", url: "#" },
        { title: "Digital Marketing Fundamentals", type: "Course" as const, platform: "Coursera", duration: "6 hours", url: "#" },
        { title: "Setting Up Your First Campaign", type: "Video" as const, platform: "YouTube", duration: "45 min", url: "#" }
      ],
      milestone: "Complete Google Analytics certification and create your first marketing campaign analysis"
    },
    {
      week: "Weeks 5-8: Practical Application",
      focus: "Google Ads & Social Media Marketing",
      resources: [
        { title: "Google Ads Certification", type: "Course" as const, platform: "Google Skillshop", duration: "8 hours", url: "#" },
        { title: "Facebook Ads Manager Guide", type: "Video" as const, platform: "YouTube", duration: "2 hours", url: "#" },
        { title: "Create Mock Campaigns", type: "Practice" as const, platform: "Personal Project", duration: "10 hours", url: "#" }
      ],
      milestone: "Launch 3 mock advertising campaigns and analyze their theoretical performance"
    },
    {
      week: "Weeks 9-12: Portfolio & Networking",
      focus: "Building Your Digital Marketing Portfolio",
      resources: [
        { title: "Portfolio Building for Marketers", type: "Article" as const, platform: "HubSpot Blog", duration: "1 hour", url: "#" },
        { title: "LinkedIn Networking for Career Changers", type: "Course" as const, platform: "LinkedIn Learning", duration: "3 hours", url: "#" },
        { title: "Volunteer Marketing Projects", type: "Practice" as const, platform: "Local Nonprofits", duration: "15 hours", url: "#" }
      ],
      milestone: "Complete portfolio with 3 case studies and connect with 20 marketing professionals"
    }
  ];

  const handleStorySubmit = (story: string) => {
    setUserStory(story);
    
    // Simulate AI processing
    toast({
      title: "Analyzing your story...",
      description: "Our AI is identifying your transferable skills and opportunities.",
    });

    setTimeout(() => {
      setCurrentState('suggestions');
      toast({
        title: "Analysis complete!",
        description: "Here are your personalized career suggestions.",
      });
    }, 2000);
  };

  const handleGetUpskillPlan = (career: string) => {
    setSelectedCareer(career);
    setCurrentState('upskill');
    
    toast({
      title: "Upskill plan ready!",
      description: `Your 90-day plan for becoming a ${career} is ready.`,
    });
  };

  const handleMicroCoaching = () => {
    setCurrentState('coaching');
  };

  const handleBack = () => {
    if (currentState === 'upskill') {
      setCurrentState('suggestions');
    } else if (currentState === 'coaching') {
      setCurrentState('suggestions');
    } else {
      setCurrentState('input');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <PivotHeader />
        
        {currentState === 'input' && (
          <CareerInput 
            onSubmit={handleStorySubmit}
            isLoading={false}
          />
        )}
        
        {currentState === 'suggestions' && (
          <CareerSuggestions
            suggestions={mockSuggestions}
            successStory={mockSuccessStory}
            onGetUpskillPlan={handleGetUpskillPlan}
            onMicroCoaching={handleMicroCoaching}
          />
        )}
        
        {currentState === 'upskill' && (
          <UpskillPlan
            careerPath={selectedCareer}
            weeklyGoals={mockUpskillPlan}
            onBack={handleBack}
            onStartCoaching={handleMicroCoaching}
          />
        )}
        
        {currentState === 'coaching' && (
          <MicroCoaching
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
