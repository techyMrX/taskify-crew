
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/lib/types';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CURRENT_USER } from '@/lib/data';
import { toast } from 'sonner';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
  editTask?: Task;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  editTask 
}) => {
  const [formData, setFormData] = useState<Omit<Task, 'id'>>({
    developer: CURRENT_USER.username,
    date: format(new Date(), 'yyyy-MM-dd'),
    task: '',
    status: 'PENDING',
    remarks: ''
  });

  const [errors, setErrors] = useState<{
    task?: string;
    status?: string;
  }>({});

  useEffect(() => {
    if (editTask) {
      setFormData({
        developer: editTask.developer,
        date: editTask.date,
        task: editTask.task,
        status: editTask.status,
        remarks: editTask.remarks
      });
    } else {
      setFormData({
        developer: CURRENT_USER.username,
        date: format(new Date(), 'yyyy-MM-dd'),
        task: '',
        status: 'PENDING',
        remarks: ''
      });
    }
    setErrors({});
  }, [editTask, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (name === 'task' && errors.task) {
      setErrors(prev => ({ ...prev, task: undefined }));
    }
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value as Task['status'] }));
    if (errors.status) {
      setErrors(prev => ({ ...prev, status: undefined }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, date: e.target.value }));
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!formData.task.trim()) {
      newErrors.task = 'Task is required';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      toast.success(editTask ? 'Task updated successfully' : 'Task added successfully');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 bg-gray-50 border-b border-gray-100">
          <DialogTitle>{editTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="developer">Developer</Label>
                <Input 
                  id="developer" 
                  name="developer"
                  value={formData.developer}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task">Task</Label>
              <Textarea 
                id="task" 
                name="task"
                value={formData.task}
                onChange={handleChange}
                placeholder="Enter task details"
                className={errors.task ? "border-red-500" : ""}
              />
              {errors.task && (
                <p className="text-xs text-red-500 mt-1">{errors.task}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup 
                value={formData.status}
                onValueChange={handleStatusChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="DONE" id="status-done" />
                  <Label htmlFor="status-done" className="cursor-pointer">Done</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="INPROGRESS" id="status-in-progress" />
                  <Label htmlFor="status-in-progress" className="cursor-pointer">In Progress</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ONHOLD" id="status-on-hold" />
                  <Label htmlFor="status-on-hold" className="cursor-pointer">On Hold</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PENDING" id="status-pending" />
                  <Label htmlFor="status-pending" className="cursor-pointer">Pending</Label>
                </div>
              </RadioGroup>
              {errors.status && (
                <p className="text-xs text-red-500 mt-1">{errors.status}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea 
                id="remarks" 
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Enter any additional remarks"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {editTask ? 'Update' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
