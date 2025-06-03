import { createContext } from 'react';
import type { EditorContextType } from '../types/editorTypes';

export const EditorContext = createContext<EditorContextType | undefined>(undefined);
