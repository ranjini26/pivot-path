
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';
import { SetupTasksList } from './SetupTasksList';

interface ProgressOverviewProps {
  checkedTasksCount: number;
  totalTasksCount: number;
  progressPercentage: number;
}

export const ProgressOverview = ({ 
  checkedTasksCount, 
  totalTasksCount, 
  progressPercentage 
}: ProgressOverviewProps) => {
  return (
    <Card className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Progress</h2>
          <div className="flex items-center gap-3 mt-2">
            <Progress value={progressPercentage} className="flex-1 max-w-xs" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {checkedTasksCount} of {totalTasksCount} tasks completed ({progressPercentage}%)
            </span>
          </div>
        </div>
      </div>

      <SetupTasksList />
    </Card>
  );
};
