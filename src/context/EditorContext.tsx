import React, { useState, ReactNode, useRef } from 'react';
import { EditorContext } from './EditorContextDefinition';
import { 
  Section, 
  Module, 
  KanbanBlock, 
  EditorMode,
  PromptType,
  DocumentStatus,
  PrivacyStatus,
  SidebarItem,
  SectionViewOption,
  SectionFormat,
  ViewOption
} from '../types/editorTypes';

interface EditorProviderProps {
  children: ReactNode;
}

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<EditorMode>('editing');
  const [promptType, setPromptType] = useState<PromptType>('standard');
  const [documentName, setDocumentName] = useState<string>('Untitled Prompt');
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>('saved');
  const [privacyStatus, setPrivacyStatus] = useState<PrivacyStatus>('private');
  const [isOuterSidebarExpanded, setIsOuterSidebarExpanded] = useState<boolean>(true);
  const [isInnerSidebarExpanded, setIsInnerSidebarExpanded] = useState<boolean>(false);
  const [isRightSidebarExpanded, setIsRightSidebarExpanded] = useState<boolean>(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState<SidebarItem>(null);
  const [hoveredSidebarItem, setHoveredSidebarItem] = useState<SidebarItem>(null);
  const [standardPromptContent, setStandardPromptContent] = useState<string>('');
  const hideTimeoutRef = useRef<number | null>(null);

  const setHoveredSidebarItemWithDelay = (item: SidebarItem | null, immediate: boolean = false) => {
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (item || immediate) {
      setHoveredSidebarItem(item);
    } else {
      hideTimeoutRef.current = window.setTimeout(() => {
        setHoveredSidebarItem(null);
      }, 500);
    }
  };

  const [sections, setSections] = useState<Section[]>([
    { id: '1', title: 'Introduction', content: '', parentId: null }
  ]);
  const [sectionViewOption, setSectionViewOption] = useState<SectionViewOption>('padding');
  const [sectionFormat, setSectionFormat] = useState<SectionFormat>('markdown');
  const [modules, setModules] = useState<Module[]>([
    { id: '1', name: 'System Instructions', content: '' },
    { id: '2', name: 'User Persona', content: '' }
  ]);
  const [moduleViewOption, setModuleViewOption] = useState<ViewOption>('grid');
  const [kanbanBlocks, setKanbanBlocks] = useState<KanbanBlock[]>([
    { id: '1', name: 'System', modules: [] },
    { id: '2', name: 'User', modules: [] },
    { id: '3', name: 'Response', modules: [] }
  ]);

  const toggleOuterSidebar = () => {
    setIsOuterSidebarExpanded(prev => !prev);
    if (!isOuterSidebarExpanded) {
      setActiveSidebarItem(null);
      setIsInnerSidebarExpanded(false);
    }
  };

const toggleInnerSidebar = () => {
  setIsInnerSidebarExpanded(prev => {
    const newValue = !prev;
    // If we're closing the sidebar, clear the active item
    if (!newValue) {
      setActiveSidebarItem(null);
    }
    return newValue;
  });
};

  const toggleRightSidebar = () => {
    setIsRightSidebarExpanded(prev => !prev);
  };

  const addSection = (parentId?: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      parentId: parentId || null
    };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (id: string, data: Partial<Section>) => {
    setSections(prev =>
      prev.map(section => (section.id === id ? { ...section, ...data } : section))
    );
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
  };

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      name: 'New Module',
      content: ''
    };
    setModules(prev => [...prev, newModule]);
  };

  const updateModule = (id: string, data: Partial<Module>) => {
    setModules(prev =>
      prev.map(module => (module.id === id ? { ...module, ...data } : module))
    );
  };

  const removeModule = (id: string) => {
    setModules(prev => prev.filter(module => module.id !== id));
  };

  const addKanbanBlock = () => {
    const newBlock: KanbanBlock = {
      id: Date.now().toString(),
      name: 'New Block',
      modules: []
    };
    setKanbanBlocks(prev => [...prev, newBlock]);
  };

  const updateKanbanBlock = (id: string, data: Partial<KanbanBlock>) => {
    setKanbanBlocks(prev =>
      prev.map(block => (block.id === id ? { ...block, ...data } : block))
    );
  };

  const removeKanbanBlock = (id: string) => {
    setKanbanBlocks(prev => prev.filter(block => block.id !== id));
  };

  const addModuleToBlock = (blockId: string) => {
    const moduleId = Date.now().toString();
    const newModule = { id: moduleId, name: 'New Module', content: '' };
    
    setKanbanBlocks(prev =>
      prev.map(block => 
        block.id === blockId 
          ? { ...block, modules: [...block.modules, newModule] } 
          : block
      )
    );
  };

  const removeModuleFromBlock = (blockId: string, moduleId: string) => {
    setKanbanBlocks(prev =>
      prev.map(block => 
        block.id === blockId 
          ? { ...block, modules: block.modules.filter(m => m.id !== moduleId) } 
          : block
      )
    );
  };

  const getSidebarItems = () => {
    // This is a placeholder implementation - you may want to customize this based on your needs
    return [
      { icon: null, label: 'Files' },
      { icon: null, label: 'Templates' },
      { icon: null, label: 'Settings' }
    ];
  };

  return (
    <EditorContext.Provider
      value={{
        mode,
        setMode,
        promptType,
        setPromptType,
        documentName,
        setDocumentName,
        documentStatus,
        setDocumentStatus,
        privacyStatus,
        setPrivacyStatus,
        isOuterSidebarExpanded,
        toggleOuterSidebar,
        isInnerSidebarExpanded,
        toggleInnerSidebar,
        isRightSidebarExpanded,
        toggleRightSidebar,
        activeSidebarItem,
        setActiveSidebarItem,
        hoveredSidebarItem,
        setHoveredSidebarItem: setHoveredSidebarItemWithDelay,
        standardPromptContent,
        setStandardPromptContent,
        sections,
        addSection,
        updateSection,
        removeSection,
        sectionViewOption,
        setSectionViewOption,
        sectionFormat,
        setSectionFormat,
        modules,
        addModule,
        updateModule,
        removeModule,
        moduleViewOption,
        setModuleViewOption,
        kanbanBlocks,
        addKanbanBlock,
        updateKanbanBlock,
        removeKanbanBlock,
        addModuleToBlock,
        removeModuleFromBlock,
        getSidebarItems
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;