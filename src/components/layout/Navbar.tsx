import React, { useState } from 'react';
import {
  ChevronDown,
  Edit3,
  Eye,
  MessageSquare,
  FileEdit,
  Save,
  Lock,
  Globe,
  Users,
  Share2,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  FileText,
  Layout,
  Puzzle,
  Boxes,
  Columns,
  Maximize2,
  Split,
  Focus
} from 'lucide-react';
import { useEditor } from '../../hooks/use-editor';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Navbar: React.FC = () => {
  const {
    mode,
    setMode,
    layoutMode,
    setLayoutMode,
    promptType,
    setPromptType,
    documentName,
    setDocumentName,
    documentStatus,
    privacyStatus,
    setPrivacyStatus,
    toggleOuterSidebar,
    isOuterSidebarExpanded
  } = useEditor();

  const { theme } = useTheme();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(documentName);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showPromptTypeDropdown, setShowPromptTypeDropdown] = useState(false);
  const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);

  const handleNameSubmit = () => {
    setDocumentName(nameInput);
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'editing':
        return <Edit3 size={18} />;
      case 'viewing':
        return <Eye size={18} />;
      case 'commenting':
        return <MessageSquare size={18} />;
      case 'suggesting':
        return <FileEdit size={18} />;
      default:
        return <Edit3 size={18} />;
    }
  };

  const getPromptTypeIcon = () => {
    switch (promptType) {
      case 'standard':
        return <FileText size={18} />;
      case 'structured':
        return <Layout size={18} />;
      case 'modulized':
        return <Puzzle size={18} />;
      case 'advanced':
        return <Boxes size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getLayoutIcon = () => {
    switch (layoutMode) {
      case 'canvas':
        return <Columns size={18} />;
      case 'document':
        return <FileText size={18} />;
      case 'focus':
        return <Focus size={18} />;
      case 'split':
        return <Split size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getPrivacyIcon = () => {
    switch (privacyStatus) {
      case 'private':
        return <Lock size={18} />;
      case 'public':
        return <Globe size={18} />;
      case 'shared':
        return <Users size={18} />;
      default:
        return <Lock size={18} />;
    }
  };

  const getStatusIndicator = () => {
    switch (documentStatus) {
      case 'saved':
        return <span className="text-green-500 flex items-center gap-1"><Save size={16} /> Saved</span>;
      case 'saving':
        return <span className="text-yellow-500 flex items-center gap-1"><Save size={16} /> Saving...</span>;
      case 'unsaved':
        return <span className="text-red-500 flex items-center gap-1"><Save size={16} /> Unsaved</span>;
      default:
        return <span className="text-green-500 flex items-center gap-1"><Save size={16} /> Saved</span>;
    }
  };

  const baseClasses = "h-14 px-4 flex items-center justify-between border-b";
  const themeClasses = theme === 'dark'
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  return (
    <nav className={`${baseClasses} ${themeClasses}`}>
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <Button
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:shadow-sm transition-all duration-150"
          onClick={toggleOuterSidebar}
          variant="ghost"
        >
          {isOuterSidebarExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </Button>

        {/* Mode Dropdown */}
        <div className="relative">
          <Button
            className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:shadow-sm transition-all duration-150"
            onClick={() => setShowModeDropdown(!showModeDropdown)}
            variant="ghost"
          >
            {getModeIcon()}
            <span className="capitalize">{mode}</span>
            <ChevronDown size={16} />
          </Button>

          {showModeDropdown && (
            <div className={`absolute top-full left-0 mt-1 w-40 rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <ul>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${mode === 'editing' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setMode('editing'); setShowModeDropdown(false); }}
                >
                  <Edit3 size={16} />
                  <span>Editing</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${mode === 'viewing' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setMode('viewing'); setShowModeDropdown(false); }}
                >
                  <Eye size={16} />
                  <span>Viewing</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${mode === 'commenting' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setMode('commenting'); setShowModeDropdown(false); }}
                >
                  <MessageSquare size={16} />
                  <span>Commenting</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${mode === 'suggesting' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setMode('suggesting'); setShowModeDropdown(false); }}
                >
                  <FileEdit size={16} />
                  <span>Suggesting</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Prompt Type Dropdown */}
        <div className="relative">
          <Button
            className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:shadow-sm transition-all duration-150"
            onClick={() => setShowPromptTypeDropdown(!showPromptTypeDropdown)}
            variant="ghost"
          >
            {getPromptTypeIcon()}
            <span className="capitalize">{promptType}</span>
            <ChevronDown size={16} />
          </Button>

          {showPromptTypeDropdown && (
            <div className={`absolute top-full left-0 mt-1 w-40 rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <ul>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${promptType === 'standard' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setPromptType('standard'); setShowPromptTypeDropdown(false); }}
                >
                  <FileText size={16} />
                  <span>Standard</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${promptType === 'structured' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setPromptType('structured'); setShowPromptTypeDropdown(false); }}
                >
                  <Layout size={16} />
                  <span>Structured</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${promptType === 'modulized' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setPromptType('modulized'); setShowPromptTypeDropdown(false); }}
                >
                  <Puzzle size={16} />
                  <span>Modulized</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${promptType === 'advanced' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setPromptType('advanced'); setShowPromptTypeDropdown(false); }}
                >
                  <Boxes size={16} />
                  <span>Advanced</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Layout Mode Dropdown */}
        <div className="relative">
          <Button
            className="flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:shadow-sm transition-all duration-150"
            onClick={() => setShowLayoutDropdown(!showLayoutDropdown)}
            variant="ghost"
          >
            {getLayoutIcon()}
            <span className="capitalize">{layoutMode}</span>
            <ChevronDown size={16} />
          </Button>

          {showLayoutDropdown && (
            <div className={`absolute top-full left-0 mt-1 w-40 rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <ul>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${layoutMode === 'canvas' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setLayoutMode('canvas'); setShowLayoutDropdown(false); }}
                >
                  <Columns size={16} />
                  <span>Canvas</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${layoutMode === 'document' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setLayoutMode('document'); setShowLayoutDropdown(false); }}
                >
                  <FileText size={16} />
                  <span>Document</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${layoutMode === 'focus' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setLayoutMode('focus'); setShowLayoutDropdown(false); }}
                >
                  <Focus size={16} />
                  <span>Focus</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${layoutMode === 'split' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setLayoutMode('split'); setShowLayoutDropdown(false); }}
                >
                  <Split size={16} />
                  <span>Split</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex items-center space-x-4">
        {isEditingName ? (
          <div className="flex items-center space-x-1">
            <Input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyDown}
              className={`px-2 py-1 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
              autoFocus
            />
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <h1 className="text-lg font-medium">{documentName}</h1>
            <Button
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:shadow-sm transition-all duration-150"
              onClick={() => setIsEditingName(true)}
              variant="ghost"
            >
              <Edit3 size={14} />
            </Button>
          </div>
        )}

        <div className="text-sm">
          {getStatusIndicator()}
        </div>

        {/* Privacy Dropdown */}
        <div className="relative">
          <Button
            className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:shadow-sm transition-all duration-150"
            onClick={() => setShowPrivacyDropdown(!showPrivacyDropdown)}
            variant="ghost"
          >
            {getPrivacyIcon()}
            <ChevronDown size={16} />
          </Button>

          {showPrivacyDropdown && (
            <div className={`absolute top-full right-0 mt-1 w-40 rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <ul>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${privacyStatus === 'private' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setPrivacyStatus('private'); setShowPrivacyDropdown(false); }}
                >
                  <Lock size={16} />
                  <span>Private</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${privacyStatus === 'public' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setPrivacyStatus('public'); setShowPrivacyDropdown(false); }}
                >
                  <Globe size={16} />
                  <span>Public</span>
                </li>
                <li
                  className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${privacyStatus === 'shared' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  onClick={() => { setPrivacyStatus('shared'); setShowPrivacyDropdown(false); }}
                >
                  <Users size={16} />
                  <span>Shared</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <Button
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:shadow-sm transition-all duration-150"
          variant="ghost"
        >
          <Share2 size={20} />
        </Button>

        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} text-white`}>
            <User size={16} />
          </div>
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;