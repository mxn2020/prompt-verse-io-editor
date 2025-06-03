import React from 'react';
import { Plus, Trash2, Edit, FileText } from 'lucide-react';
import { useEditor } from '../../hooks/useEditor';
import { useTheme } from '../../context/ThemeContext';

const ModulizedPrompt: React.FC = () => {
  const { 
    modules, 
    addModule, 
    updateModule, 
    removeModule, 
    moduleViewOption,
    mode
  } = useEditor();
  const { theme } = useTheme();
  
  const isEditable = mode === 'editing' || mode === 'suggesting';
  
  const containerClass = "max-w-6xl mx-auto";
  
  const gridContainerClass = `grid gap-4 ${
    moduleViewOption === 'grid' 
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
      : moduleViewOption === 'list' 
        ? 'grid-cols-1' 
        : 'grid-cols-1'
  }`;
  
  const moduleClass = `rounded-lg overflow-hidden transition-shadow duration-200 ${
    theme === 'dark' 
      ? 'bg-gray-800 text-gray-100 hover:shadow-lg hover:shadow-gray-800/20' 
      : 'bg-white text-gray-800 hover:shadow-lg hover:shadow-gray-300/50'
  } border ${
    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
  }`;
  
  const moduleHeaderClass = `flex items-center justify-between p-4 border-b ${
    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
  }`;
  
  const moduleContentClass = `p-4 ${
    moduleViewOption === 'list' ? 'max-h-40' : 'max-h-60'
  } overflow-y-auto`;
  
  const textareaClass = `w-full min-h-[100px] p-3 rounded-md resize-none outline-none transition-colors duration-150 ${
    theme === 'dark'
      ? 'bg-gray-700 text-gray-100 focus:ring-1 focus:ring-blue-500'
      : 'bg-gray-50 text-gray-800 focus:ring-1 focus:ring-blue-500'
  }`;
  
  const inputClass = `px-3 py-1.5 rounded-md outline-none transition-colors duration-150 ${
    theme === 'dark'
      ? 'bg-gray-700 text-gray-100 focus:ring-1 focus:ring-blue-500'
      : 'bg-gray-50 text-gray-800 focus:ring-1 focus:ring-blue-500'
  }`;
  
  const buttonClass = `p-1.5 rounded transition-colors duration-150 ${
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  }`;
  
  // Apply snake layout for 'snake' view option
  const getSnakeLayout = () => {
    if (moduleViewOption !== 'snake' || modules.length <= 1) {
      return null;
    }
    
    const rows = [];
    let currentRow = [];
    let direction = 'right'; // start going right
    
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      currentRow.push(module);
      
      // When we have 3 modules in a row, or we've reached the end
      if (currentRow.length === 3 || i === modules.length - 1) {
        // If direction is left, reverse the row for display
        const rowToAdd = direction === 'left' ? [...currentRow].reverse() : currentRow;
        rows.push(rowToAdd);
        
        // Toggle direction for next row
        direction = direction === 'right' ? 'left' : 'right';
        currentRow = [];
      }
    }
    
    return (
      <div className="space-y-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {row.map(module => (
              <div key={module.id} className={moduleClass}>
                <div className={moduleHeaderClass}>
                  {isEditable ? (
                    <input
                      type="text"
                      className={inputClass}
                      value={module.name}
                      onChange={(e) => updateModule(module.id, { name: e.target.value })}
                      placeholder="Module Name"
                    />
                  ) : (
                    <h3 className="font-medium flex items-center">
                      <FileText size={16} className="mr-2" />
                      {module.name}
                    </h3>
                  )}
                  
                  {isEditable && (
                    <div className="flex space-x-1">
                      <button 
                        className={buttonClass}
                        onClick={() => removeModule(module.id)}
                        title="Remove Module"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={moduleContentClass}>
                  {isEditable ? (
                    <textarea
                      className={textareaClass}
                      value={module.content}
                      onChange={(e) => updateModule(module.id, { content: e.target.value })}
                      placeholder="Module content..."
                    />
                  ) : (
                    <div className="whitespace-pre-wrap">
                      {module.content || 'No content available.'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={containerClass}>
      {moduleViewOption === 'snake' ? (
        getSnakeLayout()
      ) : (
        <div className={gridContainerClass}>
          {modules.map(module => (
            <div key={module.id} className={moduleClass}>
              <div className={moduleHeaderClass}>
                {isEditable ? (
                  <input
                    type="text"
                    className={inputClass}
                    value={module.name}
                    onChange={(e) => updateModule(module.id, { name: e.target.value })}
                    placeholder="Module Name"
                  />
                ) : (
                  <h3 className="font-medium flex items-center">
                    <FileText size={16} className="mr-2" />
                    {module.name}
                  </h3>
                )}
                
                {isEditable && (
                  <div className="flex space-x-1">
                    <button 
                      className={buttonClass}
                      onClick={() => removeModule(module.id)}
                      title="Remove Module"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className={moduleContentClass}>
                {isEditable ? (
                  <textarea
                    className={textareaClass}
                    value={module.content}
                    onChange={(e) => updateModule(module.id, { content: e.target.value })}
                    placeholder="Module content..."
                  />
                ) : (
                  <div className="whitespace-pre-wrap">
                    {module.content || 'No content available.'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isEditable && (
        <button 
          className={`mt-6 px-4 py-2 rounded-lg flex items-center justify-center ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
              : 'bg-white hover:bg-gray-100 text-gray-700'
          } border ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          } transition-colors duration-150`}
          onClick={addModule}
        >
          <Plus size={16} className="mr-2" />
          Add New Module
        </button>
      )}
    </div>
  );
};

export default ModulizedPrompt;