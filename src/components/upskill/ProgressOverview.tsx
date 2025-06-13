
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Target, Clock, Award } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm font-medium">Completed Tasks</p>
              <p className="text-2xl font-bold text-emerald-900">{checkedTasksCount}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-900">{totalTasksCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Progress</p>
              <p className="text-2xl font-bold text-purple-900">{progressPercentage}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
            <span className="text-sm font-medium text-muted-foreground">
              {checkedTasksCount} of {totalTasksCount} tasks completed
            </span>
          </div>
          
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Start</span>
              <span>{progressPercentage}% Complete</span>
              <span>Finish</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Setup Tasks */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-foreground">Quick Setup Tasks</h3>
          </div>
          <SetupTasksList />
        </div>
      </Card>
    </div>
  );
};
