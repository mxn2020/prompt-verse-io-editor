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
import { useEditor } from '../../hooks/useEditor';
import { Button } from '../ui/button';

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
    return `w-full m-1 w-16 h-16 flex flex-col items-center py-3 px-2 transition-all duration-150 cursor-pointer ` +
    `hover:shadow-lg rounded-lg ` +
    (
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
    );
  };

  const handleItemClick = (item: any) => {
    console.log(`Clicked on sidebar 
      item: ${item},
      activeSidebarItem: ${activeSidebarItem},
      isInnerSidebarExpanded: ${isInnerSidebarExpanded}`);

    if (activeSidebarItem === item) {
      console.log(`Deselecting sidebar item: ${item}`);
      setActiveSidebarItem(null);
      toggleInnerSidebar();
    } else {
      console.log(`Selecting sidebar item: ${item}`);
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
            <Button 
              className={getItemClass('sections')}
              onClick={() => handleItemClick('sections')}
              onMouseEnter={() => handleMouseEnter('sections')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <Layout size={24} />
              <span className="text-xs mt-1">Sections</span>
            </Button>
            <Button 
              className={getItemClass('templates')}
              onClick={() => handleItemClick('templates')}
              onMouseEnter={() => handleMouseEnter('templates')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <BookTemplate size={24} />
              <span className="text-xs mt-1">Templates</span>
            </Button>
            <Button 
              className={getItemClass('preview')}
              onClick={() => handleItemClick('preview')}
              onMouseEnter={() => handleMouseEnter('preview')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <Eye size={24} />
              <span className="text-xs mt-1">Preview</span>
            </Button>
          </>
        );
      case 'modulized':
        return (
          <>
            <Button 
              className={getItemClass('modules')}
              onClick={() => handleItemClick('modules')}
              onMouseEnter={() => handleMouseEnter('modules')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <Puzzle size={24} />
              <span className="text-xs mt-1">Modules</span>
            </Button>
            <Button 
              className={getItemClass('templates')}
              onClick={() => handleItemClick('templates')}
              onMouseEnter={() => handleMouseEnter('templates')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <BookTemplate size={24} />
              <span className="text-xs mt-1">Templates</span>
            </Button>
            <Button 
              className={getItemClass('schema')}
              onClick={() => handleItemClick('schema')}
              onMouseEnter={() => handleMouseEnter('schema')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <Layers size={24} />
              <span className="text-xs mt-1">Schema</span>
            </Button>
          </>
        );
      case 'advanced':
        return (
          <>
            <Button 
              className={getItemClass('templates')}
              onClick={() => handleItemClick('templates')}
              onMouseEnter={() => handleMouseEnter('templates')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <BookTemplate size={24} />
              <span className="text-xs mt-1">Templates</span>
            </Button>
            <Button 
              className={getItemClass('library')}
              onClick={() => handleItemClick('library')}
              onMouseEnter={() => handleMouseEnter('library')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <Library size={24} />
              <span className="text-xs mt-1">Library</span>
            </Button>
            <Button 
              className={getItemClass('modules')}
              onClick={() => handleItemClick('modules')}
              onMouseEnter={() => handleMouseEnter('modules')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <Puzzle size={24} />
              <span className="text-xs mt-1">Modules</span>
            </Button>
            <Button 
              className={getItemClass('blocks')}
              onClick={() => handleItemClick('blocks')}
              onMouseEnter={() => handleMouseEnter('blocks')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <Boxes size={24} />
              <span className="text-xs mt-1">Blocks</span>
            </Button>
            <Button 
              className={getItemClass('wrappers')}
              onClick={() => handleItemClick('wrappers')}
              onMouseEnter={() => handleMouseEnter('wrappers')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <Layers size={24} />
              <span className="text-xs mt-1">Wrappers</span>
            </Button>
          </>
        );
      default: // standard
        return (
          <>
            <Button 
              className={getItemClass('files')}
              onClick={() => handleItemClick('files')}
              onMouseEnter={() => handleMouseEnter('files')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <FileText size={24} />
              <span className="text-xs mt-1">Files</span>
            </Button>
            <Button 
              className={getItemClass('templates')}
              onClick={() => handleItemClick('templates')}
              onMouseEnter={() => handleMouseEnter('templates')}
              onMouseLeave={handleMouseLeave}
              variant="ghost"
            >
              <BookTemplate size={24} />
              <span className="text-xs mt-1">Templates</span>
            </Button>
          </>
        );
    }
  };

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {renderSidebarItems()}
      
      <div className={dividerClass}></div>
      
      <Button 
        className={getItemClass('settings')}
        onClick={() => handleItemClick('settings')}
        onMouseEnter={() => handleMouseEnter('settings')}
        onMouseLeave={handleMouseLeave}
        variant="ghost"
      >
        <Settings size={24} />
        <span className="text-xs mt-1">Settings</span>
      </Button>
      <Button 
        className={getItemClass('help')}
        onClick={() => handleItemClick('help')}
        onMouseEnter={() => handleMouseEnter('help')}
        onMouseLeave={handleMouseLeave}
        variant="ghost"
      >
        <HelpCircle size={24} />
        <span className="text-xs mt-1">Help</span>
      </Button>
    </div>
  );
};

export default OuterSidebar;