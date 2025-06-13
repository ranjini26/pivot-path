
import { User, Target, Upload, CheckCircle } from 'lucide-react';

interface SetupTask {
  icon: any;
  label: string;
  description: string;
  completed: boolean;
}

export const SetupTasksList = () => {
  const setupTasks: SetupTask[] = [
    { icon: User, label: "Create learning workspace", description: "Set up dedicated space for focused practice", completed: true },
    { icon: Target, label: "Define success metrics", description: "Establish clear goals and progress indicators", completed: true },
    { icon: Upload, label: "Track daily progress", description: "Log completed tasks and learning insights", completed: false },
    { icon: CheckCircle, label: "Complete first week", description: "Finish foundation building tasks", completed: false }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {setupTasks.map((task, index) => (
        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            task.completed 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            {task.completed ? (
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <task.icon className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white text-sm">{task.label}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
