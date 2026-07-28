import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import type { Button2Props, Button2Size } from './Button2.types';

const FOCUS_RING = 'focus-visible:mdt-outline-none focus-visible:mdt-ring-2';
const NO_INTERACTION = 'disabled:mdt-pointer-events-none disabled:mdt-opacity-50';

/**
 * Button2 styles.
 *
 * Four axes, each said exactly one way:
 *   variant   — what it looks like
 *   size      — height, padding and text together
 *   radius    — corners
 *   elevation — depth
 *
 * Icon-only is NOT an axis. It is derived from whether a label was passed,
 * so `iconOnly`, `size="icon"` and `shape="circle"` cannot disagree.
 */
export const Button2Variants = cva(
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-whitespace-nowrap mdt-font-medium',
    'mdt-transition-all mdt-duration-200',
    FOCUS_RING,
    'focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
    NO_INTERACTION,
    '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-shrink-0',
  ],
  {
    variants: {
      variant: {
        primary:
          'mdt-bg-primary mdt-text-primary-foreground hover:mdt-bg-primary/90 active:mdt-bg-primary/80',
        secondary:
          'mdt-bg-secondary mdt-text-secondary-foreground hover:mdt-bg-secondary/80 active:mdt-bg-secondary/70',
        outline:
          'mdt-border mdt-border-input mdt-bg-background mdt-text-foreground hover:mdt-bg-muted active:mdt-bg-muted/80',
        ghost: 'mdt-text-foreground hover:mdt-bg-muted active:mdt-bg-muted/80',
        link: 'mdt-text-foreground mdt-underline-offset-4 hover:mdt-underline hover:mdt-text-muted-foreground',
        destructive:
          'mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-destructive/90 active:mdt-bg-destructive/80',
        success:
          'mdt-bg-success mdt-text-success-foreground hover:mdt-bg-success/90 active:mdt-bg-success/80',
      },
      size: {
        xs: 'mdt-h-7 mdt-px-2 mdt-text-xs mdt-gap-1',
        sm: 'mdt-h-8 mdt-px-3 mdt-text-xs mdt-gap-1.5',
        md: 'mdt-h-9 mdt-px-4 mdt-text-sm mdt-gap-2',
        lg: 'mdt-h-10 mdt-px-6 mdt-text-base mdt-gap-2',
        xl: 'mdt-h-12 mdt-px-8 mdt-text-lg mdt-gap-2.5',
      },
      radius: {
        none: 'mdt-rounded-none',
        sm: 'mdt-rounded-sm',
        md: 'mdt-rounded-md',
        lg: 'mdt-rounded-lg',
        full: 'mdt-rounded-full',
      },
      elevation: {
        0: '',
        1: 'mdt-shadow-sm',
        2: 'mdt-shadow-md',
        3: 'mdt-shadow-lg',
      },
      /**
       * Set automatically when no label is passed. Squares the button so the
       * icon sits centred, and drops the horizontal padding.
       */
      iconOnly: {
        true: 'mdt-px-0',
        false: '',
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'xs', class: 'mdt-w-7' },
      { iconOnly: true, size: 'sm', class: 'mdt-w-8' },
      { iconOnly: true, size: 'md', class: 'mdt-w-9' },
      { iconOnly: true, size: 'lg', class: 'mdt-w-10' },
      { iconOnly: true, size: 'xl', class: 'mdt-w-12' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      radius: 'md',
      elevation: 0,
      iconOnly: false,
    },
  }
);

/** Spinner diameter per button size, so it never crowds the label. */
const SPINNER_SIZE: Record<Button2Size, string> = {
  xs: 'mdt-h-3 mdt-w-3',
  sm: 'mdt-h-3 mdt-w-3',
  md: 'mdt-h-4 mdt-w-4',
  lg: 'mdt-h-4 mdt-w-4',
  xl: 'mdt-h-5 mdt-w-5',
};

const SPINNER_TRACK_OPACITY = '0.2';
const SPINNER_ARC = 'M12 2a10 10 0 0 1 10 10';

/**
 * Loading spinner. Hidden from screen readers — `aria-busy` on the button
 * already announces the state, so this would just be noise.
 */
const Spinner = ({ size }: { size: Button2Size }): ReactNode => (
  <svg
    className={cn('mdt-animate-spin', SPINNER_SIZE[size])}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    data-testid="button2-spinner"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2.5"
      opacity={SPINNER_TRACK_OPACITY}
    />
    <path d={SPINNER_ARC} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/**
 * An icon on its own has no accessible name — a screen reader announces
 * nothing. Warns in development only, so the check costs nothing in production.
 */
const warnIfUnlabelled = (iconOnly: boolean, ariaLabel: string | undefined): void => {
  if (iconOnly && (ariaLabel === undefined || ariaLabel === '')) {
    console.warn(
      'Button2: an icon-only button needs an aria-label, or screen readers announce nothing. ' +
        'Add aria-label="…" describing the action.'
    );
  }
};

/**
 * Button2 — the reworked button.
 *
 * @example
 * ```tsx
 * <Button2>Save changes</Button2>
 * <Button2 variant="destructive" startIcon={<TrashIcon />}>Delete</Button2>
 * <Button2 startIcon={<PlusIcon />} aria-label="Add item" />
 * <Button2 loading loadingText="Saving…">Save</Button2>
 * ```
 */
const Button2 = forwardRef<HTMLButtonElement & HTMLAnchorElement, Button2Props>((props, ref) => {
  const {
    variant,
    size = 'md',
    radius,
    elevation,
    startIcon,
    endIcon,
    loading = false,
    loadingText,
    className,
    children,
    href,
    target,
    disabled = false,
    type,
    ...rest
  } = props;

  const hasLabel = children !== undefined && children !== null && children !== false;
  const iconOnly = !hasLabel;
  const label = loading && loadingText !== undefined ? loadingText : children;
  const inert = disabled || loading;

  warnIfUnlabelled(iconOnly, props['aria-label']);

  // While loading, the spinner stands in for the start icon so the button keeps
  // its shape and the layout never jumps.
  const leading = loading ? <Spinner size={size} /> : startIcon;
  const trailing = loading ? null : endIcon;

  const classes = cn(Button2Variants({ variant, size, radius, elevation, iconOnly }), className);

  const content = (
    <>
      {leading}
      {hasLabel ? <span>{label}</span> : null}
      {trailing}
    </>
  );

  if (href !== undefined) {
    return (
      <a
        ref={ref}
        // A link has no disabled attribute, so the href is removed instead —
        // otherwise a disabled "button" is still keyboard-navigable and clickable.
        href={inert ? undefined : href}
        target={target}
        className={cn(classes, inert && 'mdt-pointer-events-none mdt-opacity-50')}
        aria-disabled={inert || undefined}
        aria-busy={loading || undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      // Defaults to "button" so a button inside a form never submits it by accident.
      type={type ?? 'button'}
      className={classes}
      disabled={inert}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
});

Button2.displayName = 'Button2';

export { Button2 };
