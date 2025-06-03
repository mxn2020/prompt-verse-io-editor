import { useContext } from 'react';
import { EditorContext } from '../context/EditorContextDefinition';
import type { EditorContextType } from '../types/editorTypes';

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
