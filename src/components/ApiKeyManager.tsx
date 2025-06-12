
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface ApiKeyManagerProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ApiKeyManager = ({ onApiKeySet, hasApiKey }: ApiKeyManagerProps) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Use your OpenAI API key directly
    const apiKey = 'sk-proj-your-api-key-here'; // Replace with your actual API key
    setIsValid(true);
    onApiKeySet(apiKey);
  }, [onApiKeySet]);

  if (hasApiKey && isValid) {
    return (
      <Card className="glass-effect p-4 border-l-4 border-l-green-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">OpenAI API Key Configured</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-effect p-4 border-l-4 border-l-amber-400">
      <Alert>
        <AlertDescription>
          Setting up AI-powered career analysis...
        </AlertDescription>
      </Alert>
    </Card>
  );
};
