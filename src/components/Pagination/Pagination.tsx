import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationEllipsisProps,
} from './Pagination.types';

/**
 * Pagination link variants using CVA
 */
const paginationLinkVariants = cva(
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-h-9 mdt-min-w-9 mdt-px-3',
    'mdt-rounded-md mdt-text-sm mdt-font-medium',
    'mdt-transition-colors',
    'focus-visible:mdt-outline-none focus-visible:mdt-ring-2',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
  ],
  {
    variants: {
      variant: {
        default:
          'mdt-bg-transparent mdt-text-foreground hover:mdt-bg-muted hover:mdt-text-foreground',
        outline:
          'mdt-border mdt-border-input mdt-bg-background hover:mdt-bg-muted hover:mdt-text-foreground',
        active: 'mdt-bg-primary mdt-text-primary-foreground hover:mdt-bg-primary/90',
      },
      size: {
        sm: 'mdt-h-8 mdt-min-w-8 mdt-px-2 mdt-text-xs',
        md: 'mdt-h-9 mdt-min-w-9 mdt-px-3 mdt-text-sm',
        lg: 'mdt-h-10 mdt-min-w-10 mdt-px-4 mdt-text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Pagination root component.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
const Pagination = forwardRef<HTMLElement, PaginationProps>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="pagination"
    className={cn('mdt-flex mdt-w-full mdt-justify-center', className)}
    {...props}
  />
));
Pagination.displayName = 'Pagination';

/**
 * PaginationContent - container for pagination items.
 */
const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('mdt-flex mdt-flex-row mdt-items-center mdt-gap-1', className)}
      {...props}
    />
  )
);
PaginationContent.displayName = 'PaginationContent';

/**
 * PaginationItem - wrapper for each pagination item.
 */
const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />
);
PaginationItem.displayName = 'PaginationItem';

/**
 * PaginationLink - clickable link for pagination.
 *
 * @example
 * ```tsx
 * <PaginationLink href="#" isActive>
 *   1
 * </PaginationLink>
 * ```
 */
const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size = 'md', children, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        paginationLinkVariants({
          variant: isActive ? 'active' : 'default',
          size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
PaginationLink.displayName = 'PaginationLink';

/**
 * PaginationPrevious - previous page button.
 */
const PaginationPrevious = forwardRef<HTMLAnchorElement, PaginationLinkProps & { label?: string }>(
  ({ className, label = 'Previous', ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      className={cn('mdt-gap-1 mdt-pl-2.5', className)}
      {...props}
    >
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
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span>{label}</span>
    </PaginationLink>
  )
);
PaginationPrevious.displayName = 'PaginationPrevious';

/**
 * PaginationNext - next page button.
 */
const PaginationNext = forwardRef<HTMLAnchorElement, PaginationLinkProps & { label?: string }>(
  ({ className, label = 'Next', ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      className={cn('mdt-gap-1 mdt-pr-2.5', className)}
      {...props}
    >
      <span>{label}</span>
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
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </PaginationLink>
  )
);
PaginationNext.displayName = 'PaginationNext';

/**
 * PaginationEllipsis - shows ellipsis for skipped pages.
 */
const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn('mdt-flex mdt-h-9 mdt-w-9 mdt-items-center mdt-justify-center', className)}
      {...props}
    >
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
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
      <span className="mdt-sr-only">More pages</span>
    </span>
  )
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationLinkVariants,
};
