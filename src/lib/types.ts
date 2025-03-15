
export type TaskStatus = 'DONE' | 'INPROGRESS' | 'ONHOLD' | 'PENDING';

export type LeaveType = 'CL' | 'ML' | 'OD';

export type LeaveSession = 'FULL' | 'FN' | 'AN';

export type Task = {
  id: string;
  developer: string;
  date: string;
  task: string;
  status: TaskStatus;
  remarks: string;
};

export type Leave = {
  id: string;
  appliedDate: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  session: LeaveSession;
  purpose: string;
  noOfDays: number;
  status: 'APPROVED' | 'REJECTED' | 'PENDING';
};

export type User = {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};
