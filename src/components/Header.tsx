
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CURRENT_USER } from '@/lib/data';

interface HeaderProps {
  activeTab: 'home' | 'task' | 'leave';
  onTabChange: (tab: 'home' | 'task' | 'leave') => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">Task Management System</h1>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button 
              variant={activeTab === 'home' ? 'default' : 'ghost'} 
              onClick={() => onTabChange('home')}
              className="rounded-md"
            >
              Home
            </Button>
            <Button 
              variant={activeTab === 'task' ? 'default' : 'ghost'} 
              onClick={() => onTabChange('task')}
              className="rounded-md"
            >
              Tasks
            </Button>
            <Button 
              variant={activeTab === 'leave' ? 'default' : 'ghost'} 
              onClick={() => onTabChange('leave')}
              className="rounded-md"
            >
              Leave
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 hidden md:block">
              {CURRENT_USER.username}
            </div>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white text-xs">
                {CURRENT_USER.username.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
