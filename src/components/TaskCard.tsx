
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card className="card-hover">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 mb-2">
            <h3 className="font-medium text-lg line-clamp-2">{task.task}</h3>
            <p className="text-sm text-gray-500">{task.date}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>
        <p className="text-sm text-gray-600 mt-2">{task.remarks}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end space-x-2 border-t border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onEdit(task)}
          className="text-gray-500 hover:text-primary"
        >
          <Pencil className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(task.id)}
          className="text-gray-500 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
