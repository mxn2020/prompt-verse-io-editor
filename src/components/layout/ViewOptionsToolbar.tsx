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
import { useEditor } from '../../context/EditorContext';

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
    
  const buttonBaseClass = `p-1.5 rounded transition-colors duration-150 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`;
  const buttonActiveClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  
  const renderViewOptions = () => {
    if (promptType === 'modulized') {
      return (
        <>
          <div className="flex">
            <button 
              className={`${buttonBaseClass} ${moduleViewOption === 'grid' ? buttonActiveClass : ''}`}
              onClick={() => setModuleViewOption('grid')}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button 
              className={`${buttonBaseClass} ${moduleViewOption === 'list' ? buttonActiveClass : ''}`}
              onClick={() => setModuleViewOption('list')}
              title="List View"
            >
              <List size={16} />
            </button>
            <button 
              className={`${buttonBaseClass} ${moduleViewOption === 'snake' ? buttonActiveClass : ''}`}
              onClick={() => setModuleViewOption('snake')}
              title="Snake View"
            >
              <LayoutTemplate size={16} />
            </button>
          </div>
          <div className={`h-4 w-px mx-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="flex">
            <button className={buttonBaseClass} title="Zoom Out">
              <Minus size={16} />
            </button>
            <button className={buttonBaseClass} title="Zoom In">
              <Plus size={16} />
            </button>
          </div>
        </>
      );
    } else if (promptType === 'structured') {
      return (
        <>
          <div className="flex">
            <button 
              className={`${buttonBaseClass} ${sectionViewOption === 'padding' ? buttonActiveClass : ''}`}
              onClick={() => setSectionViewOption('padding')}
              title="With Padding"
            >
              <Maximize2 size={16} />
            </button>
            <button 
              className={`${buttonBaseClass} ${sectionViewOption === 'no-padding' ? buttonActiveClass : ''}`}
              onClick={() => setSectionViewOption('no-padding')}
              title="No Padding"
            >
              <Minimize2 size={16} />
            </button>
          </div>
          <div className={`h-4 w-px mx-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="flex">
            <button 
              className={`${buttonBaseClass} ${sectionFormat === 'markdown' ? buttonActiveClass : ''}`}
              onClick={() => setSectionFormat('markdown')}
              title="Markdown Format"
            >
              <FileText size={16} />
            </button>
            <button 
              className={`${buttonBaseClass} ${sectionFormat === 'json' ? buttonActiveClass : ''}`}
              onClick={() => setSectionFormat('json')}
              title="JSON Format"
            >
              <Code size={16} />
            </button>
          </div>
        </>
      );
    } else if (promptType === 'advanced') {
      return (
        <>
          <div className="flex">
            <button 
              className={`${buttonBaseClass} ${sectionViewOption === 'padding' ? buttonActiveClass : ''}`}
              onClick={() => setSectionViewOption('padding')}
              title="With Padding"
            >
              <Maximize2 size={16} />
            </button>
            <button 
              className={`${buttonBaseClass} ${sectionViewOption === 'no-padding' ? buttonActiveClass : ''}`}
              onClick={() => setSectionViewOption('no-padding')}
              title="No Padding"
            >
              <Minimize2 size={16} />
            </button>
          </div>
          <div className={`h-4 w-px mx-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <div className="flex">
            <button className={buttonBaseClass} title="Zoom Out">
              <Minus size={16} />
            </button>
            <button className={buttonBaseClass} title="Zoom In">
              <Plus size={16} />
            </button>
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