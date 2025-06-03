import React, { useState } from 'react';
import { Plus, Trash2, Edit, Move } from 'lucide-react';
import { useEditor } from '../../hooks/use-editor';
import { useTheme } from '../../context/ThemeContext';
import { Module } from '../../types/editorTypes';

const AdvancedPrompt: React.FC = () => {
  const { 
    kanbanBlocks, 
    addKanbanBlock, 
    updateKanbanBlock, 
    removeKanbanBlock,
    addModuleToBlock,
    removeModuleFromBlock,
    sectionViewOption,
    mode
  } = useEditor();
  const { theme } = useTheme();
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [blockNameInput, setBlockNameInput] = useState('');
  
  const isEditable = mode === 'editing' || mode === 'suggesting';
  
  const startEditingBlock = (id: string, currentName: string) => {
    setEditingBlockId(id);
    setBlockNameInput(currentName);
  };
  
  const saveBlockName = (id: string) => {
    updateKanbanBlock(id, { name: blockNameInput });
    setEditingBlockId(null);
  };
  
  const containerClass = "flex flex-col h-full";
  
  const kanbanContainerClass = "flex space-x-4 overflow-x-auto pb-4 min-h-[calc(100vh-250px)]";
  
  const blockClass = `w-80 flex-shrink-0 rounded-lg overflow-hidden flex flex-col ${
    theme === 'dark' 
      ? 'bg-gray-800 text-gray-100' 
      : 'bg-white text-gray-800'
  } ${sectionViewOption === 'padding' ? 'shadow-sm' : ''}`;
  
  const blockHeaderClass = `p-3 border-b flex items-center justify-between ${
    theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
  }`;
  
  const blockContentClass = "flex-1 p-2 overflow-y-auto";
  
  const moduleClass = `p-3 mb-2 rounded ${
    theme === 'dark' 
      ? 'bg-gray-700 hover:bg-gray-650' 
      : 'bg-gray-50 hover:bg-gray-100'
  } transition-colors duration-150`;
  
  const inputClass = `px-3 py-1.5 rounded-md outline-none transition-colors duration-150 ${
    theme === 'dark'
      ? 'bg-gray-700 text-gray-100 focus:ring-1 focus:ring-blue-500'
      : 'bg-gray-50 text-gray-800 focus:ring-1 focus:ring-blue-500'
  }`;
  
  const buttonClass = `p-1.5 rounded transition-colors duration-150 ${
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  }`;
  
  const addModuleButtonClass = `w-full mt-2 p-2 rounded text-center flex items-center justify-center ${
    theme === 'dark' 
      ? 'bg-gray-700 hover:bg-gray-650 text-gray-300' 
      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
  } transition-colors duration-150`;

  return (
    <div className={containerClass}>
      <div className={kanbanContainerClass}>
        {kanbanBlocks.map((block) => (
          <div key={block.id} className={blockClass}>
            <div className={blockHeaderClass}>
              {editingBlockId === block.id ? (
                <input
                  type="text"
                  className={inputClass}
                  value={blockNameInput}
                  onChange={(e) => setBlockNameInput(e.target.value)}
                  onBlur={() => saveBlockName(block.id)}
                  onKeyDown={(e) => e.key === 'Enter' && saveBlockName(block.id)}
                  autoFocus
                />
              ) : (
                <h3 className="font-medium">{block.name}</h3>
              )}
              
              {isEditable && (
                <div className="flex space-x-1">
                  <button 
                    className={buttonClass}
                    onClick={() => startEditingBlock(block.id, block.name)}
                    title="Edit Block Name"
                  >
                    <Edit size={14} />
                  </button>
                  
                  <button 
                    className={buttonClass}
                    onClick={() => removeKanbanBlock(block.id)}
                    title="Remove Block"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
            
            <div className={blockContentClass}>
              {block.modules.map((module) => (
                <div key={module.id} className={moduleClass}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{module.name}</h4>
                    
                    {isEditable && (
                      <div className="flex space-x-1">
                        <button 
                          className={buttonClass}
                          onClick={() => removeModuleFromBlock(block.id, module.id)}
                          title="Remove Module"
                        >
                          <Trash2 size={14} />
                        </button>
                        
                        <button 
                          className={buttonClass}
                          title="Move Module"
                        >
                          <Move size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm whitespace-pre-wrap">
                    {module.content || 'No content available.'}
                  </p>
                </div>
              ))}
              
              {isEditable && (
                <button 
                  className={addModuleButtonClass}
                  onClick={() => addModuleToBlock(block.id)}
                >
                  <Plus size={16} className="mr-1" />
                  Add Module
                </button>
              )}
            </div>
          </div>
        ))}
        
        {isEditable && (
          <button 
            className={`w-64 flex-shrink-0 rounded-lg border-2 border-dashed flex items-center justify-center ${
              theme === 'dark' 
                ? 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300' 
                : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600'
            } transition-colors duration-150`}
            onClick={addKanbanBlock}
          >
            <div className="flex flex-col items-center py-8">
              <Plus size={24} className="mb-2" />
              <span>Add New Block</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default AdvancedPrompt;