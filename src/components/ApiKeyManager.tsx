import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
interface ApiKeyManagerProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}
export const ApiKeyManager = ({
  onApiKeySet,
  hasApiKey
}: ApiKeyManagerProps) => {
  const [isConfigured, setIsConfigured] = useState(true);
  useEffect(() => {
    // API key is now securely stored in Supabase
    setIsConfigured(true);
    onApiKeySet('configured');
  }, [onApiKeySet]);
  return;
};