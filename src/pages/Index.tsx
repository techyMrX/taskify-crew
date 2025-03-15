import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Header from '@/components/Header';
import StatusBadge from '@/components/StatusBadge';
import TaskChart from '@/components/TaskChart';
import TaskCard from '@/components/TaskCard';
import AddTaskModal from '@/components/AddTaskModal';
import AddLeaveModal from '@/components/AddLeaveModal';
import { MOCK_TASKS, MOCK_LEAVES, TASK_STATS, CURRENT_USER } from '@/lib/data';
import { Task, Leave } from '@/lib/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'task' | 'leave'>('home');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [leaves, setLeaves] = useState<Leave[]>(MOCK_LEAVES);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [editingLeave, setEditingLeave] = useState<Leave | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const animationDelays = [
    'animate-delay-1',
    'animate-delay-2',
    'animate-delay-3',
    'animate-delay-4',
    'animate-delay-5',
  ];

  const handleTabChange = (tab: 'home' | 'task' | 'leave') => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    setIsLoggedIn(false);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsAddTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsAddTaskModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully');
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData } 
          : task
      ));
    } else {
      const newTask: Task = {
        id: uuidv4().toString(),
        ...taskData,
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleAddLeave = () => {
    setEditingLeave(undefined);
    setIsAddLeaveModalOpen(true);
  };

  const handleEditLeave = (leave: Leave) => {
    setEditingLeave(leave);
    setIsAddLeaveModalOpen(true);
  };

  const handleDeleteLeave = (id: string) => {
    setLeaves(leaves.filter(leave => leave.id !== id));
    toast.success('Leave request deleted');
  };

  const handleSaveLeave = (leaveData: Omit<Leave, 'id' | 'status'>) => {
    if (editingLeave) {
      setLeaves(leaves.map(leave => 
        leave.id === editingLeave.id 
          ? { ...leave, ...leaveData } 
          : leave
      ));
    } else {
      const newLeave: Leave = {
        id: uuidv4().toString(),
        ...leaveData,
        status: 'PENDING'
      };
      setLeaves([newLeave, ...leaves]);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <Card className="w-full max-w-md animate-scale shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Task Management System</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Logged out</span>
              </div>
            </div>
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin opacity-25" />
            </div>
            <p className="text-center text-sm text-gray-500">
              You've been logged out. Redirecting...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onLogout={handleLogout} 
      />
      
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2 animate-fade-in">
                Welcome, {CURRENT_USER.username}
              </h1>
              <p className="text-gray-600 animate-fade-in animate-delay-1">
                Manage your tasks and leave requests efficiently.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className={`animate-scale ${animationDelays[0]}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Today's Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{TASK_STATS.today.total}</div>
                </CardContent>
              </Card>
              
              <Card className={`animate-scale ${animationDelays[1]}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Tasks Done</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center">
                  <div className="text-2xl font-bold">{TASK_STATS.week.done}</div>
                  <div className="ml-2">
                    <CheckCircle className="h-5 w-5 text-task-done" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`animate-scale ${animationDelays[2]}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center">
                  <div className="text-2xl font-bold">{TASK_STATS.week.inProgress}</div>
                  <div className="ml-2">
                    <Clock className="h-5 w-5 text-task-inprogress" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`animate-scale ${animationDelays[3]}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">On Hold</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center">
                  <div className="text-2xl font-bold">{TASK_STATS.week.onHold}</div>
                  <div className="ml-2">
                    <AlertCircle className="h-5 w-5 text-task-onhold" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 animate-fade-in animate-delay-3">
                <TaskChart />
              </div>
              
              <div className="animate-fade-in animate-delay-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Leave Requests</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {leaves.slice(0, 3).map((leave) => (
                        <div 
                          key={leave.id} 
                          className="p-4 border-b border-gray-100 last:border-0 flex justify-between items-center"
                        >
                          <div>
                            <p className="text-sm font-medium">{leave.purpose}</p>
                            <p className="text-xs text-gray-500">
                              {leave.fromDate === leave.toDate 
                                ? `${leave.fromDate} (${leave.session})`
                                : `${leave.fromDate} to ${leave.toDate}`}
                            </p>
                          </div>
                          <StatusBadge status={leave.status} />
                        </div>
                      ))}
                      
                      {leaves.length === 0 && (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No leave requests found
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-gray-100 p-4">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setActiveTab('leave')}
                    >
                      View All Requests
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div className="animate-fade-in animate-delay-5">
              <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.slice(0, 3).map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
                
                {tasks.length === 0 && (
                  <div className="col-span-full p-8 text-center text-gray-500 border border-dashed border-gray-200 rounded-lg">
                    No tasks found. Create your first task!
                  </div>
                )}
              </div>
              {tasks.length > 0 && (
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('task')}
                  >
                    View All Tasks
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'task' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 animate-fade-in">
                Tasks
              </h1>
              <Button onClick={handleAddTask} className="animate-fade-in">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task, index) => (
                <div key={task.id} className={`animate-fade-in ${index < 5 ? animationDelays[index % 5] : ''}`}>
                  <TaskCard 
                    task={task} 
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
              
              {tasks.length === 0 && (
                <div className="col-span-full p-8 text-center text-gray-500 border border-dashed border-gray-200 rounded-lg">
                  No tasks found. Create your first task!
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'leave' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 animate-fade-in">
                Leave Requests
              </h1>
              <Button onClick={handleAddLeave} className="animate-fade-in">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Leave
              </Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-scale">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Leave Period
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leaves.map((leave) => (
                      <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {leave.appliedDate}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {leave.fromDate === leave.toDate 
                            ? `${leave.fromDate} (${leave.session})`
                            : `${leave.fromDate} to ${leave.toDate}`}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {leave.leaveType}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                          {leave.purpose}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {leave.noOfDays}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <StatusBadge status={leave.status} />
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditLeave(leave)}
                              className="h-8 px-2 text-gray-500 hover:text-primary"
                              disabled={leave.status !== 'PENDING'}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteLeave(leave.id)}
                              className="h-8 px-2 text-gray-500 hover:text-destructive"
                              disabled={leave.status !== 'PENDING'}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {leaves.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                          No leave requests found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AddTaskModal 
        isOpen={isAddTaskModalOpen} 
        onClose={() => setIsAddTaskModalOpen(false)} 
        onSave={handleSaveTask}
        editTask={editingTask}
      />
      
      <AddLeaveModal 
        isOpen={isAddLeaveModalOpen} 
        onClose={() => setIsAddLeaveModalOpen(false)} 
        onSave={handleSaveLeave}
        editLeave={editingLeave}
      />
    </div>
  );
};

export default Index;
