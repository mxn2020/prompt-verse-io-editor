import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { Section, Module, KanbanBlock } from '../types/editorTypes';

type EditorMode = 'editing' | 'viewing' | 'commenting' | 'suggesting';
type PromptType = 'standard' | 'structured' | 'modulized' | 'advanced';
type DocumentStatus = 'saved' | 'saving' | 'unsaved';
type PrivacyStatus = 'private' | 'public' | 'shared';
type ViewOption = 'grid' | 'list' | 'snake';
type SectionViewOption = 'padding' | 'no-padding';
type SectionFormat = 'markdown' | 'json' | 'yaml' | 'xml';

// Define sidebar items for each prompt type
type StandardSidebarItem = 'files' | 'templates' | 'history' | 'settings' | 'help' | null;
type StructuredSidebarItem = 'sections' | 'templates' | 'preview' | 'settings' | 'help' | null;
type ModulizedSidebarItem = 'modules' | 'templates' | 'schema' | 'settings' | 'help' | null;
type AdvancedSidebarItem = 'templates' | 'library' | 'modules' | 'blocks' | 'wrappers' | 'help' | null;

type SidebarItem = StandardSidebarItem | StructuredSidebarItem | ModulizedSidebarItem | AdvancedSidebarItem;

interface EditorContextType {
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;
  promptType: PromptType;
  setPromptType: (type: PromptType) => void;
  documentName: string;
  setDocumentName: (name: string) => void;
  documentStatus: DocumentStatus;
  setDocumentStatus: (status: DocumentStatus) => void;
  privacyStatus: PrivacyStatus;
  setPrivacyStatus: (status: PrivacyStatus) => void;
  isOuterSidebarExpanded: boolean;
  toggleOuterSidebar: () => void;
  isInnerSidebarExpanded: boolean;
  toggleInnerSidebar: () => void;
  isRightSidebarExpanded: boolean;
  toggleRightSidebar: () => void;
  activeSidebarItem: SidebarItem;
  setActiveSidebarItem: (item: SidebarItem) => void;
  hoveredSidebarItem: SidebarItem;
  setHoveredSidebarItem: (item: SidebarItem | null, immediate?: boolean) => void;
  standardPromptContent: string;
  setStandardPromptContent: (content: string) => void;
  sections: Section[];
  addSection: (parentId?: string) => void;
  updateSection: (id: string, data: Partial<Section>) => void;
  removeSection: (id: string) => void;
  sectionViewOption: SectionViewOption;
  setSectionViewOption: (option: SectionViewOption) => void;
  sectionFormat: SectionFormat;
  setSectionFormat: (format: SectionFormat) => void;
  modules: Module[];
  addModule: () => void;
  updateModule: (id: string, data: Partial<Module>) => void;
  removeModule: (id: string) => void;
  moduleViewOption: ViewOption;
  setModuleViewOption: (option: ViewOption) => void;
  kanbanBlocks: KanbanBlock[];
  addKanbanBlock: () => void;
  updateKanbanBlock: (id: string, data: Partial<KanbanBlock>) => void;
  removeKanbanBlock: (id: string) => void;
  addModuleToBlock: (blockId: string) => void;
  removeModuleFromBlock: (blockId: string, moduleId: string) => void;
  getSidebarItems: () => { icon: any; label: string }[];
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

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
    setIsInnerSidebarExpanded(prev => !prev);
    if (!isInnerSidebarExpanded) {
      setActiveSidebarItem(null);
    }
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
        removeModuleFromBlock
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;