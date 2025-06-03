import React from 'react';
import { 
  FileText,
  BookTemplate,
  Layout,
  Settings,
  HelpCircle,
  Eye,
  Library,
  Boxes,
  Layers,
  Puzzle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useEditor } from '../../context/EditorContext';

const OuterSidebar: React.FC = () => {
  const { theme } = useTheme();
  const { 
    promptType,
    activeSidebarItem, 
    setActiveSidebarItem,
    hoveredSidebarItem,
    setHoveredSidebarItem,
    isInnerSidebarExpanded,
    toggleInnerSidebar
  } = useEditor();
  
  const baseClasses = "w-20 h-full flex flex-col items-center py-4 border-r";
  const themeClasses = theme === 'dark' 
    ? "bg-gray-800 border-gray-700" 
    : "bg-gray-100 border-gray-200";
    
  const getItemClass = (item: string) => {
    const isActive = activeSidebarItem === item;
    const isHovered = hoveredSidebarItem === item;
    
    return `w-full flex flex-col items-center py-3 px-2 transition-colors duration-150 ${
      isActive 
        ? theme === 'dark' 
          ? 'bg-gray-700 text-white' 
          : 'bg-gray-200 text-gray-900'
        : isHovered
          ? theme === 'dark'
            ? 'bg-gray-750 text-gray-100'
            : 'bg-gray-150 text-gray-800'
          : theme === 'dark'
            ? 'text-gray-400 hover:text-gray-200'
            : 'text-gray-600 hover:text-gray-900'
    }`;
  };

  const handleItemClick = (item: any) => {
    if (activeSidebarItem === item) {
      setActiveSidebarItem(null);
      toggleInnerSidebar();
    } else {
      setActiveSidebarItem(item);
      if (!isInnerSidebarExpanded) {
        toggleInnerSidebar();
      }
    }
  };

  const handleMouseEnter = (item: any) => {
    setHoveredSidebarItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredSidebarItem(null);
  };

  const dividerClass = `w-12 h-px my-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`;

  const renderSidebarItems = () => {
    switch (promptType) {
      case 'structured':
        return (
          <>
            <button 
              className={getItemClass('sections')}
              onClick={() => handleItemClick('sections')}
              onMouseEnter={() => handleMouseEnter('sections')}
              onMouseLeave={handleMouseLeave}
            >
              <Layout size={24} />
              <span className="text-xs mt-1">Sections</span>
            </button>
            
            <button 
              className={getItemClass('templates')}
              onClick={() => handleItemClick('templates')}
              onMouseEnter={() => handleMouseEnter('templates')}
              onMouseLeave={handleMouseLeave}
            >
              <BookTemplate size={24} />
              <span className="text-xs mt-1">Templates</span>
            </button>
            
            <button 
              className={getItemClass('preview')}
              onClick={() => handleItemClick('preview')}
              onMouseEnter={() => handleMouseEnter('preview')}
              onMouseLeave={handleMouseLeave}
            >
              <Eye size={24} />
              <span className="text-xs mt-1">Preview</span>
            </button>
          </>
        );
      
      case 'modulized':
        return (
          <>
            <button 
              className={getItemClass('modules')}
              onClick={() => handleItemClick('modules')}
              onMouseEnter={() => handleMouseEnter('modules')}
              onMouseLeave={handleMouseLeave}
            >
              <Puzzle size={24} />
              <span className="text-xs mt-1">Modules</span>
            </button>
            
            <button 
              className={getItemClass('templates')}
              onClick={() => handleItemClick('templates')}
              onMouseEnter={() => handleMouseEnter('templates')}
              onMouseLeave={handleMouseLeave}
            >
              <BookTemplate size={24} />
              <span className="text-xs mt-1">Templates</span>
            </button>
            
            <button 
              className={getItemClass('schema')}
              onClick={() => handleItemClick('schema')}
              onMouseEnter={() => handleMouseEnter('schema')}
              onMouseLeave={handleMouseLeave}
            >
              <Layers size={24} />
              <span className="text-xs mt-1">Schema</span>
            </button>
          </>
        );
      
      case 'advanced':
        return (
          <>
            <button 
              className={getItemClass('templates')}
              onClick={() => handleItemClick('templates')}
              onMouseEnter={() => handleMouseEnter('templates')}
              onMouseLeave={handleMouseLeave}
            >
              <BookTemplate size={24} />
              <span className="text-xs mt-1">Templates</span>
            </button>
            
            <button 
              className={getItemClass('library')}
              onClick={() => handleItemClick('library')}
              onMouseEnter={() => handleMouseEnter('library')}
              onMouseLeave={handleMouseLeave}
            >
              <Library size={24} />
              <span className="text-xs mt-1">Library</span>
            </button>
            
            <button 
              className={getItemClass('modules')}
              onClick={() => handleItemClick('modules')}
              onMouseEnter={() => handleMouseEnter('modules')}
              onMouseLeave={handleMouseLeave}
            >
              <Puzzle size={24} />
              <span className="text-xs mt-1">Modules</span>
            </button>
            
            <button 
              className={getItemClass('blocks')}
              onClick={() => handleItemClick('blocks')}
              onMouseEnter={() => handleMouseEnter('blocks')}
              onMouseLeave={handleMouseLeave}
            >
              <Boxes size={24} />
              <span className="text-xs mt-1">Blocks</span>
            </button>
            
            <button 
              className={getItemClass('wrappers')}
              onClick={() => handleItemClick('wrappers')}
              onMouseEnter={() => handleMouseEnter('wrappers')}
              onMouseLeave={handleMouseLeave}
            >
              <Layers size={24} />
              <span className="text-xs mt-1">Wrappers</span>
            </button>
          </>
        );
      
      default: // standard
        return (
          <>
            <button 
              className={getItemClass('files')}
              onClick={() => handleItemClick('files')}
              onMouseEnter={() => handleMouseEnter('files')}
              onMouseLeave={handleMouseLeave}
            >
              <FileText size={24} />
              <span className="text-xs mt-1">Files</span>
            </button>
            
            <button 
              className={getItemClass('templates')}
              onClick={() => handleItemClick('templates')}
              onMouseEnter={() => handleMouseEnter('templates')}
              onMouseLeave={handleMouseLeave}
            >
              <BookTemplate size={24} />
              <span className="text-xs mt-1">Templates</span>
            </button>
          </>
        );
    }
  };

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {renderSidebarItems()}
      
      <div className={dividerClass}></div>
      
      <button 
        className={getItemClass('settings')}
        onClick={() => handleItemClick('settings')}
        onMouseEnter={() => handleMouseEnter('settings')}
        onMouseLeave={handleMouseLeave}
      >
        <Settings size={24} />
        <span className="text-xs mt-1">Settings</span>
      </button>
      
      <button 
        className={getItemClass('help')}
        onClick={() => handleItemClick('help')}
        onMouseEnter={() => handleMouseEnter('help')}
        onMouseLeave={handleMouseLeave}
      >
        <HelpCircle size={24} />
        <span className="text-xs mt-1">Help</span>
      </button>
    </div>
  );
};

export default OuterSidebar;