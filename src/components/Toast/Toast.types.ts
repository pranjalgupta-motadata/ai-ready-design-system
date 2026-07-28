import type { ExternalToast, ToasterProps as SonnerToasterProps } from 'sonner';
import type { ReactNode } from 'react';

/**
 * Toast position options
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Toast theme
 */
export type ToastTheme = 'light' | 'dark' | 'system';

/**
 * Toast type/variant
 */
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

/**
 * Toast options extending Sonner's ExternalToast
 */
export interface ToastProps extends ExternalToast {
  /**
   * Toast message
   */
  message?: string | ReactNode;

  /**
   * Toast description (subtitle)
   */
  description?: string | ReactNode;

  /**
   * Duration in milliseconds
   * @default 4000
   */
  duration?: number;

  /**
   * Action button configuration
   */
  action?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Cancel button configuration
   */
  cancel?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Custom icon to display
   */
  icon?: ReactNode;

  /**
   * Whether the toast can be dismissed by clicking
   * @default true
   */
  dismissible?: boolean;

  /**
   * Unique identifier for the toast
   */
  id?: number | string;

  /**
   * Custom className for the toast
   */
  className?: string;

  /**
   * Custom style for the toast
   */
  style?: React.CSSProperties;

  /**
   * Callback when toast is dismissed
   */
  onDismiss?: (toast: { id: number | string }) => void;

  /**
   * Callback when action button is clicked
   */
  onAutoClose?: (toast: { id: number | string }) => void;
}

/**
 * Promise toast configuration
 */
export interface PromiseToastOptions<T> {
  loading: string | ReactNode;
  success: string | ReactNode | ((data: T) => string | ReactNode);
  error: string | ReactNode | ((error: Error) => string | ReactNode);
  description?: string | ReactNode;
  duration?: number;
}

/**
 * Toaster component props
 */
export interface ToasterProps extends Omit<SonnerToasterProps, 'position' | 'theme'> {
  /**
   * Position of the toaster
   * @default 'bottom-right'
   */
  position?: ToastPosition;

  /**
   * Theme of the toaster
   * @default 'light'
   */
  theme?: ToastTheme;

  /**
   * Whether to use rich colors for different toast types
   * @default true
   */
  richColors?: boolean;

  /**
   * Whether toasts should expand on hover
   * @default false
   */
  expand?: boolean;

  /**
   * Default duration for all toasts (in milliseconds)
   * @default 4000
   */
  duration?: number;

  /**
   * Maximum number of visible toasts
   * @default 3
   */
  visibleToasts?: number;

  /**
   * Whether to show a close button
   * @default false
   */
  closeButton?: boolean;

  /**
   * Custom className for the toaster container
   */
  className?: string;

  /**
   * Gap between toasts (in pixels)
   */
  gap?: number;

  /**
   * Offset from the edge of the screen (in pixels)
   */
  offset?: string | number;
}

/**
 * Toast function signature
 */
export interface ToastFunction {
  /**
   * Show a default toast
   */
  (message: string | ReactNode, options?: ToastProps): string | number;

  /**
   * Show a success toast
   */
  success: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show an error toast
   */
  error: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a warning toast
   */
  warning: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show an info toast
   */
  info: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a loading toast
   */
  loading: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a promise toast that updates based on promise state
   */
  promise: <T = unknown>(
    promise: Promise<T> | (() => Promise<T>),
    options: PromiseToastOptions<T>
  ) => string | number | { unwrap: () => Promise<T> };

  /**
   * Dismiss a specific toast or all toasts
   */
  dismiss: (id?: number | string) => void;

  /**
   * Show a message toast (alias for default)
   */
  message: (message: string | ReactNode, options?: ToastProps) => string | number;

  /**
   * Show a custom toast with JSX
   */
  custom: (
    jsx: (id: number | string) => React.ReactElement,
    options?: ToastProps
  ) => string | number;
}
