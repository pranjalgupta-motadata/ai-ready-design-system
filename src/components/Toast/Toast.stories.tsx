import type { Meta, StoryObj } from '@storybook/react';
import { Toast, toast } from './Toast';
import { Button } from '../Button';
import { Icon } from '../Icon';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toast notification component using Sonner. Provides elegant, accessible toast notifications with support for different types, positions, and promise-based toasts. Includes custom icon support and improved visibility for all variants.',
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
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Position of the toaster on screen',
      table: {
        defaultValue: { summary: 'bottom-right' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Theme of the toaster',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    richColors: {
      control: 'boolean',
      description: 'Whether to use rich colors for different toast types',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    expand: {
      control: 'boolean',
      description: 'Whether toasts should expand on hover',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    duration: {
      control: 'number',
      description: 'Default duration for all toasts (in milliseconds)',
      table: {
        defaultValue: { summary: '4000' },
      },
    },
    visibleToasts: {
      control: 'number',
      description: 'Maximum number of visible toasts',
      table: {
        defaultValue: { summary: '3' },
      },
    },
    closeButton: {
      control: 'boolean',
      description: 'Whether to show a close button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mdt-flex mdt-min-h-[400px] mdt-w-full mdt-items-center mdt-justify-center">
        <Story />
        <Toast />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toast example with a simple message.
 */
export const Default: Story = {
  render: () => (
    <Button onClick={() => toast('Hello! This is a default toast message.')}>
      Show Default Toast
    </Button>
  ),
};

/**
 * Success toast for positive actions and confirmations.
 */
export const Success: Story = {
  render: () => (
    <Button color="success" onClick={() => toast.success('Changes saved successfully!')}>
      Show Success Toast
    </Button>
  ),
};

/**
 * Error toast for failures and errors.
 */
export const Error: Story = {
  render: () => (
    <Button color="error" onClick={() => toast.error('Failed to save changes. Please try again.')}>
      Show Error Toast
    </Button>
  ),
};

/**
 * Warning toast for cautionary messages.
 */
export const Warning: Story = {
  render: () => (
    <Button
      color="warning"
      onClick={() => toast.warning('Please review your input before submitting.')}
    >
      Show Warning Toast
    </Button>
  ),
};

/**
 * Info toast for informational messages.
 */
export const Info: Story = {
  render: () => (
    <Button
      color="info"
      onClick={() => toast.info('New features are now available. Check them out!')}
    >
      Show Info Toast
    </Button>
  ),
};

/**
 * Toast with an action button.
 */
export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('Event has been created', {
          action: {
            label: 'Undo',
            onClick: () => toast.success('Event creation undone!'),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
};

/**
 * Toast with a long message to demonstrate text wrapping.
 */
export const WithLongMessage: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast(
          'This is a very long toast message that demonstrates how the toast component handles extensive text content. It should wrap properly and remain readable without breaking the layout.'
        )
      }
    >
      Show Long Message
    </Button>
  ),
};

/**
 * Toast with title and description.
 */
export const WithTitleAndDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('New Message Received', {
          description: 'You have received a new message from John Doe. Click to view.',
        })
      }
    >
      Show Title & Description
    </Button>
  ),
};

/**
 * Multiple toasts displayed simultaneously.
 */
export const MultipleToasts: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast('First notification');
        setTimeout(() => toast.success('Second notification - Success!'), 200);
        setTimeout(() => toast.error('Third notification - Error!'), 400);
        setTimeout(() => toast.warning('Fourth notification - Warning!'), 600);
        setTimeout(() => toast.info('Fifth notification - Info!'), 800);
      }}
    >
      Show Multiple Toasts
    </Button>
  ),
};

/**
 * Toast in different positions on the screen.
 */
export const DifferentPositions: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <Button onClick={() => toast('Top Left', { position: 'top-left' })}>Top Left</Button>
      <Button onClick={() => toast('Top Center', { position: 'top-center' })}>Top Center</Button>
      <Button onClick={() => toast('Top Right', { position: 'top-right' })}>Top Right</Button>
      <Button onClick={() => toast('Bottom Left', { position: 'bottom-left' })}>Bottom Left</Button>
      <Button onClick={() => toast('Bottom Center', { position: 'bottom-center' })}>
        Bottom Center
      </Button>
      <Button onClick={() => toast('Bottom Right', { position: 'bottom-right' })}>
        Bottom Right
      </Button>
    </div>
  ),
};

/**
 * Promise toast that updates based on promise state.
 */
export const PromiseToast: Story = {
  render: () => (
    <Button
      onClick={() => {
        const promise = new Promise<{ data: string }>((resolve, reject) => {
          const shouldSucceed = Math.random() > 0.5;
          setTimeout(() => {
            if (shouldSucceed) {
              resolve({ data: 'Success data' });
            } else {
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
              reject('Failed to fetch data');
            }
          }, 2000);
        });

        toast.promise(promise, {
          loading: 'Loading data...',
          success: 'Data loaded successfully!',
          error: 'Failed to load data',
        });
      }}
    >
      Show Promise Toast
    </Button>
  ),
};

/**
 * Toast with custom duration.
 */
export const CustomDuration: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <Button onClick={() => toast('Quick toast (1 second)', { duration: 1000 })}>
        1 Second Toast
      </Button>
      <Button onClick={() => toast('Normal toast (4 seconds)', { duration: 4000 })}>
        4 Seconds (Default)
      </Button>
      <Button onClick={() => toast('Long toast (10 seconds)', { duration: 10000 })}>
        10 Seconds Toast
      </Button>
      <Button onClick={() => toast('Persistent toast', { duration: Infinity })}>
        Persistent Toast
      </Button>
    </div>
  ),
};

/**
 * Loading toast example.
 */
export const LoadingToast: Story = {
  render: () => (
    <Button
      onClick={() => {
        const loadingToastId = toast.loading('Processing your request...');
        setTimeout(() => {
          toast.dismiss(loadingToastId);
          toast.success('Request processed successfully!');
        }, 3000);
      }}
    >
      Show Loading Toast
    </Button>
  ),
};

/**
 * Toast with close button enabled.
 */
export const WithCloseButton: Story = {
  render: () => (
    <Button onClick={() => toast('This toast has a close button', { closeButton: true })}>
      Show Toast with Close Button
    </Button>
  ),
};

/**
 * All toast variants displayed together for visual comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <Button variant="outline" onClick={() => toast('Default message')}>
        Default
      </Button>
      <Button color="success" onClick={() => toast.success('Success message')}>
        Success
      </Button>
      <Button color="error" onClick={() => toast.error('Error message')}>
        Error
      </Button>
      <Button color="warning" onClick={() => toast.warning('Warning message')}>
        Warning
      </Button>
      <Button color="info" onClick={() => toast.info('Info message')}>
        Info
      </Button>
      <Button onClick={() => toast.loading('Loading message')}>Loading</Button>
    </div>
  ),
};

/**
 * Toast with custom icons for different variants.
 * Demonstrates how to use custom icons or emojis with toasts.
 */
export const WithCustomIcons: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <Button
        color="success"
        onClick={() =>
          toast.success('Payment processed successfully', {
            icon: <Icon name="check-circle" size="md" aria-hidden={true} />,
          })
        }
      >
        Custom Success Icon
      </Button>
      <Button
        color="error"
        onClick={() =>
          toast.error('Failed to process payment', {
            icon: <Icon name="x-circle" size="md" aria-hidden={true} />,
          })
        }
      >
        Custom Error Icon
      </Button>
      <Button
        color="warning"
        onClick={() =>
          toast.warning('Your session will expire soon', {
            icon: <Icon name="alert-triangle" size="md" aria-hidden={true} />,
          })
        }
      >
        Custom Warning Icon
      </Button>
      <Button
        color="info"
        onClick={() =>
          toast.info('New update available', {
            icon: <Icon name="info" size="md" aria-hidden={true} />,
          })
        }
      >
        Custom Info Icon
      </Button>
      <Button
        onClick={() =>
          toast('Celebration notification', {
            icon: '🎉',
          })
        }
      >
        Emoji Icon
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast('No icon toast', {
            icon: null,
          })
        }
      >
        No Icon
      </Button>
    </div>
  ),
};

/**
 * Toast variants with descriptions to show improved visibility.
 */
export const VariantsWithDescriptions: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <Button
        color="success"
        onClick={() =>
          toast.success('Files uploaded successfully', {
            description: '3 files have been uploaded to your workspace.',
          })
        }
      >
        Success with Description
      </Button>
      <Button
        color="error"
        onClick={() =>
          toast.error('Upload failed', {
            description: 'The file size exceeds the maximum limit of 10MB.',
          })
        }
      >
        Error with Description
      </Button>
      <Button
        color="warning"
        onClick={() =>
          toast.warning('Storage almost full', {
            description: 'You have used 95% of your storage. Consider upgrading.',
          })
        }
      >
        Warning with Description
      </Button>
      <Button
        color="info"
        onClick={() =>
          toast.info('New version available', {
            description: 'Version 2.0 is now available. Update to get new features.',
          })
        }
      >
        Info with Description
      </Button>
    </div>
  ),
};
