import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { BadgeProps, BadgeSize, BadgeTone } from './Badge.types';

const AUTO_HEIGHT = 'mdt-h-auto';

/**
 * Badge styles.
 *
 * One atom covering what the four source systems built as five separate
 * components: the lifecycle status pill (with its dot), the squarer meta chip,
 * count and confidence badges, tinted protocol pills, and the bare icon+text
 * label that deliberately had no background.
 *
 * They shared an anatomy the whole time - [dot or icon] + text, with a tone and
 * a corner radius - so they are three switches on one component rather than
 * five components to keep in sync.
 */
export const badgeVariants = cva(
  [
    'mdt-inline-flex mdt-items-center mdt-shrink-0',
    'mdt-font-medium mdt-whitespace-nowrap',
    'mdt-transition-colors',
    '[&_svg]:mdt-shrink-0 [&_svg]:mdt-pointer-events-none',
  ],
  {
    variants: {
      /**
       * Tones pair a pale background with a deep text colour, and flip in dark
       * mode. The obvious approach - tinting the semantic token and using the
       * same token as text - measures at 2.0:1 in light mode, which is
       * unreadable. WCAG AA needs 4.5:1.
       *
       * There are no semantic tokens for "subtle background" and "strong text"
       * per tone, so these are built from the primitive ramps. That is the
       * missing token pair this component needs; see MISSING-TOKENS.md.
       */
      tone: {
        neutral:
          'mdt-bg-muted mdt-text-neutral-110 mdt-border-border dark:mdt-text-neutral-30',
        success:
          'mdt-bg-green-10 mdt-text-green-80 mdt-border-green-20 dark:mdt-bg-green-90 dark:mdt-text-green-30 dark:mdt-border-green-70',
        warning:
          'mdt-bg-orange-20 mdt-text-orange-80 mdt-border-orange-30 dark:mdt-bg-orange-90 dark:mdt-text-orange-30 dark:mdt-border-orange-70',
        danger:
          'mdt-bg-red-10 mdt-text-red-80 mdt-border-red-20 dark:mdt-bg-red-90 dark:mdt-text-red-30 dark:mdt-border-red-70',
        info: 'mdt-bg-blue-10 mdt-text-blue-80 mdt-border-blue-20 dark:mdt-bg-blue-90 dark:mdt-text-blue-30 dark:mdt-border-blue-70',
        purple:
          'mdt-bg-purple-10 mdt-text-purple-90 mdt-border-purple-20 dark:mdt-bg-purple-100 dark:mdt-text-purple-30 dark:mdt-border-purple-80',
      },
      shape: {
        pill: 'mdt-rounded-full',
        // A tag sits inline with running text and needs an edge to define it.
        // A capsule already reads as an object, so it does not. Credential's
        // badges follow this instinct but apply it inconsistently; here it is
        // consistent.
        tag: 'mdt-rounded-sm mdt-border',
        // `dark:mdt-bg-transparent` is not redundant. The tones set their dark
        // background with a `dark:` utility, and the class merger treats
        // `dark:bg-*` and `bg-*` as separate groups - so a plain
        // `mdt-bg-transparent` clears the light tint but leaves the dark one,
        // and a "bare" badge still renders a filled pill in dark mode.
        // No chip at all: no background, no border, no minimum width, and no
        // padding - so it sits flush in a dense table cell.
        bare: 'mdt-rounded-none mdt-bg-transparent dark:mdt-bg-transparent mdt-px-0 mdt-min-w-0 mdt-border-0',
      },
      /**
       * `min-w` matching the height is what makes count badges work without a
       * separate component: "Active" is wider than the minimum so nothing
       * changes, while "3" or "+2" is narrower and rounds out into a circle.
       */
      size: {
        sm: 'mdt-h-5 mdt-min-w-5 mdt-px-2 mdt-text-xs mdt-gap-1',
        md: 'mdt-h-6 mdt-min-w-6 mdt-px-2.5 mdt-text-xs mdt-gap-1.5',
        lg: 'mdt-h-7 mdt-min-w-7 mdt-px-3 mdt-text-sm mdt-gap-1.5',
      },
    },
    compoundVariants: [
      // `bare` drops its background, so the tone comes through as text only.
      // The text colours above already read against the page in both themes.
      { shape: 'bare', tone: 'neutral', class: 'mdt-text-muted-foreground' },
      // A bare badge has no chip to size, so it takes its height from the line
      // it sits on rather than the fixed height each size sets.
      { shape: 'bare', size: 'sm', class: AUTO_HEIGHT },
      { shape: 'bare', size: 'md', class: AUTO_HEIGHT },
      { shape: 'bare', size: 'lg', class: AUTO_HEIGHT },
    ],
    defaultVariants: {
      tone: 'neutral',
      shape: 'pill',
      size: 'md',
    },
  }
);

/** The status dot takes its colour from the badge's tone. */
const DOT_TONE: Record<BadgeTone, string> = {
  neutral: 'mdt-bg-muted-foreground',
  success: 'mdt-bg-success',
  warning: 'mdt-bg-warning',
  danger: 'mdt-bg-destructive',
  info: 'mdt-bg-info',
  purple: 'mdt-bg-purple-70',
};

/** 6px at every size — the four systems all landed on the same dot. */
const DOT_SIZE: Record<BadgeSize, string> = {
  sm: 'mdt-h-1.5 mdt-w-1.5',
  md: 'mdt-h-1.5 mdt-w-1.5',
  lg: 'mdt-h-2 mdt-w-2',
};

/**
 * Badge — a small label that says what something is.
 *
 * @example
 * ```tsx
 * <Badge tone="success" dot>Active</Badge>
 * <Badge shape="tag" tone="info">3 users</Badge>
 * <Badge shape="bare" tone="warning" icon={<ClockIcon />}>Timed out</Badge>
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'neutral', shape, size = 'md', dot = false, icon, className, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ tone, shape, size }), className)}
      {...rest}
    >
      {dot ? (
        <span
          className={cn('mdt-rounded-full', DOT_TONE[tone], DOT_SIZE[size])}
          // The dot repeats what the label already says, so announcing it
          // would just be noise for a screen reader.
          aria-hidden="true"
          data-testid="badge-dot"
        />
      ) : null}
      {icon}
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

export { Badge };
