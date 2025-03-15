
import React from 'react';
import { Task } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-scale">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">
            {format(parseISO(task.date), 'MMMM d, yyyy')}
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">{task.task}</h3>
        </div>
        <StatusBadge status={task.status} />
      </div>
      
      {task.remarks && (
        <p className="text-sm text-gray-600 mt-2 mb-4">{task.remarks}</p>
      )}
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="text-sm text-gray-600">{task.developer}</div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="h-8 px-2 text-gray-500 hover:text-primary"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="h-8 px-2 text-gray-500 hover:text-destructive"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
