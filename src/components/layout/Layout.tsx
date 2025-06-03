import React from 'react';
import Navbar from './Navbar';
import OuterSidebar from './OuterSidebar';
import InnerSidebar from './InnerSidebar';
import RightSidebar from './RightSidebar';
import Statusbar from './Statusbar';
import Toolbar from './Toolbar';
import ViewOptionsToolbar from './ViewOptionsToolbar';
import EditorArea from '../editor/EditorArea';
import { useEditor } from '../../context/EditorContext';
import { useTheme } from '../../context/ThemeContext';

const Layout: React.FC = () => {
  const { 
    isOuterSidebarExpanded, 
    isInnerSidebarExpanded,
    isRightSidebarExpanded,
    hoveredSidebarItem,
    activeSidebarItem
  } = useEditor();
  
  const { theme } = useTheme();

  const showFloatingInnerSidebar = hoveredSidebarItem && !isInnerSidebarExpanded && !activeSidebarItem;

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <Toolbar />
      
      <div className="flex flex-1 overflow-hidden">
        {isOuterSidebarExpanded && <OuterSidebar />}
        
        {/* Floating Inner Sidebar */}
        {showFloatingInnerSidebar && (
          <div className="absolute left-24 top-4 bottom-4 z-50">
            <InnerSidebar floating={true} />
          </div>
        )}
        
        {/* Fixed Inner Sidebar */}
        {isInnerSidebarExpanded && <InnerSidebar floating={false} />}
        
        <div className="flex-1 relative overflow-auto">
          <EditorArea />
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <ViewOptionsToolbar />
          </div>
        </div>
        
        {isRightSidebarExpanded && <RightSidebar />}
      </div>
      
      <Statusbar />
    </div>
  );
};

export default Layout;