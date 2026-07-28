import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

/**
 * The Tabs component allows users to navigate between different views or sections of content.
 * Built on @radix-ui/react-tabs for full accessibility and keyboard navigation support.
 */
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A set of layered sections of content—known as tab panels—that are displayed one at a time. Provides keyboard navigation and ARIA support out of the box.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'The value of the tab that should be active when initially rendered',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'The controlled value of the active tab',
      table: {
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      action: 'value changed',
      description: 'Event handler called when the value changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'The reading direction',
      table: {
        defaultValue: { summary: 'ltr' },
      },
    },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
      description: 'Whether tabs are activated automatically on focus or manually on click',
      table: {
        defaultValue: { summary: 'automatic' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tabs example with basic content.
 */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="mdt-w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Account</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Password</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Settings</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Manage your application settings and preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Vertical orientation for tabs - great for sidebars or navigation.
 */
export const VerticalOrientation: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical" className="mdt-flex mdt-gap-4">
      <TabsList className="mdt-h-auto mdt-flex-col mdt-items-stretch">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <div className="mdt-flex-1">
        <TabsContent value="overview" className="mdt-m-0">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Overview</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Get a quick overview of your key metrics and performance indicators.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mdt-m-0">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Analytics</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Detailed analytics and insights about your data.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="mdt-m-0">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Reports</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Generate and view comprehensive reports.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="mdt-m-0">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Notifications</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Manage your notification preferences.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

/**
 * All style variants displayed together for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-muted-foreground">
          Default Variant
        </h3>
        <Tabs defaultValue="tab1" className="mdt-w-[400px]">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <p className="mdt-text-sm">Default variant with muted background</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <p className="mdt-text-sm">Tab 2 content</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <p className="mdt-text-sm">Tab 3 content</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-muted-foreground">
          Underline Variant
        </h3>
        <Tabs defaultValue="tab1" className="mdt-w-[400px]">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" variant="underline">
              Tab 1
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="underline">
              Tab 2
            </TabsTrigger>
            <TabsTrigger value="tab3" variant="underline">
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="mdt-pt-4">
              <p className="mdt-text-sm">Clean underline style for minimal interfaces</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="mdt-pt-4">
              <p className="mdt-text-sm">Tab 2 content</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="mdt-pt-4">
              <p className="mdt-text-sm">Tab 3 content</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-muted-foreground">
          Card Variant
        </h3>
        <Tabs defaultValue="tab1" className="mdt-w-[400px]">
          <TabsList variant="card">
            <TabsTrigger value="tab1" variant="card">
              Tab 1
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="card">
              Tab 2
            </TabsTrigger>
            <TabsTrigger value="tab3" variant="card">
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Elevated card style with border and shadow</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Tab 2 content</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Tab 3 content</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-muted-foreground">
          Pills Variant
        </h3>
        <Tabs defaultValue="tab1" className="mdt-w-[400px]">
          <TabsList variant="pills">
            <TabsTrigger value="tab1" variant="pills">
              Tab 1
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="pills">
              Tab 2
            </TabsTrigger>
            <TabsTrigger value="tab3" variant="pills">
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Rounded pill style for modern interfaces</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Tab 2 content</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="mdt-pt-2">
              <p className="mdt-text-sm">Tab 3 content</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * Tabs with icons alongside text for better visual identification.
 */
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home" className="mdt-w-[500px]">
      <TabsList>
        <TabsTrigger value="home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mdt-mr-2"
            aria-hidden="true"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </TabsTrigger>
        <TabsTrigger value="profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mdt-mr-2"
            aria-hidden="true"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Profile
        </TabsTrigger>
        <TabsTrigger value="messages">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mdt-mr-2"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Messages
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <div className="mdt-space-y-2">
          <h3 className="mdt-text-lg mdt-font-semibold">Home Dashboard</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Welcome to your home dashboard. Here you'll find an overview of your activity.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="profile">
        <div className="mdt-space-y-2">
          <h3 className="mdt-text-lg mdt-font-semibold">Profile Settings</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Manage your profile information and preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="messages">
        <div className="mdt-space-y-2">
          <h3 className="mdt-text-lg mdt-font-semibold">Messages</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">View and manage your messages.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Controlled tabs with external state management.
 */
export const ControlledState: Story = {
  render: function ControlledExample() {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div className="mdt-space-y-4">
        <div className="mdt-flex mdt-gap-2">
          <button
            onClick={() => {
              setActiveTab('tab1');
            }}
            className="mdt-rounded mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90"
            aria-label="Switch to tab 1"
          >
            Activate Tab 1
          </button>
          <button
            onClick={() => {
              setActiveTab('tab2');
            }}
            className="mdt-rounded mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90"
            aria-label="Switch to tab 2"
          >
            Activate Tab 2
          </button>
          <button
            onClick={() => {
              setActiveTab('tab3');
            }}
            className="mdt-rounded mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90"
            aria-label="Switch to tab 3"
          >
            Activate Tab 3
          </button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mdt-w-[400px]">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <h3 className="mdt-text-lg mdt-font-semibold">Tab 1 Content</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                This tab is controlled externally. Active tab: {activeTab}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <h3 className="mdt-text-lg mdt-font-semibold">Tab 2 Content</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                This tab is controlled externally. Active tab: {activeTab}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
              <h3 className="mdt-text-lg mdt-font-semibold">Tab 3 Content</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                This tab is controlled externally. Active tab: {activeTab}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

/**
 * Default value example - tab starts on a specific value.
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Tabs defaultValue="advanced" className="mdt-w-[400px]">
      <TabsList>
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="basic">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Basic Level</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Start with basic features and fundamentals.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="intermediate">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Intermediate Level</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Build on your knowledge with intermediate concepts.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="advanced">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Advanced Level</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This tab is active by default. Master advanced techniques and features.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Tab with disabled state - prevents interaction with specific tabs.
 */
export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="available" className="mdt-w-[400px]">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="enabled">Enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Available Tab</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">This tab is available for use.</p>
        </div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Disabled Tab</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This tab is disabled and cannot be accessed.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="enabled">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Enabled Tab</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">This tab is enabled.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Tabs with badge or counter - showing notifications or counts.
 */
export const WithBadgeCounter: Story = {
  render: () => (
    <Tabs defaultValue="inbox" className="mdt-w-[500px]">
      <TabsList>
        <TabsTrigger value="inbox" className="mdt-gap-2">
          Inbox
          <span className="mdt-flex mdt-h-5 mdt-min-w-[20px] mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-px-1.5 mdt-text-xs mdt-font-semibold mdt-text-primary-foreground">
            12
          </span>
        </TabsTrigger>
        <TabsTrigger value="sent" className="mdt-gap-2">
          Sent
          <span className="mdt-flex mdt-h-5 mdt-min-w-[20px] mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-muted mdt-px-1.5 mdt-text-xs mdt-font-semibold mdt-text-muted-foreground">
            5
          </span>
        </TabsTrigger>
        <TabsTrigger value="drafts" className="mdt-gap-2">
          Drafts
          <span className="mdt-flex mdt-h-5 mdt-min-w-[20px] mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-destructive/20 mdt-px-1.5 mdt-text-xs mdt-font-semibold mdt-text-destructive">
            3
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Inbox</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            You have 12 new messages in your inbox.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="sent">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Sent</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">You have sent 5 messages today.</p>
        </div>
      </TabsContent>
      <TabsContent value="drafts">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Drafts</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            You have 3 draft messages waiting to be sent.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Full width tabs that stretch across the container.
 */
export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="mdt-w-full">
      <TabsList fullWidth>
        <TabsTrigger value="overview" fullWidth>
          Overview
        </TabsTrigger>
        <TabsTrigger value="details" fullWidth>
          Details
        </TabsTrigger>
        <TabsTrigger value="settings" fullWidth>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Overview</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Full width tabs stretch across the entire container, perfect for mobile layouts.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="details">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Details</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">View detailed information here.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
          <h3 className="mdt-text-lg mdt-font-semibold">Settings</h3>
          <p className="mdt-text-sm mdt-text-muted-foreground">Manage your settings.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Scrollable tabs - when you have many tabs that don't fit on screen.
 */
export const ScrollableTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="mdt-w-[500px]">
      <TabsList className="mdt-w-full mdt-justify-start">
        <TabsTrigger value="tab1">Dashboard</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
        <TabsTrigger value="tab4">Customers</TabsTrigger>
        <TabsTrigger value="tab5">Products</TabsTrigger>
        <TabsTrigger value="tab6">Orders</TabsTrigger>
        <TabsTrigger value="tab7">Invoices</TabsTrigger>
        <TabsTrigger value="tab8">Settings</TabsTrigger>
      </TabsList>
      <div className="mdt-max-w-[500px] mdt-overflow-x-auto">
        <TabsContent value="tab1">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Dashboard</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Main dashboard with key metrics.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Analytics</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Detailed analytics view.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Reports</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Generate and view reports.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab4">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Customers</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Manage customer data.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab5">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Products</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">View and edit products.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab6">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Orders</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Track and manage orders.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab7">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Invoices</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Create and manage invoices.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab8">
          <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
            <h3 className="mdt-text-lg mdt-font-semibold">Settings</h3>
            <p className="mdt-text-sm mdt-text-muted-foreground">Configure application settings.</p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

/**
 * Multi-step form example using tabs.
 */
export const MultiStepForm: Story = {
  render: function FormExample() {
    const [currentStep, setCurrentStep] = useState('account');

    return (
      <Tabs value={currentStep} onValueChange={setCurrentStep} className="mdt-w-[500px]">
        <TabsList className="mdt-grid mdt-w-full mdt-grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="finish">Finish</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
            <div className="mdt-space-y-2">
              <h3 className="mdt-text-lg mdt-font-semibold">Create Account</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Enter your email and password to create an account.
              </p>
            </div>
            <div className="mdt-space-y-4">
              <div className="mdt-space-y-2">
                <label htmlFor="email" className="mdt-text-sm mdt-font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
                />
              </div>
              <div className="mdt-space-y-2">
                <label htmlFor="password" className="mdt-text-sm mdt-font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
                />
              </div>
              <button
                onClick={() => {
                  setCurrentStep('profile');
                }}
                className="mdt-w-full mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90"
              >
                Next Step
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
            <div className="mdt-space-y-2">
              <h3 className="mdt-text-lg mdt-font-semibold">Profile Information</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">Tell us a bit about yourself.</p>
            </div>
            <div className="mdt-space-y-4">
              <div className="mdt-space-y-2">
                <label htmlFor="name" className="mdt-text-sm mdt-font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
                />
              </div>
              <div className="mdt-space-y-2">
                <label htmlFor="bio" className="mdt-text-sm mdt-font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  rows={3}
                  className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"
                />
              </div>
              <div className="mdt-flex mdt-gap-2">
                <button
                  onClick={() => {
                    setCurrentStep('account');
                  }}
                  className="mdt-flex-1 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium hover:mdt-bg-muted"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    setCurrentStep('finish');
                  }}
                  className="mdt-flex-1 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="finish">
          <div className="mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
            <div className="mdt-space-y-2">
              <h3 className="mdt-text-lg mdt-font-semibold">All Done!</h3>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Review your information and complete the registration.
              </p>
            </div>
            <div className="mdt-space-y-4">
              <div className="mdt-rounded-md mdt-bg-muted mdt-p-4">
                <p className="mdt-text-sm mdt-text-muted-foreground">
                  Your account has been created successfully. You can now start using the
                  application.
                </p>
              </div>
              <div className="mdt-flex mdt-gap-2">
                <button
                  onClick={() => {
                    setCurrentStep('profile');
                  }}
                  className="mdt-flex-1 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium hover:mdt-bg-muted"
                >
                  Previous
                </button>
                <button className="mdt-flex-1 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90">
                  Complete
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    );
  },
};
