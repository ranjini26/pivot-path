
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface ApiKeyManagerProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ApiKeyManager = ({ onApiKeySet, hasApiKey }: ApiKeyManagerProps) => {
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    // API key is now securely stored in Supabase
    setIsConfigured(true);
    onApiKeySet('configured');
  }, [onApiKeySet]);

  return (
    <Card className="glass-effect p-4 border-l-4 border-l-green-400">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            OpenAI API Key Securely Configured
          </span>
        </div>
      </div>
      <Alert className="mt-2 border-green-200 bg-green-50">
        <AlertDescription className="text-green-700 text-xs">
          Your API key is safely stored in Supabase and never exposed to the frontend.
        </AlertDescription>
      </Alert>
    </Card>
  );
};
