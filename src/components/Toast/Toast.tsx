import { Toaster as Sonner, toast as sonnerToast, type ExternalToast } from 'sonner';
import { cn } from '@/utils';
import type { ToastProps, ToastFunction, ToasterProps } from './Toast.types';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
const TRANSITION_COLORS = 'mdt-transition-colors';

/**
 * Toast component using Sonner library.
 * Provides a simple and elegant toast notification system.
 *
 * @example
 * ```tsx
 * // In your app root
 * import { Toast } from '@/components/Toast';
 *
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <Toast />
 *     </>
 *   );
 * }
 *
 * // Trigger toasts anywhere
 * import { toast } from '@/components/Toast';
 *
 * toast('Hello world!');
 * toast.success('Saved successfully!');
 * toast.error('Something went wrong');
 * toast.warning('Please check your input');
 * toast.info('New update available');
 * toast.promise(fetchData(), {
 *   loading: 'Loading...',
 *   success: 'Data loaded!',
 *   error: 'Failed to load data'
 * });
 * ```
 */
const Toast = ({
  position = 'bottom-right',
  theme = 'light',
  richColors = true,
  expand = false,
  duration = 4000,
  visibleToasts = 3,
  closeButton = false,
  className,
  toastOptions,
  ...props
}: ToasterProps) => {
  return (
    <Sonner
      position={position}
      theme={theme}
      richColors={richColors}
      expand={expand}
      duration={duration}
      visibleToasts={visibleToasts}
      closeButton={closeButton}
      className={cn('mdt-toaster', className)}
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: cn(
            'mdt-toast mdt-group',
            'mdt-w-full mdt-rounded-lg mdt-border mdt-p-4',
            'mdt-flex mdt-items-start mdt-gap-3',
            'mdt-bg-background mdt-text-foreground',
            'mdt-shadow-lg',
            'data-[type=success]:mdt-border-success data-[type=success]:mdt-bg-green-10',
            'data-[type=error]:mdt-border-destructive data-[type=error]:mdt-bg-red-10',
            'data-[type=warning]:mdt-border-warning data-[type=warning]:mdt-bg-orange-10',
            'data-[type=info]:mdt-border-info data-[type=info]:mdt-bg-blue-10'
          ),
          title: cn(
            'mdt-text-sm mdt-font-semibold',
            '[.mdt-group[data-type=success]_&]:mdt-text-green-70',
            '[.mdt-group[data-type=error]_&]:mdt-text-red-70',
            '[.mdt-group[data-type=warning]_&]:mdt-text-orange-70',
            '[.mdt-group[data-type=info]_&]:mdt-text-blue-70'
          ),
          description: cn(
            'mdt-text-sm mdt-text-muted-foreground',
            '[.mdt-group[data-type=success]_&]:mdt-text-green-80',
            '[.mdt-group[data-type=error]_&]:mdt-text-red-80',
            '[.mdt-group[data-type=warning]_&]:mdt-text-orange-80',
            '[.mdt-group[data-type=info]_&]:mdt-text-blue-80'
          ),
          actionButton: cn(
            'mdt-ml-auto mdt-rounded-md mdt-px-3 mdt-py-1.5',
            'mdt-text-sm mdt-font-medium',
            'mdt-bg-primary mdt-text-primary-foreground',
            'hover:mdt-bg-primary/90',
            TRANSITION_COLORS
          ),
          cancelButton: cn(
            'mdt-ml-auto mdt-rounded-md mdt-px-3 mdt-py-1.5',
            'mdt-text-sm mdt-font-medium',
            'mdt-bg-secondary mdt-text-secondary-foreground',
            'hover:mdt-bg-secondary/80',
            TRANSITION_COLORS
          ),
          closeButton: cn(
            'mdt-rounded-md mdt-p-1',
            'mdt-text-foreground/50',
            'hover:mdt-text-foreground',
            TRANSITION_COLORS,
            'mdt-border mdt-border-input',
            'hover:mdt-bg-muted'
          ),
          icon: cn(
            'mdt-h-5 mdt-w-5 mdt-shrink-0',
            '[.mdt-group[data-type=success]_&]:mdt-text-green-60',
            '[.mdt-group[data-type=error]_&]:mdt-text-red-60',
            '[.mdt-group[data-type=warning]_&]:mdt-text-orange-60',
            '[.mdt-group[data-type=info]_&]:mdt-text-blue-60'
          ),
          loading: cn('mdt-shrink-0 mdt-text-primary'),
        },
        ...toastOptions,
      }}
      {...props}
    />
  );
};

Toast.displayName = 'Toast';

/**
 * Toast trigger function with type-specific helpers
 *
 * @example
 * ```tsx
 * // Basic toast
 * toast('Hello world!');
 *
 * // Success toast
 * toast.success('Changes saved!');
 *
 * // Error toast
 * toast.error('Failed to save');
 *
 * // Warning toast
 * toast.warning('Please review your input');
 *
 * // Info toast
 * toast.info('New features available');
 *
 * // Toast with action
 * toast('Event created', {
 *   action: {
 *     label: 'Undo',
 *     onClick: () => console.log('Undo'),
 *   },
 * });
 *
 * // Toast with title and description
 * toast('New message', {
 *   description: 'You have a new message from John',
 * });
 *
 * // Promise toast
 * toast.promise(
 *   fetch('/api/data'),
 *   {
 *     loading: 'Loading...',
 *     success: 'Data loaded successfully!',
 *     error: 'Failed to load data',
 *   }
 * );
 *
 * // Custom duration
 * toast('This will stay for 10 seconds', { duration: 10000 });
 *
 * // Dismiss programmatically
 * const toastId = toast('Dismissible toast');
 * toast.dismiss(toastId);
 * ```
 */
const toast: ToastFunction = Object.assign(
  (message: string | React.ReactNode, options?: ToastProps) => {
    return sonnerToast(message, options as ExternalToast);
  },
  {
    success: (message: string | React.ReactNode, options?: ToastProps) => {
      return sonnerToast.success(message, options as ExternalToast);
    },
    error: (message: string | React.ReactNode, options?: ToastProps) => {
      return sonnerToast.error(message, options as ExternalToast);
    },
    warning: (message: string | React.ReactNode, options?: ToastProps) => {
      return sonnerToast.warning(message, options as ExternalToast);
    },
    info: (message: string | React.ReactNode, options?: ToastProps) => {
      return sonnerToast.info(message, options as ExternalToast);
    },
    loading: (message: string | React.ReactNode, options?: ToastProps) => {
      return sonnerToast.loading(message, options as ExternalToast);
    },
    promise: sonnerToast.promise as ToastFunction['promise'],
    dismiss: sonnerToast.dismiss,
    message: (message: string | React.ReactNode, options?: ToastProps) => {
      return sonnerToast.message(message, options as ExternalToast);
    },
    custom: (jsx: (id: number | string) => React.ReactElement, options?: ToastProps) => {
      return sonnerToast.custom(jsx, options as ExternalToast);
    },
  }
);

export { Toast, toast };
