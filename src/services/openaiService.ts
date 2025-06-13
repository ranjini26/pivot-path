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
          maxTokens: 3000,
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
        content: `Create a practical 90-day upskilling plan with specific, actionable tasks that can be completed without external courses or links. Focus on hands-on practice, real projects, and skill-building activities. Each task should be:

1. Immediately actionable (no waiting for course enrollment)
2. Focused on practical skill development
3. Based on free resources or self-directed practice
4. Specific with clear deliverables
5. Progressive in difficulty

Return JSON with this structure:
[
  {
    "week": "Week 1: Foundation Building",
    "focus": "Core Skills Development", 
    "tasks": [
      {
        "id": "task_1_1",
        "title": "Set up development environment",
        "description": "Install necessary software and configure workspace for immediate practice",
        "estimatedTime": "1 hour",
        "type": "Practice",
        "platform": "Self-directed",
        "url": "#",
        "completed": false
      }
    ],
    "milestone": "Environment ready and first practice completed"
  }
]

Make each task practical and self-contained. Focus on building, creating, practicing rather than consuming content.`
      },
      {
        role: 'user',
        content: `Target Career: ${careerPath}\nBackground: ${userBackground}`
      }
    ];

    const response = await this.makeRequest(messages, 0.3);
    
    try {
      const plan = JSON.parse(response);
      return plan.length > 0 ? plan : this.generateFallbackTaskPlan(careerPath);
    } catch {
      return this.generateFallbackTaskPlan(careerPath);
    }
  }

  private generateFallbackTaskPlan(careerPath: string) {
    return [
      {
        week: "Week 1: Foundation & Setup",
        focus: `Essential ${careerPath} Skills`,
        tasks: [
          {
            id: "task_1_1",
            title: "Set up professional workspace",
            description: "Create dedicated learning space and install basic tools needed for the field",
            estimatedTime: "1 hour",
            type: "Practice",
            platform: "Self-directed",
            url: "#",
            completed: false
          },
          {
            id: "task_1_2", 
            title: "Research industry terminology",
            description: "Create a personal glossary of 20 key terms used in this field",
            estimatedTime: "45 minutes",
            type: "Research",
            platform: "Self-study",
            url: "#",
            completed: false
          },
          {
            id: "task_1_3",
            title: "Identify 3 role models",
            description: "Find professionals in this field and analyze their career paths",
            estimatedTime: "30 minutes",
            type: "Research",
            platform: "LinkedIn",
            url: "#",
            completed: false
          },
          {
            id: "task_1_4",
            title: "Create skill assessment baseline",
            description: "Document current skills and rate your proficiency level (1-10)",
            estimatedTime: "20 minutes",
            type: "Practice",
            platform: "Self-assessment",
            url: "#",
            completed: false
          },
          {
            id: "task_1_5",
            title: "Practice daily fundamentals",
            description: "Spend 30 minutes daily practicing core concepts through exercises",
            estimatedTime: "30 minutes/day",
            type: "Practice",
            platform: "Daily practice",
            url: "#",
            completed: false
          }
        ],
        milestone: "Foundation knowledge established and daily practice routine created"
      },
      {
        week: "Week 2-4: Core Skill Building",
        focus: "Hands-on Practice & Application",
        tasks: [
          {
            id: "task_2_1",
            title: "Complete first mini-project",
            description: "Build a small project that demonstrates basic skills in the field",
            estimatedTime: "3 hours",
            type: "Project",
            platform: "Self-directed",
            url: "#",
            completed: false
          },
          {
            id: "task_2_2",
            title: "Practice problem-solving daily",
            description: "Solve 2-3 practice problems or challenges related to the field each day",
            estimatedTime: "45 minutes/day",
            type: "Practice",
            platform: "Problem sets",
            url: "#",
            completed: false
          },
          {
            id: "task_2_3",
            title: "Create learning portfolio",
            description: "Document all projects and exercises in an organized portfolio",
            estimatedTime: "1 hour",
            type: "Practice",
            platform: "Portfolio site",
            url: "#",
            completed: false
          },
          {
            id: "task_2_4",
            title: "Seek feedback on work",
            description: "Share your mini-project with professionals and ask for specific feedback",
            estimatedTime: "30 minutes",
            type: "Research",
            platform: "Professional network",
            url: "#",
            completed: false
          },
          {
            id: "task_2_5",
            title: "Join community discussions",
            description: "Participate in 3 online discussions or forums related to your field",
            estimatedTime: "20 minutes/day",
            type: "Research",
            platform: "Forums/Communities",
            url: "#",
            completed: false
          }
        ],
        milestone: "First project completed and feedback incorporated"
      },
      {
        week: "Week 5-8: Advanced Practice",
        focus: "Complex Projects & Real Applications",
        tasks: [
          {
            id: "task_3_1",
            title: "Build comprehensive project",
            description: "Create a substantial project that showcases multiple skills working together",
            estimatedTime: "8 hours total",
            type: "Project",
            platform: "Self-directed",
            url: "#",
            completed: false
          },
          {
            id: "task_3_2",
            title: "Practice industry scenarios",
            description: "Work through real-world scenarios and case studies",
            estimatedTime: "1 hour/day",
            type: "Practice",
            platform: "Case studies",
            url: "#",
            completed: false
          },
          {
            id: "task_3_3",
            title: "Optimize and refine work",
            description: "Improve previous projects based on new skills learned",
            estimatedTime: "2 hours",
            type: "Practice",
            platform: "Self-review",
            url: "#",
            completed: false
          },
          {
            id: "task_3_4",
            title: "Create tutorial or guide",
            description: "Teach someone else by creating a tutorial on what you've learned",
            estimatedTime: "1.5 hours",
            type: "Practice",
            platform: "Teaching",
            url: "#",
            completed: false
          },
          {
            id: "task_3_5",
            title: "Interview practice",
            description: "Practice explaining your projects and skills in interview format",
            estimatedTime: "30 minutes",
            type: "Practice",
            platform: "Mock interviews",
            url: "#",
            completed: false
          }
        ],
        milestone: "Advanced project completed and interview skills developed"
      },
      {
        week: "Week 9-12: Professional Readiness",
        focus: "Market Preparation & Job Search",
        tasks: [
          {
            id: "task_4_1",
            title: "Finalize professional portfolio",
            description: "Polish 3-4 best projects and create professional presentation",
            estimatedTime: "4 hours",
            type: "Project",
            platform: "Portfolio site",
            url: "#",
            completed: false
          },
          {
            id: "task_4_2",
            title: "Update all professional profiles",
            description: "Refresh resume, LinkedIn, and other profiles with new skills",
            estimatedTime: "2 hours", 
            type: "Practice",
            platform: "Professional profiles",
            url: "#",
            completed: false
          },
          {
            id: "task_4_3",
            title: "Network with professionals",
            description: "Connect with 10 people in your target field and have meaningful conversations",
            estimatedTime: "3 hours total",
            type: "Research",
            platform: "Networking",
            url: "#",
            completed: false
          },
          {
            id: "task_4_4",
            title: "Apply strategic job applications",
            description: "Submit 10 well-researched applications to positions that match your new skills",
            estimatedTime: "4 hours",
            type: "Practice",
            platform: "Job applications",
            url: "#",
            completed: false
          },
          {
            id: "task_4_5",
            title: "Prepare for interviews",
            description: "Practice technical questions and behavioral interviews specific to the role",
            estimatedTime: "2 hours",
            type: "Practice",
            platform: "Interview prep",
            url: "#",
            completed: false
          }
        ],
        milestone: "Job-ready with portfolio, applications submitted, and interviews scheduled"
      }
    ];
  }
}
