
import React from 'react';
import { Button } from "@/components/ui/button";
import { CURRENT_USER } from "@/lib/data";

interface HeaderProps {
  activeTab: 'home' | 'task' | 'leave';
  onTabChange: (tab: 'home' | 'task' | 'leave') => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onLogout }) => {
  return (
    <header className="w-full glass-morphism sticky top-0 z-10 border-b border-gray-200 py-3 animate-fade-in">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-xl font-semibold text-gray-800 tracking-tight">
            Task Management System
          </div>
        </div>
        
        <div className="flex items-center">
          <nav className="hidden md:flex items-center mr-6">
            <button 
              onClick={() => onTabChange('home')}
              className={`px-3 py-2 mx-1 rounded-lg transition-all duration-200 ${
                activeTab === 'home' 
                  ? 'bg-primary text-white font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => onTabChange('task')}
              className={`px-3 py-2 mx-1 rounded-lg transition-all duration-200 ${
                activeTab === 'task' 
                  ? 'bg-primary text-white font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tasks
            </button>
            <button 
              onClick={() => onTabChange('leave')}
              className={`px-3 py-2 mx-1 rounded-lg transition-all duration-200 ${
                activeTab === 'leave' 
                  ? 'bg-primary text-white font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Leave
            </button>
          </nav>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-sm text-gray-600 font-medium">
              {CURRENT_USER.username}
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="button-press"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden flex justify-center mt-3 border-t border-gray-100 pt-2">
        <nav className="flex items-center space-x-1 px-2">
          <button 
            onClick={() => onTabChange('home')}
            className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === 'home' 
                ? 'bg-primary text-white font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => onTabChange('task')}
            className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === 'task' 
                ? 'bg-primary text-white font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tasks
          </button>
          <button 
            onClick={() => onTabChange('leave')}
            className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTab === 'leave' 
                ? 'bg-primary text-white font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Leave
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
