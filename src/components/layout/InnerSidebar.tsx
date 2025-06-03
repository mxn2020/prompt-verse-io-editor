import React, { useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useEditor } from '../../context/EditorContext';

interface InnerSidebarProps {
  floating: boolean;
}

const InnerSidebar: React.FC<InnerSidebarProps> = ({ floating }) => {
  const { theme } = useTheme();
  const { 
    toggleInnerSidebar, 
    activeSidebarItem,
    hoveredSidebarItem,
    setHoveredSidebarItem
  } = useEditor();
  
  const currentItem = activeSidebarItem || hoveredSidebarItem;
  
  const baseClasses = `w-64 flex flex-col border-r overflow-hidden transition-all duration-200 rounded-lg ${
    floating ? 'h-[calc(100%-8rem)] mt-24' : 'h-full'
  }`;
  const themeClasses = theme === 'dark' 
    ? "bg-gray-800 border-gray-700 text-gray-100" 
    : "bg-white border-gray-200 text-gray-800";
  const floatingClasses = floating ? "shadow-xl" : "";
    
  const headerClass = `px-4 h-12 flex items-center justify-between border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`;
  const searchWrapperClass = `px-3 py-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`;
  const searchInputClass = `w-full px-3 py-1.5 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none`;

  const getContent = () => {
    switch (currentItem) {
      case 'files':
        return (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Recent Files</span>
                <span className="text-xs text-gray-500">5 items</span>
              </div>
              {/* Add file list items here */}
            </div>
          </div>
        );
      case 'templates':
        return (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Featured Templates</span>
                <span className="text-xs text-gray-500">12 items</span>
              </div>
              {/* Add template items here */}
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Recent Changes</span>
                <span className="text-xs text-gray-500">Last 7 days</span>
              </div>
              {/* Add history items here */}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Editor Settings</h3>
              {/* Add settings options here */}
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Help Center</h3>
              {/* Add help content here */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleMouseEnter = () => {
    if (floating && hoveredSidebarItem) {
      setHoveredSidebarItem(hoveredSidebarItem);
    }
  };

  const handleMouseLeave = () => {
    if (floating) {
      setHoveredSidebarItem(null);
    }
  };

  return (
    <div 
      className={`${baseClasses} ${themeClasses} ${floatingClasses}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={headerClass}>
        <h2 className="font-medium capitalize">{currentItem}</h2>
        {!floating && (
          <button 
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={toggleInnerSidebar}
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <div className={searchWrapperClass}>
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${currentItem}...`}
            className={searchInputClass}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>
      
      {getContent()}
    </div>
  );
};

export default InnerSidebar;