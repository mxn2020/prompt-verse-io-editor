import React from 'react';
import { useEditor } from '../../hooks/useEditor';
import StandardPrompt from './StandardPrompt';
import StructuredPrompt from './StructuredPrompt';
import ModulizedPrompt from './ModulizedPrompt';
import AdvancedPrompt from './AdvancedPrompt';
import { useTheme } from '../../context/ThemeContext';

const EditorArea: React.FC = () => {
  const { promptType, mode } = useEditor();
  const { theme } = useTheme();
  
  const baseClasses = "h-full w-full overflow-auto p-4";
  const themeClasses = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  
  // Render different editor types based on the prompt type
  const renderEditor = () => {
    switch (promptType) {
      case 'standard':
        return <StandardPrompt />;
      case 'structured':
        return <StructuredPrompt />;
      case 'modulized':
        return <ModulizedPrompt />;
      case 'advanced':
        return <AdvancedPrompt />;
      default:
        return <StandardPrompt />;
    }
  };

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {renderEditor()}
    </div>
  );
};

export default EditorArea;