
import { Target } from 'lucide-react';

interface PivotHeaderProps {
  onFeatureClick: (feature: string) => void;
}

export const PivotHeader = ({
  onFeatureClick
}: PivotHeaderProps) => {
  return (
    <div className="text-center space-y-4 sm:space-y-8 mb-8 sm:mb-12 px-4">
      {/* Main Hero Section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
            <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Pivot
          </h1>
        </div>
        
        <h2 className="text-gray-900 leading-tight text-lg sm:text-xl font-medium px-2">
          Transform career uncertainty into your next breakthrough
        </h2>
        
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg px-4">
          Whether you're facing layoffs, automation, or industry shifts—you're not stuck. 
          You're just one pivot away from your next chapter.
        </p>
      </div>
    </div>
  );
};
