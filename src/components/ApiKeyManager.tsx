
import { useState, useEffect } from 'react';

interface ApiKeyManagerProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ApiKeyManager = ({
  onApiKeySet,
  hasApiKey
}: ApiKeyManagerProps) => {
  useEffect(() => {
    // API key is now securely stored in Supabase
    onApiKeySet('configured');
  }, [onApiKeySet]);

  // Since API key is handled securely via Supabase, no UI needed
  return null;
};
