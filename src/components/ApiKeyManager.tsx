
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Eye, EyeOff, Shield } from 'lucide-react';

interface ApiKeyManagerProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ApiKeyManager = ({ onApiKeySet, hasApiKey }: ApiKeyManagerProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsValid(true);
      onApiKeySet(storedKey);
    }
  }, [onApiKeySet]);

  const handleSaveKey = () => {
    if (apiKey.startsWith('sk-') && apiKey.length > 20) {
      localStorage.setItem('openai_api_key', apiKey);
      setIsValid(true);
      onApiKeySet(apiKey);
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsValid(false);
    onApiKeySet('');
  };

  if (hasApiKey && isValid) {
    return (
      <Card className="glass-effect p-4 border-l-4 border-l-green-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">OpenAI API Key Configured</span>
          </div>
          <Button onClick={handleClearKey} variant="outline" size="sm">
            Update Key
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-effect p-6 border-l-4 border-l-amber-400">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-lg">OpenAI API Key Required</h3>
        </div>
        
        <Alert>
          <AlertDescription>
            To enable AI-powered career analysis, please enter your OpenAI API key. 
            Your key is stored locally in your browser and never sent to our servers.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <div className="relative">
            <Input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          
          <Button 
            onClick={handleSaveKey}
            disabled={!apiKey.startsWith('sk-') || apiKey.length < 20}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            Save API Key
          </Button>
        </div>

        <div className="text-xs text-slate-500 space-y-1">
          <p>• Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">OpenAI Platform</a></p>
          <p>• Your key is stored locally and used only for AI analysis</p>
          <p>• For production use, consider connecting to Supabase for secure key management</p>
        </div>
      </div>
    </Card>
  );
};
