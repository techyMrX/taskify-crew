
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Leave, LeaveType, LeaveSession } from '@/lib/types';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leave: Omit<Leave, 'id' | 'status'>) => void;
  editLeave?: Leave;
}

const AddLeaveModal: React.FC<AddLeaveModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  editLeave 
}) => {
  const [formData, setFormData] = useState<Omit<Leave, 'id' | 'status'>>({
    appliedDate: format(new Date(), 'yyyy-MM-dd'),
    leaveType: 'CL',
    fromDate: format(new Date(), 'yyyy-MM-dd'),
    toDate: format(new Date(), 'yyyy-MM-dd'),
    session: 'FULL',
    purpose: '',
    noOfDays: 1
  });

  const [errors, setErrors] = useState<{
    purpose?: string;
    noOfDays?: string;
  }>({});

  useEffect(() => {
    if (editLeave) {
      setFormData({
        appliedDate: editLeave.appliedDate,
        leaveType: editLeave.leaveType,
        fromDate: editLeave.fromDate,
        toDate: editLeave.toDate,
        session: editLeave.session,
        purpose: editLeave.purpose,
        noOfDays: editLeave.noOfDays
      });
    } else {
      setFormData({
        appliedDate: format(new Date(), 'yyyy-MM-dd'),
        leaveType: 'CL',
        fromDate: format(new Date(), 'yyyy-MM-dd'),
        toDate: format(new Date(), 'yyyy-MM-dd'),
        session: 'FULL',
        purpose: '',
        noOfDays: 1
      });
    }
    setErrors({});
  }, [editLeave, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (name === 'purpose' && errors.purpose) {
      setErrors(prev => ({ ...prev, purpose: undefined }));
    } else if (name === 'noOfDays' && errors.noOfDays) {
      setErrors(prev => ({ ...prev, noOfDays: undefined }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLeaveTypeChange = (value: LeaveType) => {
    setFormData(prev => ({ ...prev, leaveType: value }));
  };

  const handleSessionChange = (value: LeaveSession) => {
    setFormData(prev => ({ ...prev, session: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }
    
    if (!formData.noOfDays || formData.noOfDays <= 0) {
      newErrors.noOfDays = 'Number of days must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      toast.success(editLeave ? 'Leave request updated successfully' : 'Leave request submitted successfully');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 bg-gray-50 border-b border-gray-100">
          <DialogTitle>{editLeave ? 'Edit Leave Request' : 'Add Leave Request'}</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appliedDate">Applied Date</Label>
                <Input 
                  id="appliedDate" 
                  type="date" 
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleDateChange}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select 
                  value={formData.leaveType} 
                  onValueChange={(value: LeaveType) => handleLeaveTypeChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CL">Casual Leave (CL)</SelectItem>
                    <SelectItem value="ML">Medical Leave (ML)</SelectItem>
                    <SelectItem value="OD">On Duty (OD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromDate">From Date</Label>
                <Input 
                  id="fromDate" 
                  type="date" 
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toDate">To Date</Label>
                <Input 
                  id="toDate" 
                  type="date" 
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Session</Label>
              <RadioGroup 
                value={formData.session}
                onValueChange={(value: LeaveSession) => handleSessionChange(value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FULL" id="session-full" />
                  <Label htmlFor="session-full" className="cursor-pointer">Full Day</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FN" id="session-fn" />
                  <Label htmlFor="session-fn" className="cursor-pointer">Forenoon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="AN" id="session-an" />
                  <Label htmlFor="session-an" className="cursor-pointer">Afternoon</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea 
                id="purpose" 
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                placeholder="Enter the purpose of leave"
                className={errors.purpose ? "border-red-500" : ""}
              />
              {errors.purpose && (
                <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="noOfDays">Number of Days</Label>
              <Input 
                id="noOfDays" 
                name="noOfDays"
                type="number"
                min="0.5"
                step="0.5"
                value={formData.noOfDays.toString()}
                onChange={handleInputChange}
                className={errors.noOfDays ? "border-red-500" : ""}
              />
              {errors.noOfDays && (
                <p className="text-xs text-red-500 mt-1">{errors.noOfDays}</p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {editLeave ? 'Update' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeaveModal;
