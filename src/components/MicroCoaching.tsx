import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Heart, Lightbulb, Target, ArrowLeft } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface CoachingMessage {
  type: 'user' | 'coach';
  content: string;
  emotion?: 'supportive' | 'motivational' | 'practical';
}
interface MicroCoachingProps {
  onBack: () => void;
  apiKey?: string;
}
export const MicroCoaching = ({
  onBack,
  apiKey
}: MicroCoachingProps) => {
  const [messages, setMessages] = useState<CoachingMessage[]>([{
    type: 'coach',
    content: "Hi there! I'm here to be your personal career coach. Whether you need a pep talk, interview tips, or just someone to listen - I've got you. What's on your mind?",
    emotion: 'supportive'
  }]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const quickPrompts = [{
    text: "I'm feeling overwhelmed about job searching",
    emotion: 'supportive'
  }, {
    text: "How do I explain career gaps in interviews?",
    emotion: 'practical'
  }, {
    text: "I keep getting rejected and losing motivation",
    emotion: 'motivational'
  }, {
    text: "What should I say when they ask why I'm changing careers?",
    emotion: 'practical'
  }, {
    text: "I don't feel qualified for the jobs I want",
    emotion: 'supportive'
  }];
  const generateAICoachResponse = async (userMessage: string): Promise<CoachingMessage> => {
    try {
      console.log('Generating AI coach response through secure edge function');
      
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: `You are a supportive career coach helping someone through a career transition. 
              Analyze their message for emotional tone and provide empathetic, actionable advice.
              
              Respond with supportive, motivational, or practical guidance based on their needs.
              Keep responses warm, encouraging, and under 150 words.
              
              If they mention feeling overwhelmed, scared, or lost - be supportive.
              If they mention rejection or losing motivation - be motivational.
              If they ask practical questions - give practical advice.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.8,
          maxTokens: 300,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error('Failed to connect to coaching service');
      }

      if (data.error) {
        console.error('OpenAI API error:', data.error);
        throw new Error('Coaching service error');
      }

      const content = data.choices[0]?.message?.content || 'I\'m here to help you through this journey.';
      
      // Determine emotion based on content tone
      let emotion: 'supportive' | 'motivational' | 'practical' = 'supportive';
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes('practice') || lowerContent.includes('step') || lowerContent.includes('strategy')) {
        emotion = 'practical';
      } else if (lowerContent.includes('strength') || lowerContent.includes('achieve') || lowerContent.includes('success')) {
        emotion = 'motivational';
      }

      return {
        type: 'coach',
        content,
        emotion
      };
    } catch (error) {
      console.error('AI coaching response failed:', error);
      return generateCoachResponse(userMessage);
    }
  };
  const generateCoachResponse = (userMessage: string): CoachingMessage => {
    const lowerMessage = userMessage.toLowerCase();

    // Emotion detection
    let emotion: 'supportive' | 'motivational' | 'practical' = 'practical';
    let response = '';
    if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('scared') || lowerMessage.includes('lost') || lowerMessage.includes('anxious')) {
      emotion = 'supportive';
      response = "I hear you, and what you're feeling is completely normal. Career transitions can feel overwhelming, but remember - you've overcome challenges before, and you will again. Let's break this down into smaller, manageable steps. What feels most overwhelming right now?";
    } else if (lowerMessage.includes('rejected') || lowerMessage.includes('motivation') || lowerMessage.includes('giving up') || lowerMessage.includes('discouraged')) {
      emotion = 'motivational';
      response = "Rejection is redirection, not reflection of your worth. Every 'no' is getting you closer to the right 'yes.' Remember, some of the most successful career pivots happened after multiple rejections. You're building resilience that will serve you well in your new career. What's one small win you can celebrate from your journey so far?";
    } else if (lowerMessage.includes('interview') || lowerMessage.includes('explain') || lowerMessage.includes('how do i') || lowerMessage.includes('what should i say')) {
      emotion = 'practical';
      response = "Great question! Here's a practical approach: Frame your career change as intentional growth, not escape. Focus on transferable skills and what you're moving TOWARD, not what you're leaving behind. Practice the STAR method (Situation, Task, Action, Result) for examples. Would you like me to help you craft a specific response?";
    } else if (lowerMessage.includes('qualified') || lowerMessage.includes('imposter') || lowerMessage.includes('not good enough')) {
      emotion = 'supportive';
      response = "Imposter syndrome is real, but so are your capabilities. You don't need to check every box to be valuable. Your unique background gives you perspectives others don't have. Companies need diverse thinking, not cookie-cutter candidates. What achievements from your current/past role are you most proud of?";
    } else {
      response = "I'm here to help you navigate this. Can you tell me more about what specific aspect you'd like to work through together? Whether it's confidence, strategy, or just processing your thoughts - we'll tackle it step by step.";
    }
    return {
      type: 'coach',
      content: response,
      emotion
    };
  };
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: CoachingMessage = {
      type: 'user',
      content: currentMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const coachResponse = await generateAICoachResponse(currentMessage);
      setTimeout(() => {
        setMessages(prev => [...prev, coachResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      const fallbackResponse = generateCoachResponse(currentMessage);
      setTimeout(() => {
        setMessages(prev => [...prev, fallbackResponse]);
        setIsLoading(false);
      }, 1000);
    }
  };
  const handleQuickPrompt = (prompt: string) => {
    setCurrentMessage(prompt);
  };
  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case 'supportive':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'motivational':
        return <Target className="w-4 h-4 text-orange-500" />;
      case 'practical':
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-indigo-600" />
            Micro-Coaching
          </h2>
          <p className="mt-1 text-zinc-950">Your personal career transformation coach</p>
        </div>
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <Card className="glass-effect p-6 h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message, index) => <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user' ? 'bg-indigo-600 text-white' : 'bg-muted text-foreground border border-border'}`}>
                {message.type === 'coach' && <div className="flex items-center gap-2 mb-2">
                    {getEmotionIcon(message.emotion)}
                    <Badge variant="secondary" className="text-xs">
                      {message.emotion || 'supportive'} mode
                    </Badge>
                  </div>}
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>)}
          
          {isLoading && <div className="flex justify-start">
              <div className="bg-muted text-foreground border border-border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>}
        </div>

        <div className="flex gap-2">
          <Input value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Ask me anything about your career journey..." disabled={isLoading} className="flex-1 bg-zinc-100" />
          <Button onClick={handleSendMessage} disabled={!currentMessage.trim() || isLoading} className="pivot-gradient text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <Card className="glass-effect p-4">
        <h3 className="font-medium mb-3 text-sm text-muted-foreground">Quick conversation starters:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickPrompts.map((prompt, index) => <button key={index} onClick={() => handleQuickPrompt(prompt.text)} disabled={isLoading} className="text-left p-2 text-xs rounded border border-border hover:bg-muted transition-colors disabled:opacity-50">
              {prompt.text}
            </button>)}
        </div>
      </Card>
    </div>;
};
