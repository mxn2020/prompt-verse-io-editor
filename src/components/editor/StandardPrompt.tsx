import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { useTheme } from '../../context/ThemeContext';

const StandardPrompt: React.FC = () => {
  const { standardPromptContent, setStandardPromptContent, mode } = useEditor();
  const { theme } = useTheme();
  
  const isEditable = mode === 'editing' || mode === 'suggesting';
  
  const containerClass = `max-w-4xl mx-auto p-8 rounded-lg shadow-sm ${
    theme === 'dark' 
      ? 'bg-gray-800 text-gray-100' 
      : 'bg-white text-gray-800'
  }`;
  
  const textareaClass = `w-full min-h-[calc(100vh-300px)] p-4 rounded-md resize-none outline-none transition-colors duration-150 ${
    theme === 'dark'
      ? 'bg-gray-800 text-gray-100 focus:ring-1 focus:ring-blue-500'
      : 'bg-white text-gray-800 focus:ring-1 focus:ring-blue-500'
  }`;

  return (
    <div className={containerClass}>
      {isEditable ? (
        <textarea
          className={textareaClass}
          value={standardPromptContent}
          onChange={(e) => setStandardPromptContent(e.target.value)}
          placeholder="Start typing your prompt content here..."
          spellCheck
        />
      ) : (
        <div className={`${textareaClass} whitespace-pre-wrap overflow-auto`}>
          {standardPromptContent || 
           'This is a standard prompt. You can edit this content when in editing mode.'}
        </div>
      )}
    </div>
  );
};

export default StandardPrompt;