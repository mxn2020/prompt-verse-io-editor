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
  PanelLeftClose,
  PanelLeftOpen,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  PanelRightOpen,
  PanelRightClose
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useEditor } from '../../hooks/use-editor';
import { Button } from '../ui/button';

const Toolbar: React.FC = () => {
  const { theme } = useTheme();
  const {
    mode,
    toggleOuterSidebar,
    isOuterSidebarExpanded,
    toggleRightSidebar,
    isRightSidebarExpanded
  } = useEditor();

  // Don't show the toolbar in viewing mode
  if (mode === 'viewing') {
    return null;
  }

  const baseClasses = "h-10 px-4 flex items-center space-x-1 border-b overflow-x-auto";
  const themeClasses = theme === 'dark'
    ? "bg-gray-800 border-gray-700"
    : "bg-gray-50 border-gray-200";

  const buttonClass = `p-1.5 h-8 w-8 rounded transition-all duration-150 cursor-pointer ` + 
  `hover:shadow-sm ` +
  `hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`
  const dividerClass = `h-6 w-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`;

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {/* Left sidebar toggle */}
      <Button
        className={buttonClass + ' cursor-pointer'}
        onClick={toggleOuterSidebar}
        variant="ghost"
      >
        {isOuterSidebarExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
      </Button>

      <div className={dividerClass}></div>

      <Button className={buttonClass + ' cursor-pointer'} title="Heading 1" variant="ghost">
        <Heading1 />
      </Button>
      <Button className={buttonClass + ' cursor-pointer'} title="Heading 2" variant="ghost">
        <Heading2 />
      </Button>

      <div className={dividerClass}></div>

      <Button className={buttonClass + ' cursor-pointer'} title="Bold" variant="ghost">
        <Bold />
      </Button>
      <Button className={buttonClass + ' cursor-pointer'} title="Italic" variant="ghost">
        <Italic />
      </Button>
      <Button className={buttonClass + ' cursor-pointer'} title="Underline" variant="ghost">
        <Underline />
      </Button>

      <div className={dividerClass}></div>

      <Button className={buttonClass + ' cursor-pointer'} title="Align Left" variant="ghost">
        <AlignLeft />
      </Button>
      <Button className={buttonClass + ' cursor-pointer'} title="Align Center" variant="ghost">
        <AlignCenter />
      </Button>
      <Button className={buttonClass + ' cursor-pointer'} title="Align Right" variant="ghost">
        <AlignRight />
      </Button>

      <div className={dividerClass}></div>

      <Button className={buttonClass + ' cursor-pointer'} title="Bullet List" variant="ghost">
        <List />
      </Button>
      <Button className={buttonClass + ' cursor-pointer'} title="Numbered List" variant="ghost">
        <ListOrdered />
      </Button>

      <div className={dividerClass}></div>

      <Button className={buttonClass + ' cursor-pointer'} title="Insert Link" variant="ghost">
        <Link />
      </Button>
      <Button className={buttonClass + ' cursor-pointer'} title="Insert Image" variant="ghost">
        <Image />
      </Button>
      <Button className={buttonClass + ' cursor-pointer'} title="Insert Code" variant="ghost">
        <Code />
      </Button>

      {/* Right sidebar toggle, aligned to the far right */}
      <div className="flex-1" />
      <Button
        className={buttonClass + ' cursor-pointer'}
        onClick={toggleRightSidebar}
        variant="ghost"
        title={isRightSidebarExpanded ? 'Hide Right Sidebar' : 'Show Right Sidebar'}
      >
        {isRightSidebarExpanded ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
      </Button>
    </div>
  );
};

export default Toolbar;