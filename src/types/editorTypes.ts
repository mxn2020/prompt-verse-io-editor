export type EditorMode = 'editing' | 'viewing' | 'commenting' | 'suggesting';
export type PromptType = 'standard' | 'structured' | 'modulized' | 'advanced';
export type DocumentStatus = 'saved' | 'saving' | 'unsaved';
export type PrivacyStatus = 'private' | 'public' | 'shared';
export type ViewOption = 'grid' | 'list' | 'snake';
export type SectionViewOption = 'padding' | 'no-padding';
export type SectionFormat = 'markdown' | 'json' | 'yaml' | 'xml';

// Define sidebar items for each prompt type
export type StandardSidebarItem = 'files' | 'templates' | 'history' | 'settings' | 'help' | null;
export type StructuredSidebarItem = 'sections' | 'templates' | 'preview' | 'settings' | 'help' | null;
export type ModulizedSidebarItem = 'modules' | 'templates' | 'schema' | 'settings' | 'help' | null;
export type AdvancedSidebarItem = 'templates' | 'library' | 'modules' | 'blocks' | 'wrappers' | 'help' | null;

export type SidebarItem = StandardSidebarItem | StructuredSidebarItem | ModulizedSidebarItem | AdvancedSidebarItem;

export interface Section {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
}

export interface Module {
  id: string;
  name: string;
  content: string;
}

export interface KanbanBlock {
  id: string;
  name: string;
  modules: Module[];
}

export interface EditorContextType {
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