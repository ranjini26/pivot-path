
import { Target, RotateCcw, BookOpen } from 'lucide-react';

interface PivotHeaderProps {
  onFeatureClick: (feature: string) => void;
}

export const PivotHeader = ({ onFeatureClick }: PivotHeaderProps) => {
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
        
        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
          Transform career uncertainty into your next breakthrough
        </h2>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Whether you're facing layoffs, automation, or industry shifts—you're not stuck. 
          You're just one pivot away from your next chapter.
        </p>
      </div>

      {/* Feature Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900">Skill Swap Simulator</h3>
          </div>
          <p className="text-blue-700 text-sm">
            Test how your skills transfer across 10+ trending industries
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900">90-Day Learning Plans</h3>
          </div>
          <p className="text-purple-700 text-sm">
            Get practical, step-by-step upskilling roadmaps
          </p>
        </div>
      </div>
    </div>
  );
};
