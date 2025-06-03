import React, { useState } from 'react';
import { CurlyBraces as BracesCurly, GitBranch, Tag, Users, X, Search, Plus, ChevronDown, ChevronRight, Clock, FileEdit, History, Link2, MessageSquare, Settings, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useEditor } from '../../hooks/use-editor';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';

type Tab = 'variables' | 'versions' | 'metadata' | 'collaborators';

const RightSidebar: React.FC = () => {
  const { theme } = useTheme();
  const { toggleRightSidebar } = useEditor();
  const [activeTab, setActiveTab] = useState<Tab>('variables');

  const baseClasses = "w-80 h-full flex flex-col border-l";
  const themeClasses = theme === 'dark'
    ? "bg-gray-800 border-gray-700 text-gray-100"
    : "bg-white border-gray-200 text-gray-800";

  const tabClass = (tab: Tab) => `
    flex items-center justify-center px-4 py-2 text-sm font-medium
    ${activeTab === tab
      ? theme === 'dark'
        ? 'border-b-2 border-blue-500 text-blue-400'
        : 'border-b-2 border-blue-600 text-blue-600'
      : theme === 'dark'
        ? 'text-gray-400 hover:text-gray-200'
        : 'text-gray-600 hover:text-gray-900'
    }
  `;

  const sectionClass = `p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`;

  const renderVariablesTab = () => (
    <>
      <div className={sectionClass}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Variable Structure</h3>
          <Button className="cursor-pointer flex items-center gap-1" variant="secondary">
            <Plus size={16} className="inline mr-1" />
            Add Variable
          </Button>
        </div>
        <div className="space-y-3">
          <Select>
            <SelectTrigger className={`w-full p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} cursor-pointer`}>
              <SelectValue placeholder="Select structure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="nested">Nested</SelectItem>
              <SelectItem value="typed">Typed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search variables..."
              className={`pl-9 ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <div className="space-y-2">
            {/* Sample Variables */}
            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">systemPrompt</span>
                <span className="text-xs text-gray-500">string</span>
              </div>
              <p className="text-sm text-gray-500">Main system instructions</p>
            </div>

            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">temperature</span>
                <span className="text-xs text-gray-500">number</span>
              </div>
              <p className="text-sm text-gray-500">Model temperature setting</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderVersionsTab = () => (
    <>
      <div className={sectionClass}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-medium">Current Version</h3>
            <p className="text-sm text-gray-500">Version 3.0</p>
          </div>
          <Button className="cursor-pointer" variant="secondary">
            Save Checkpoint
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Version 3.0</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Current</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">Updated system prompt structure</p>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              <span>2 hours ago</span>
              <User size={12} className="ml-3 mr-1" />
              <span>John Doe</span>
            </div>
          </div>

          <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Version 2.0</span>
              <button className="text-xs text-blue-500 hover:underline">Restore</button>
            </div>
            <p className="text-sm text-gray-500 mb-2">Added new variables</p>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              <span>1 day ago</span>
              <User size={12} className="ml-3 mr-1" />
              <span>Sarah Brown</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderMetadataTab = () => (
    <div className="flex-1 overflow-y-auto">
      <div className={sectionClass}>
        <h3 className="font-medium mb-3">Basic Information</h3>
        <div className="space-y-3">
          <div>
            <Input
              type="text"
              className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}
              value="Advanced AI Assistant Prompt"
              readOnly
            />
          </div>
          <div>
            <Textarea
              className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}
              rows={3}
            />
          </div>
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="font-medium mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`rounded-xl ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
            variant="secondary"
          >
            AI
          </Badge>
          <Badge
            className={`rounded-xl ${theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}
            variant="secondary"
          >
            Prompt
          </Badge>
          <Button
            className={`px-2 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} cursor-pointer`}
            variant="secondary"
            size="sm"
          >
            <Plus size={12} className="mr-1" />
            Add Tag
          </Button>
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="font-medium mb-3">Analytics</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Usage Count</span>
            <span>1,234</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Average Response Time</span>
            <span>2.3s</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCollaboratorsTab = () => (
    <>
      <div className={sectionClass}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Team Members</h3>
          <Button className="cursor-pointer flex items-center gap-1" variant="secondary">
            <Plus size={16} className="inline mr-1" />
            Invite
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                JD
              </div>
              <div className="ml-3">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-500">john@example.com</div>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark'
                ? 'bg-blue-900 text-blue-200'
                : 'bg-blue-100 text-blue-800'
              }`}>Owner</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                SB
              </div>
              <div className="ml-3">
                <div className="font-medium">Sarah Brown</div>
                <div className="text-xs text-gray-500">sarah@example.com</div>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
              }`}>Editor</span>
          </div>
        </div>
      </div>
      <div className={sectionClass}>
        <h3 className="font-medium mb-3">Activity</h3>
        <div className="space-y-3">
          <div className="text-sm">
            <div className="flex items-center text-gray-500">
              <FileEdit size={14} className="mr-2" />
              <span>Sarah edited the system prompt</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
          </div>

          <div className="text-sm">
            <div className="flex items-center text-gray-500">
              <MessageSquare size={14} className="mr-2" />
              <span>John added a comment</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">5 hours ago</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <Button
          className={tabClass('variables') + ' cursor-pointer'}
          onClick={() => setActiveTab('variables')}
          variant="ghost"
        >
          <BracesCurly size={16} className="mr-2" />
        </Button>
        <Button
          className={tabClass('versions') + ' cursor-pointer'}
          onClick={() => setActiveTab('versions')}
          variant="ghost"
        >
          <GitBranch size={16} className="mr-2" />
        </Button>
        <Button
          className={tabClass('metadata') + ' cursor-pointer'}
          onClick={() => setActiveTab('metadata')}
          variant="ghost"
        >
          <Tag size={16} className="mr-2" />
        </Button>
        <Button
          className={tabClass('collaborators') + ' cursor-pointer'}
          onClick={() => setActiveTab('collaborators')}
          variant="ghost"
        >
          <Users size={16} className="mr-2" />
        </Button>
        <Button
          className="ml-auto p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
          onClick={toggleRightSidebar}
          variant="ghost"
        >
          <X size={16} />
        </Button>
      </div>
      {/* Tab Content */}
      {activeTab === 'variables' && renderVariablesTab()}
      {activeTab === 'versions' && renderVersionsTab()}
      {activeTab === 'metadata' && renderMetadataTab()}
      {activeTab === 'collaborators' && renderCollaboratorsTab()}
    </div>
  );
};

export default RightSidebar;