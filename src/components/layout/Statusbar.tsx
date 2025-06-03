import React from 'react';
import { 
  AlignLeft, 
  CheckSquare, 
  Clock, 
  Share2, 
  Moon, 
  Sun
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Statusbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const baseClasses = "h-8 px-4 flex items-center justify-between border-t text-xs";
  const themeClasses = theme === 'dark' 
    ? "bg-gray-800 border-gray-700 text-gray-300" 
    : "bg-gray-50 border-gray-200 text-gray-600";

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <AlignLeft size={14} className="mr-1" />
          <span>1,250 words</span>
        </div>
        
        <div className="flex items-center">
          <CheckSquare size={14} className="mr-1" />
          <span>5 sections</span>
        </div>
        
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          <span>Last edited 5m ago</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </div>
  );
};

export default Statusbar;