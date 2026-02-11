'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export default function SimpleTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs: Tab[] = [
    {
      id: 'tab1',
      label: 'Profile',
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            This is the profile tab content. Here you can manage your profile settings.
          </p>
        </div>
      ),
    },
    {
      id: 'tab2',
      label: 'Settings',
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-2">Settings</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Configure your application settings and preferences here.
          </p>
        </div>
      ),
    },
    {
      id: 'tab3',
      label: 'Notifications',
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-2">Notifications</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage your notification preferences and see recent alerts.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
        Simple Tabs Example
      </h2>

      {/* Tab Headers */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            // Ternary operator for conditional classes
            className={`
              px-6 py-3 font-medium transition-colors
              ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content - Conditional rendering with ternary */}
      <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>

      {/* Code explanation */}
      <div className="mt-8 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
          💡 How the Ternary Works:
        </h3>
        <code className="text-sm text-zinc-700 dark:text-zinc-300 block whitespace-pre">
{`className={\`
  px-6 py-3 font-medium transition-colors
  \${
    activeTab === tab.id
      ? 'border-b-2 border-blue-600 text-blue-600'  // Active
      : 'text-zinc-600 hover:text-zinc-900'          // Inactive
  }
\`}`}
        </code>
      </div>
    </div>
  );
}
