
import React from 'react';
import { cn } from '@/lib/utils';
import { TaskStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: TaskStatus | 'APPROVED' | 'REJECTED' | 'PENDING';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'DONE':
        return 'bg-task-done text-white';
      case 'INPROGRESS':
        return 'bg-task-inprogress text-white';
      case 'ONHOLD':
        return 'bg-task-onhold text-white';
      case 'PENDING':
        return 'bg-task-pending text-white';
      case 'APPROVED':
        return 'bg-task-done text-white';
      case 'REJECTED':
        return 'bg-task-onhold text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'INPROGRESS':
        return 'In Progress';
      case 'ONHOLD':
        return 'On Hold';
      default:
        return status.charAt(0) + status.slice(1).toLowerCase();
    }
  };

  return (
    <span
      className={cn(
        'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium',
        getStatusStyles(),
        className
      )}
    >
      {getStatusLabel()}
    </span>
  );
};

export default StatusBadge;
