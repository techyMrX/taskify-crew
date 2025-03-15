
import { Task, Leave, User } from './types';
import { formatISO } from 'date-fns';

// Get today's date
const today = new Date();

// Get yesterday's date
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

// Get the day before yesterday
const dayBeforeYesterday = new Date();
dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

export const CURRENT_USER: User = {
  id: "1",
  username: "Sri Prakash Rahul M",
  email: "prakash@example.com",
  isAdmin: false
};

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    developer: "Sri Prakash Rahul M",
    date: formatISO(today, { representation: 'date' }),
    task: "Implement user authentication flow",
    status: "INPROGRESS",
    remarks: "Working on the login and registration screens"
  },
  {
    id: "2",
    developer: "Sri Prakash Rahul M",
    date: formatISO(yesterday, { representation: 'date' }),
    task: "Create dashboard UI components",
    status: "DONE",
    remarks: "Completed all required components"
  },
  {
    id: "3",
    developer: "Sri Prakash Rahul M",
    date: formatISO(dayBeforeYesterday, { representation: 'date' }),
    task: "Fix responsiveness issues",
    status: "DONE",
    remarks: "Fixed all reported issues on mobile and tablet views"
  },
  {
    id: "4",
    developer: "Sri Prakash Rahul M",
    date: formatISO(yesterday, { representation: 'date' }),
    task: "Implement task filtering functionality",
    status: "ONHOLD",
    remarks: "Waiting for API endpoint to be ready"
  },
  {
    id: "5",
    developer: "Sri Prakash Rahul M",
    date: formatISO(today, { representation: 'date' }),
    task: "Create data visualization charts",
    status: "PENDING",
    remarks: "Will start after the current task"
  }
];

export const MOCK_LEAVES: Leave[] = [
  {
    id: "1",
    appliedDate: formatISO(yesterday, { representation: 'date' }),
    leaveType: "CL",
    fromDate: formatISO(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), { representation: 'date' }),
    toDate: formatISO(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6), { representation: 'date' }),
    session: "FULL",
    purpose: "Personal work",
    noOfDays: 2,
    status: "PENDING"
  },
  {
    id: "2",
    appliedDate: formatISO(new Date(today.getFullYear(), today.getMonth() - 1, 15), { representation: 'date' }),
    leaveType: "ML",
    fromDate: formatISO(new Date(today.getFullYear(), today.getMonth() - 1, 20), { representation: 'date' }),
    toDate: formatISO(new Date(today.getFullYear(), today.getMonth() - 1, 22), { representation: 'date' }),
    session: "FULL",
    purpose: "Medical appointment",
    noOfDays: 3,
    status: "APPROVED"
  }
];

// Statistics for dashboard
export const TASK_STATS = {
  today: {
    total: 2,
    done: 0,
    inProgress: 1,
    onHold: 0,
    pending: 1
  },
  week: {
    total: 5,
    done: 2,
    inProgress: 1,
    onHold: 1,
    pending: 1
  }
};

// Last 6 days data for chart
export const CHART_DATA = [
  { name: '6 days ago', done: 1, inProgress: 2, onHold: 0, pending: 0 },
  { name: '5 days ago', done: 2, inProgress: 1, onHold: 1, pending: 0 },
  { name: '4 days ago', done: 3, inProgress: 0, onHold: 1, pending: 1 },
  { name: '3 days ago', done: 2, inProgress: 2, onHold: 0, pending: 0 },
  { name: 'Yesterday', done: 1, inProgress: 0, onHold: 1, pending: 0 },
  { name: 'Today', done: 0, inProgress: 1, onHold: 0, pending: 1 }
];
