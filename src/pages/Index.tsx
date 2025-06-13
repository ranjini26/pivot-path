
import { useState } from 'react';
import { PivotHeader } from '@/components/PivotHeader';
import { CareerInput } from '@/components/CareerInput';
import { CareerSuggestions } from '@/components/CareerSuggestions';
import { UpskillPlan } from '@/components/UpskillPlan';
import { SkillSwapSimulator } from '@/components/SkillSwapSimulator';
import { Journal } from '@/components/Journal';
import { ApiKeyManager } from '@/components/ApiKeyManager';
import { useToast } from '@/hooks/use-toast';
import { OpenAIService } from '@/services/openaiService';

type AppState = 'input' | 'suggestions' | 'skill-swap' | 'upskill' | 'journal';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('input');
  const [userStory, setUserStory] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('configured');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [successStory, setSuccessStory] = useState<any>(null);
  const [upskillPlan, setUpskillPlan] = useState<any[]>([]);
  const [skillSwapData, setSkillSwapData] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text || '');
      };
      reader.readAsText(file);
    });
  };

  const handleStorySubmit = async (story: string, resume?: File) => {
    setUserStory(story);
    if (resume) {
      setUploadedResume(resume);
    }
    
    setIsGenerating(true);
    toast({
      title: "AI is analyzing your story...",
      description: resume 
        ? "Processing your story and resume to generate personalized recommendations."
        : "Analyzing your story to identify opportunities and transferable skills.",
    });

    try {
      const openaiService = new OpenAIService();
      let resumeText = '';
      
      if (resume) {
        resumeText = await extractTextFromFile(resume);
      }

      // Generate career suggestions
      const careerAnalysis = await openaiService.generateCareerSuggestions({
        userStory: story,
        resumeText
      });

      setSuggestions(careerAnalysis.suggestions || []);
      setSuccessStory(careerAnalysis.successStory);

      // Generate skill swap analysis
      const skillSwap = await openaiService.generateSkillSwapAnalysis(
        story, 
        "Current professional"
      );
      setSkillSwapData(skillSwap);

      setCurrentState('suggestions');
      setIsGenerating(false);
      
      toast({
        title: "Analysis complete!",
        description: "Your personalized career roadmap is ready.",
      });
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFeatureClick = (feature: string) => {
    if (!userStory) {
      toast({
        title: "Please share your story first",
        description: "Tell us about your current situation to access these features.",
        variant: "destructive",
      });
      return;
    }

    switch (feature) {
      case 'skill-swap':
        setCurrentState('skill-swap');
        break;
      case 'journal':
        setCurrentState('journal');
        toast({
          title: "Journal opened",
          description: "Start documenting your learning journey and thoughts.",
        });
        break;
    }
  };

  const handleExploreSkillSwap = () => {
    setCurrentState('skill-swap');
  };

  const handleGetUpskillPlan = async (career: string) => {
    setSelectedCareer(career);
    setIsGenerating(true);
    
    try {
      const openaiService = new OpenAIService();
      const plan = await openaiService.generateUpskillPlan(career, userStory);
      setUpskillPlan(plan);
      setCurrentState('upskill');
      
      toast({
        title: "Upskill plan ready!",
        description: `Your 90-day plan for becoming a ${career} is ready.`,
      });
    } catch (error) {
      toast({
        title: "Failed to generate plan",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
    
    setIsGenerating(false);
  };

  const handleBack = () => {
    if (currentState === 'upskill') {
      setCurrentState('skill-swap');
    } else if (currentState === 'skill-swap' || currentState === 'journal') {
      setCurrentState('suggestions');
    } else {
      setCurrentState('input');
    }
  };

  const handleStartJournal = () => {
    setCurrentState('journal');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <PivotHeader onFeatureClick={handleFeatureClick} />
        
        <div className="mb-6">
          <ApiKeyManager 
            onApiKeySet={setApiKey} 
            hasApiKey={true}
          />
        </div>
        
        {currentState === 'input' && (
          <CareerInput 
            onSubmit={handleStorySubmit}
            isLoading={isGenerating}
          />
        )}
        
        {currentState === 'suggestions' && (
          <CareerSuggestions
            suggestions={suggestions}
            successStory={successStory}
            onExploreSkillSwap={handleExploreSkillSwap}
          />
        )}
        
        {currentState === 'skill-swap' && (
          <SkillSwapSimulator
            onBack={handleBack}
            onStartLearningPlan={handleGetUpskillPlan}
            industries={skillSwapData}
          />
        )}
        
        {currentState === 'upskill' && (
          <UpskillPlan
            careerPath={selectedCareer}
            weeklyGoals={upskillPlan}
            onBack={handleBack}
            onStartJournal={handleStartJournal}
          />
        )}

        {currentState === 'journal' && (
          <Journal
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
