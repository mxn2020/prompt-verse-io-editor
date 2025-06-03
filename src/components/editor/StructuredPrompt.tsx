import React, { useState } from 'react';
import { Plus, Trash2, ChevronRight, ChevronDown, Grip } from 'lucide-react';
import { useEditor } from '../../hooks/useEditor';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../../types/editorTypes';

const StructuredPrompt: React.FC = () => {
  const { 
    sections, 
    addSection, 
    updateSection, 
    removeSection, 
    sectionViewOption,
    sectionFormat,
    mode
  } = useEditor();
  const { theme } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const isEditable = mode === 'editing' || mode === 'suggesting';
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  const formatText = (text: string, format: string) => {
    if (!text) return '';
    
    switch (format) {
      case 'json':
        try {
          // This is just for display purposes
          return `{\n  "content": "${text.replace(/"/g, '\\"')}"\n}`;
        } catch {
          return text;
        }
      case 'yaml':
        return `content: |\n  ${text.split('\n').join('\n  ')}`;
      case 'xml':
        return `<content>\n  ${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}\n</content>`;
      case 'markdown':
      default:
        return text;
    }
  };
  
  const getFormatIcon = () => {
    switch (sectionFormat) {
      case 'json':
        return '{ }';
      case 'yaml':
        return 'YAML';
      case 'xml':
        return '<>';
      case 'markdown':
      default:
        return 'MD';
    }
  };
  
  const containerClass = "max-w-4xl mx-auto";
  
  const sectionContainerClass = `mb-${sectionViewOption === 'padding' ? '6' : '1'} rounded-lg ${
    theme === 'dark' 
      ? 'bg-gray-800 text-gray-100' 
      : 'bg-white text-gray-800'
  } ${sectionViewOption === 'padding' ? 'shadow-sm' : ''}`;
  
  const sectionHeaderClass = `flex items-center p-4 border-b ${
    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
  }`;
  
  const sectionContentClass = `p-4 ${
    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  }`;
  
  const formatBadgeClass = `px-2 py-1 text-xs rounded-full ${
    theme === 'dark' 
      ? 'bg-gray-700 text-gray-300' 
      : 'bg-gray-200 text-gray-700'
  }`;
  
  const buttonClass = `p-1.5 rounded transition-colors duration-150 ${
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  }`;
  
  const textareaClass = `w-full min-h-[100px] p-3 rounded-md resize-none outline-none transition-colors duration-150 ${
    theme === 'dark'
      ? 'bg-gray-700 text-gray-100 focus:ring-1 focus:ring-blue-500'
      : 'bg-gray-50 text-gray-800 focus:ring-1 focus:ring-blue-500'
  }`;
  
  const inputClass = `w-full px-3 py-1.5 rounded-md outline-none transition-colors duration-150 ${
    theme === 'dark'
      ? 'bg-gray-700 text-gray-100 focus:ring-1 focus:ring-blue-500'
      : 'bg-gray-50 text-gray-800 focus:ring-1 focus:ring-blue-500'
  }`;

  // Filter top-level sections (those with no parent)
  const topLevelSections = sections.filter(section => section.parentId === null);
  
  // Get child sections for a parent
  const getChildSections = (parentId: string) => {
    return sections.filter(section => section.parentId === parentId);
  };
  
  // Render a section and its children recursively
  const renderSection = (section: Section) => {
    const isExpanded = expandedSections[section.id] !== false; // Default to expanded
    const childSections = getChildSections(section.id);
    
    return (
      <div key={section.id} className={sectionContainerClass}>
        <div className={sectionHeaderClass}>
          <div className="cursor-move mr-2 text-gray-400">
            <Grip size={16} />
          </div>
          
          <button 
            className="mr-2"
            onClick={() => toggleSection(section.id)}
          >
            {childSections.length > 0 ? (
              isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : (
              <div className="w-4"></div>
            )}
          </button>
          
          {isEditable ? (
            <input
              type="text"
              className={inputClass}
              value={section.title}
              onChange={(e) => updateSection(section.id, { title: e.target.value })}
              placeholder="Section Title"
            />
          ) : (
            <h3 className="flex-1 font-medium">{section.title}</h3>
          )}
          
          <span className={formatBadgeClass + " mr-2"}>
            {getFormatIcon()}
          </span>
          
          {isEditable && (
            <div className="flex space-x-1">
              <button 
                className={buttonClass}
                onClick={() => addSection(section.id)}
                title="Add Subsection"
              >
                <Plus size={16} />
              </button>
              
              <button 
                className={buttonClass}
                onClick={() => removeSection(section.id)}
                title="Remove Section"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
        
        <div className={sectionContentClass}>
          {isEditable ? (
            <textarea
              className={textareaClass}
              value={section.content}
              onChange={(e) => updateSection(section.id, { content: e.target.value })}
              placeholder="Section content..."
            />
          ) : (
            <div className="whitespace-pre-wrap">
              {formatText(section.content, sectionFormat)}
            </div>
          )}
        </div>
        
        {isExpanded && childSections.length > 0 && (
          <div className="pl-8 pr-2 pb-4">
            {childSections.map(childSection => renderSection(childSection))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={containerClass}>
      {topLevelSections.map(section => renderSection(section))}
      
      {isEditable && (
        <button 
          className={`mt-4 px-4 py-2 rounded-lg flex items-center justify-center w-full ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
              : 'bg-white hover:bg-gray-100 text-gray-700'
          } border ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          } transition-colors duration-150`}
          onClick={() => addSection()}
        >
          <Plus size={16} className="mr-2" />
          Add New Section
        </button>
      )}
    </div>
  );
};

export default StructuredPrompt;