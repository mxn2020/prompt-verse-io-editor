import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import EditorProvider from './context/EditorContext';

function App() {
  return (
    <ThemeProvider>
      <EditorProvider>
        <Layout />
      </EditorProvider>
    </ThemeProvider>
  );
}

export default App;