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