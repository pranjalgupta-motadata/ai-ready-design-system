import type { ComponentPropsWithoutRef } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Variant type for tabs styling
 */
export type TabsVariant = 'default' | 'underline' | 'card' | 'pills';

/**
 * Props for the Tabs root component
 */
export interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /**
   * The value of the tab that should be active when initially rendered.
   * Use when you do not need to control the state of the tabs.
   */
  defaultValue?: string;

  /**
   * The controlled value of the tab that should be active.
   * Must be used in conjunction with onValueChange.
   */
  value?: string;

  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string) => void;

  /**
   * The orientation of the tabs.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * The direction of navigation between tabs.
   * @default 'ltr'
   */
  dir?: 'ltr' | 'rtl';

  /**
   * When true, keyboard navigation will loop from last tab to first, and vice versa.
   * @default true
   */
  activationMode?: 'automatic' | 'manual';
}

/**
 * Props for the TabsList component
 */
export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: TabsVariant;

  /**
   * Whether the tabs should take full width of container
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Props for the TabsTrigger component
 */
export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /**
   * The value of the tab. Must be unique within the Tabs component.
   */
  value: string;

  /**
   * Visual style variant (should match TabsList variant)
   * @default 'default'
   */
  variant?: TabsVariant;

  /**
   * Whether the tab trigger should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

/**
 * Props for the TabsContent component
 */
export interface TabsContentProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  /**
   * The value of the tab that this content belongs to.
   */
  value: string;
}
