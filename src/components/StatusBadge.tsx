
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'DONE' | 'INPROGRESS' | 'ONHOLD' | 'PENDING' | 'APPROVED' | 'REJECTED';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let className = "";
  
  switch (status) {
    case 'DONE':
    case 'APPROVED':
      className = "bg-task-done text-white";
      break;
    case 'INPROGRESS':
      className = "bg-task-inprogress text-white";
      break;
    case 'ONHOLD':
    case 'REJECTED':
      className = "bg-task-onhold text-white";
      break;
    case 'PENDING':
      className = "bg-task-pending text-white";
      break;
    default:
      variant = "outline";
  }
  
  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
