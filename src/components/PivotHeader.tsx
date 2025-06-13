
import { Target } from 'lucide-react';

interface PivotHeaderProps {
  onFeatureClick: (feature: string) => void;
}

export const PivotHeader = ({
  onFeatureClick
}: PivotHeaderProps) => {
  return (
    <div className="text-center space-y-8 mb-12">
      {/* Main Hero Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Pivot
          </h1>
        </div>
        
        <h2 className="text-gray-900 leading-tight text-xl font-medium">
          Transform career uncertainty into your next breakthrough
        </h2>
        
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Whether you're facing layoffs, automation, or industry shifts—you're not stuck. 
          You're just one pivot away from your next chapter.
        </p>
      </div>
    </div>
  );
};
