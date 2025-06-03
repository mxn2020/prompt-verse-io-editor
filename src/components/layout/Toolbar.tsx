import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Code, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Heading1, 
  Heading2 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useEditor } from '../../context/EditorContext';

const Toolbar: React.FC = () => {
  const { theme } = useTheme();
  const { mode } = useEditor();
  
  // Don't show the toolbar in viewing mode
  if (mode === 'viewing') {
    return null;
  }
  
  const baseClasses = "h-10 px-4 flex items-center space-x-1 border-b overflow-x-auto";
  const themeClasses = theme === 'dark' 
    ? "bg-gray-800 border-gray-700" 
    : "bg-gray-50 border-gray-200";
    
  const buttonClass = `p-1.5 rounded hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} transition-colors duration-150`;
  const dividerClass = `h-6 w-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`;

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      <button className={buttonClass} title="Heading 1">
        <Heading1 size={18} />
      </button>
      <button className={buttonClass} title="Heading 2">
        <Heading2 size={18} />
      </button>
      
      <div className={dividerClass}></div>
      
      <button className={buttonClass} title="Bold">
        <Bold size={18} />
      </button>
      <button className={buttonClass} title="Italic">
        <Italic size={18} />
      </button>
      <button className={buttonClass} title="Underline">
        <Underline size={18} />
      </button>
      
      <div className={dividerClass}></div>
      
      <button className={buttonClass} title="Align Left">
        <AlignLeft size={18} />
      </button>
      <button className={buttonClass} title="Align Center">
        <AlignCenter size={18} />
      </button>
      <button className={buttonClass} title="Align Right">
        <AlignRight size={18} />
      </button>
      
      <div className={dividerClass}></div>
      
      <button className={buttonClass} title="Bullet List">
        <List size={18} />
      </button>
      <button className={buttonClass} title="Numbered List">
        <ListOrdered size={18} />
      </button>
      
      <div className={dividerClass}></div>
      
      <button className={buttonClass} title="Insert Link">
        <Link size={18} />
      </button>
      <button className={buttonClass} title="Insert Image">
        <Image size={18} />
      </button>
      <button className={buttonClass} title="Insert Code">
        <Code size={18} />
      </button>
    </div>
  );
};

export default Toolbar;