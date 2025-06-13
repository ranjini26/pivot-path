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
        content: `Create a practical 90-day upskilling plan broken down into small, actionable daily tasks. Each week should have 5-8 specific tasks that can be checked off a list. Return JSON with this structure:
        [
          {
            "week": "Weeks 1-4: Foundation Building",
            "focus": "Core Skills Development",
            "tasks": [
              {
                "id": "task_1_1",
                "title": "Watch Introduction to [Field] fundamentals",
                "description": "Complete the first 3 modules covering basic concepts and terminology",
                "estimatedTime": "2 hours",
                "type": "Video",
                "platform": "Coursera",
                "url": "#",
                "completed": false
              },
              {
                "id": "task_1_2", 
                "title": "Read industry overview article",
                "description": "Read Harvard Business Review article on current trends in [field]",
                "estimatedTime": "30 minutes",
                "type": "Article",
                "platform": "HBR",
                "url": "#",
                "completed": false
              },
              {
                "id": "task_1_3",
                "title": "Create learning journal",
                "description": "Set up a document to track key learnings, questions, and progress",
                "estimatedTime": "15 minutes", 
                "type": "Practice",
                "platform": "Google Docs",
                "url": "#",
                "completed": false
              }
            ],
            "milestone": "Complete foundational knowledge and create first project"
          }
        ]
        
        Make each task:
        - Specific and actionable (can be completed in 15 minutes to 3 hours)
        - Have clear deliverables or completion criteria
        - Build progressively toward the career goal
        - Use real platforms and realistic time estimates
        - Include a mix of learning, practice, and application tasks`
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
        week: "Weeks 1-4: Foundation Building",
        focus: `Core ${careerPath} Fundamentals`,
        tasks: [
          {
            id: "task_1_1",
            title: `Watch "${careerPath} Fundamentals" course introduction`,
            description: "Complete modules 1-3 covering industry basics and key terminology",
            estimatedTime: "3 hours",
            type: "Course",
            platform: "Coursera",
            url: "#",
            completed: false
          },
          {
            id: "task_1_2",
            title: "Read industry overview article",
            description: "Research current trends and opportunities in the field",
            estimatedTime: "45 minutes",
            type: "Article",
            platform: "Medium",
            url: "#",
            completed: false
          },
          {
            id: "task_1_3",
            title: "Create professional learning plan",
            description: "Document your goals, timeline, and success metrics",
            estimatedTime: "30 minutes",
            type: "Practice",
            platform: "Google Docs",
            url: "#",
            completed: false
          },
          {
            id: "task_1_4",
            title: "Join relevant professional communities",
            description: "Find and join 2-3 LinkedIn groups or Discord communities",
            estimatedTime: "20 minutes",
            type: "Research",
            platform: "LinkedIn",
            url: "#",
            completed: false
          },
          {
            id: "task_1_5",
            title: "Complete foundational quiz",
            description: "Test your understanding of basic concepts covered so far",
            estimatedTime: "15 minutes",
            type: "Practice",
            platform: "Self-assessment",
            url: "#",
            completed: false
          }
        ],
        milestone: "Complete foundational knowledge and understand industry basics"
      },
      {
        week: "Weeks 5-8: Skill Development",
        focus: "Hands-on Practice & Tools",
        tasks: [
          {
            id: "task_2_1",
            title: "Complete hands-on tutorial series",
            description: "Follow along with practical exercises using industry tools",
            estimatedTime: "4 hours",
            type: "Practice",
            platform: "YouTube",
            url: "#",
            completed: false
          },
          {
            id: "task_2_2",
            title: "Start first portfolio project",
            description: "Begin working on a project that demonstrates key skills",
            estimatedTime: "2 hours",
            type: "Project",
            platform: "Self-directed",
            url: "#",
            completed: false
          },
          {
            id: "task_2_3",
            title: "Practice daily skill exercises",
            description: "Dedicate 30 minutes daily to skill-building activities",
            estimatedTime: "30 minutes/day",
            type: "Practice",
            platform: "Various",
            url: "#",
            completed: false
          },
          {
            id: "task_2_4",
            title: "Seek feedback from professionals",
            description: "Share your progress and get input from industry experts",
            estimatedTime: "1 hour",
            type: "Research",
            platform: "LinkedIn",
            url: "#",
            completed: false
          },
          {
            id: "task_2_5",
            title: "Document your learning journey",
            description: "Write blog posts or LinkedIn updates about your progress",
            estimatedTime: "45 minutes",
            type: "Practice",
            platform: "LinkedIn/Medium",
            url: "#",
            completed: false
          }
        ],
        milestone: "Build first portfolio project demonstrating key skills"
      },
      {
        week: "Weeks 9-12: Portfolio & Networking",
        focus: "Professional Preparation",
        tasks: [
          {
            id: "task_3_1",
            title: "Complete professional portfolio",
            description: "Finalize 2-3 projects showcasing your new skills",
            estimatedTime: "6 hours",
            type: "Project",
            platform: "GitHub/Portfolio site",
            url: "#",
            completed: false
          },
          {
            id: "task_3_2",
            title: "Update resume and LinkedIn profile",
            description: "Highlight new skills and projects prominently",
            estimatedTime: "2 hours",
            type: "Practice",
            platform: "LinkedIn",
            url: "#",
            completed: false
          },
          {
            id: "task_3_3",
            title: "Conduct informational interviews",
            description: "Schedule calls with 3-5 professionals in your target field",
            estimatedTime: "3 hours",
            type: "Research",
            platform: "LinkedIn/Email",
            url: "#",
            completed: false
          },
          {
            id: "task_3_4",
            title: "Apply to first opportunities",
            description: "Submit applications to 5-10 relevant positions",
            estimatedTime: "4 hours",
            type: "Practice",
            platform: "Job boards",
            url: "#",
            completed: false
          },
          {
            id: "task_3_5",
            title: "Practice interview skills",
            description: "Complete mock interviews and prepare for common questions",
            estimatedTime: "2 hours",
            type: "Practice",
            platform: "Mock interview platforms",
            url: "#",
            completed: false
          }
        ],
        milestone: "Complete professional portfolio and begin networking actively"
      }
    ];
  }
}
