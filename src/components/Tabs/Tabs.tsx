'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from './Tabs.types';

/**
 * Tabs root component - controls the tab state and behavior.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} className={cn('mdt-w-full', className)} {...props} />
  )
);
Tabs.displayName = 'Tabs';

/**
 * TabsList - container for tab triggers.
 */
const TabsList = forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant = 'underline', fullWidth = false, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'mdt-inline-flex mdt-items-center mdt-gap-1',
        // Variant styles
        variant === 'secondary' &&
          'mdt-h-10 mdt-rounded-md mdt-bg-muted mdt-p-1 mdt-text-muted-foreground',
        variant === 'underline' &&
          'mdt-h-10 mdt-gap-6 mdt-border-b mdt-border-border mdt-bg-transparent',
        variant === 'card' &&
          'mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-1 mdt-shadow-sm',
        variant === 'pills' && 'mdt-h-10 mdt-gap-2 mdt-bg-transparent',
        // Full width modifier
        fullWidth && 'mdt-w-full mdt-justify-stretch',
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = 'TabsList';

/**
 * TabsTrigger - individual tab button.
 */
const TabsTrigger = forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ className, variant = 'underline', fullWidth = false, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        // Base styles
        'mdt-inline-flex mdt-items-center mdt-justify-center mdt-whitespace-nowrap',
        'mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-font-medium mdt-ring-offset-background',
        'mdt-transition-all',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
        'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
        // Variant-specific styles
        variant === 'secondary' &&
          cn(
            'mdt-rounded-sm',
            'data-[state=active]:mdt-bg-background data-[state=active]:mdt-text-foreground data-[state=active]:mdt-shadow-sm'
          ),
        variant === 'underline' &&
          cn(
            'mdt-relative mdt-border-b-2 mdt-border-transparent mdt-bg-transparent mdt-pb-3',
            'data-[state=active]:mdt-border-primary data-[state=active]:mdt-text-foreground',
            'hover:mdt-text-foreground'
          ),
        variant === 'card' &&
          cn(
            'mdt-rounded-md',
            'data-[state=active]:mdt-bg-primary data-[state=active]:mdt-text-primary-foreground data-[state=active]:mdt-shadow',
            'hover:mdt-bg-muted/50'
          ),
        variant === 'pills' &&
          cn(
            'mdt-rounded-full mdt-border mdt-border-transparent',
            'data-[state=active]:mdt-border-border data-[state=active]:mdt-bg-background data-[state=active]:mdt-text-foreground data-[state=active]:mdt-shadow-sm',
            'hover:mdt-bg-muted/50'
          ),
        // Full width modifier
        fullWidth && 'mdt-flex-1',
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = 'TabsTrigger';

/**
 * TabsContent - content panel for each tab.
 */
const TabsContent = forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mdt-mt-2 mdt-ring-offset-background',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
        className
      )}
      {...props}
    />
  )
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
