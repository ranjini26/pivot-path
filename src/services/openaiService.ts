
import { supabase } from "@/integrations/supabase/client";

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface CareerAnalysisRequest {
  userStory: string;
  resumeText?: string;
}

export class OpenAIService {
  private async makeRequest(messages: OpenAIMessage[], temperature = 0.7): Promise<string> {
    try {
      console.log('Making secure API request through Supabase edge function');
      
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          messages,
          temperature,
          maxTokens: 2000,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error('Failed to connect to AI service');
      }

      if (data.error) {
        console.error('OpenAI API error:', data.error);
        throw new Error('AI service error: ' + data.error);
      }

      return data.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('OpenAI service call failed:', error);
      throw new Error('Failed to generate AI response. Please try again.');
    }
  }

  async generateCareerSuggestions({ userStory, resumeText }: CareerAnalysisRequest) {
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: `You are a career transition expert. Analyze the user's story and resume to provide 3 specific career suggestions. 
        
        Return your response as a JSON object with this exact structure:
        {
          "suggestions": [
            {
              "title": "Job Title",
              "description": "Why this matches their background and specific opportunities available",
              "transferableSkills": ["Skill 1", "Skill 2", "Skill 3"],
              "newSkillsNeeded": ["New Skill 1", "New Skill 2"],
              "skillMatchPercentage": 85,
              "growthPotential": "High"
            }
          ],
          "successStory": {
            "name": "Example Person",
            "fromRole": "Previous Role",
            "toRole": "New Role",
            "timeframe": "6 months",
            "keyInsight": "Key insight about the transition"
          }
        }
        
        Make the suggestions specific and actionable. Focus on transferable skills and provide realistic career paths.`
      },
      {
        role: 'user',
        content: `User Story: ${userStory}\n\n${resumeText ? `Resume Content: ${resumeText}` : 'No resume provided'}`
      }
    ];

    const response = await this.makeRequest(messages, 0.3);
    
    try {
      return JSON.parse(response);
    } catch {
      // Fallback if JSON parsing fails
      return {
        suggestions: [
          {
            title: "Career Transition Specialist",
            description: "Based on your story, this role would leverage your experience in helping others navigate change",
            transferableSkills: ["Communication", "Problem Solving", "Analysis"],
            newSkillsNeeded: ["Industry Knowledge", "Digital Tools"],
            skillMatchPercentage: 75,
            growthPotential: "High" as const
          }
        ],
        successStory: {
          name: "Generated Example",
          fromRole: "Previous Position",
          toRole: "New Career",
          timeframe: "6 months",
          keyInsight: "Successful transition through skill transfer"
        }
      };
    }
  }

  async generateSkillSwapAnalysis(userStory: string, currentRole: string) {
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: `Analyze how someone's skills transfer across industries. Return a JSON array of 6 industries with this structure:
        [
          {
            "name": "Industry Name",
            "match": 85,
            "skills": ["Transferable Skill 1", "Transferable Skill 2"],
            "newSkills": ["New Skill 1", "New Skill 2"],
            "growth": "High"
          }
        ]
        
        Make the analysis specific to their background and realistic. Focus on practical career transitions.`
      },
      {
        role: 'user',
        content: `Current Role: ${currentRole}\nUser Story: ${userStory}`
      }
    ];

    const response = await this.makeRequest(messages, 0.4);
    
    try {
      return JSON.parse(response);
    } catch {
      // Fallback data
      return [
        {
          name: "Digital Marketing",
          match: 78,
          skills: ["Communication", "Analysis", "Customer Focus"],
          newSkills: ["Google Ads", "Analytics"],
          growth: "High"
        }
      ];
    }
  }

  async generateUpskillPlan(careerPath: string, userBackground: string) {
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: `Create a practical 90-day upskilling plan with specific, actionable resources. Return JSON with this structure:
        [
          {
            "week": "Weeks 1-4: Foundation Building",
            "focus": "Core Skills Development",
            "resources": [
              {
                "title": "Specific Course Name",
                "type": "Course",
                "platform": "Coursera/edX/YouTube",
                "duration": "20 hours",
                "url": "#"
              }
            ],
            "milestone": "Complete foundational knowledge and create first project"
          }
        ]
        
        Make it highly practical with real learning resources, specific skills, and actionable milestones. Each week should build on the previous one and lead to tangible progress toward the career goal.`
      },
      {
        role: 'user',
        content: `Target Career: ${careerPath}\nBackground: ${userBackground}`
      }
    ];

    const response = await this.makeRequest(messages, 0.3);
    
    try {
      const plan = JSON.parse(response);
      // Ensure we have a practical plan structure
      return plan.length > 0 ? plan : this.generateFallbackPlan(careerPath);
    } catch {
      return this.generateFallbackPlan(careerPath);
    }
  }

  private generateFallbackPlan(careerPath: string) {
    return [
      {
        week: "Weeks 1-4: Foundation Building",
        focus: `Core ${careerPath} Fundamentals`,
        resources: [
          {
            title: `Introduction to ${careerPath}`,
            type: "Course" as const,
            platform: "Coursera",
            duration: "20 hours",
            url: "#"
          },
          {
            title: "Industry Best Practices",
            type: "Article" as const,
            platform: "Medium",
            duration: "5 hours",
            url: "#"
          }
        ],
        milestone: "Complete foundational knowledge and understand industry basics"
      },
      {
        week: "Weeks 5-8: Skill Development",
        focus: "Hands-on Practice & Tools",
        resources: [
          {
            title: "Practical Skills Workshop",
            type: "Practice" as const,
            platform: "YouTube",
            duration: "15 hours",
            url: "#"
          }
        ],
        milestone: "Build first portfolio project demonstrating key skills"
      },
      {
        week: "Weeks 9-12: Portfolio & Networking",
        focus: "Professional Preparation",
        resources: [
          {
            title: "Portfolio Development",
            type: "Practice" as const,
            platform: "Self-directed",
            duration: "25 hours",
            url: "#"
          }
        ],
        milestone: "Complete professional portfolio and begin networking"
      }
    ];
  }
}
