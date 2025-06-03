import React from 'react';
import { 
  Grid, 
  List, 
  LayoutTemplate, 
  Maximize2, 
  Minimize2, 
  Plus, 
  Minus, 
  Code,
  FileText
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useEditor } from '../../hooks/use-editor';
import { Button } from '../ui/button';

const ViewOptionsToolbar: React.FC = () => {
  const { theme } = useTheme();
  const { 
    promptType, 
    moduleViewOption, 
    setModuleViewOption, 
    sectionViewOption, 
    setSectionViewOption,
    sectionFormat,
    setSectionFormat
  } = useEditor();
  
  // Skip rendering this component in some cases
  if (promptType === 'standard') {
    return null;
  }
  
  const baseClasses = "py-1.5 px-2 flex items-center gap-1 rounded-lg shadow-lg transition-all duration-200";
  const themeClasses = theme === 'dark' 
    ? "bg-gray-800 text-gray-200" 
    : "bg-white text-gray-800";
    
  const buttonBaseClass = `p-1.5 rounded transition-colors duration-150 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`;
  const buttonActiveClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  
  const renderViewOptions = () => {
    if (promptType === 'modulized') {
      return (
        <>
          <div className="flex">
            <Button 
              className={`${buttonBaseClass} ${moduleViewOption === 'grid' ? buttonActiveClass : ''}`}
              onClick={() => setModuleViewOption('grid')}
              title="Grid View"
              variant="ghost"
            >
              <Grid size={16} />
            </Button>
            <Button 
              className={`${buttonBaseClass} ${moduleViewOption === 'list' ? buttonActiveClass : ''}`}
              onClick={() => setModuleViewOption('list')}
              title="List View"
              variant="ghost"
            >
              <List size={16} />
            </Button>
            <Button 
              className={`${buttonBaseClass} ${moduleViewOption === 'snake' ? buttonActiveClass : ''}`}
              onClick={() => setModuleViewOption('snake')}
              title="Snake View"
              variant="ghost"
            >
              <LayoutTemplate size={16} />
            </Button>
          </div>
          <div className={`h-4 w-px mx-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="flex">
            <Button className={buttonBaseClass} title="Zoom Out" variant="ghost">
              <Minus size={16} />
            </Button>
            <Button className={buttonBaseClass} title="Zoom In" variant="ghost">
              <Plus size={16} />
            </Button>
          </div>
        </>
      );
    } else if (promptType === 'structured') {
      return (
        <>
          <div className="flex">
            <Button 
              className={`${buttonBaseClass} ${sectionViewOption === 'padding' ? buttonActiveClass : ''}`}
              onClick={() => setSectionViewOption('padding')}
              title="With Padding"
              variant="ghost"
            >
              <Maximize2 size={16} />
            </Button>
            <Button 
              className={`${buttonBaseClass} ${sectionViewOption === 'no-padding' ? buttonActiveClass : ''}`}
              onClick={() => setSectionViewOption('no-padding')}
              title="No Padding"
              variant="ghost"
            >
              <Minimize2 size={16} />
            </Button>
          </div>
          <div className={`h-4 w-px mx-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="flex">
            <Button 
              className={`${buttonBaseClass} ${sectionFormat === 'markdown' ? buttonActiveClass : ''}`}
              onClick={() => setSectionFormat('markdown')}
              title="Markdown Format"
              variant="ghost"
            >
              <FileText size={16} />
            </Button>
            <Button 
              className={`${buttonBaseClass} ${sectionFormat === 'json' ? buttonActiveClass : ''}`}
              onClick={() => setSectionFormat('json')}
              title="JSON Format"
              variant="ghost"
            >
              <Code size={16} />
            </Button>
          </div>
        </>
      );
    } else if (promptType === 'advanced') {
      return (
        <>
          <div className="flex">
            <Button 
              className={`${buttonBaseClass} ${sectionViewOption === 'padding' ? buttonActiveClass : ''}`}
              onClick={() => setSectionViewOption('padding')}
              title="With Padding"
              variant="ghost"
            >
              <Maximize2 size={16} />
            </Button>
            <Button 
              className={`${buttonBaseClass} ${sectionViewOption === 'no-padding' ? buttonActiveClass : ''}`}
              onClick={() => setSectionViewOption('no-padding')}
              title="No Padding"
              variant="ghost"
            >
              <Minimize2 size={16} />
            </Button>
          </div>
          <div className={`h-4 w-px mx-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="flex">
            <Button className={buttonBaseClass} title="Zoom Out" variant="ghost">
              <Minus size={16} />
            </Button>
            <Button className={buttonBaseClass} title="Zoom In" variant="ghost">
              <Plus size={16} />
            </Button>
          </div>
        </>
      );
    }
    
    return null;
  };

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {renderViewOptions()}
    </div>
  );
};

export default ViewOptionsToolbar;