import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode, AnchorHTMLAttributes } from 'react';
import type { Button2Variants } from './Button2';

/**
 * Variant props derived from the CVA configuration.
 */
export type Button2VariantsType = VariantProps<typeof Button2Variants>;

/** Visual style of the button. */
export type Button2Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive'
  | 'success';

/** Size of the button. Controls height, padding and text size together. */
export type Button2Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Corner radius. `full` gives a pill, or a circle when the button is icon-only. */
export type Button2Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

/** Shadow depth. 0 is flat. */
export type Button2Elevation = 0 | 1 | 2 | 3;

/**
 * Props shared by every button, whatever it renders as.
 *
 * Deliberately small. There is exactly one way to express each thing:
 * one prop for appearance, one for size, one for corners, one for depth,
 * and icons are passed rather than described.
 */
export interface Button2BaseProps {
  /** Visual style. @default 'primary' */
  variant?: Button2Variant;

  /** Height, padding and text size together. @default 'md' */
  size?: Button2Size;

  /** Corner radius. @default 'md' */
  radius?: Button2Radius;

  /** Shadow depth, 0 is flat. @default 0 */
  elevation?: Button2Elevation;

  /**
   * Icon shown before the label.
   * Pass this with no children to get an icon-only button.
   */
  startIcon?: ReactNode;

  /** Icon shown after the label. */
  endIcon?: ReactNode;

  /**
   * Shows a spinner and blocks interaction.
   *
   * The spinner takes the place of `startIcon`, so the button keeps its
   * shape. Pair with `loadingText` to change the label while it runs.
   * @default false
   */
  loading?: boolean;

  /**
   * Label to show while `loading` is true - for example "Saving...".
   * Falls back to the normal label when omitted.
   */
  loadingText?: ReactNode;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string;
}

/**
 * Label and accessible name.
 *
 * Leaving out `children` gives an icon-only button, and an icon on its own has
 * no accessible name - a screen reader announces nothing. `aria-label` is
 * therefore required in that case, and the component warns loudly in
 * development when it is missing.
 *
 * This was originally enforced through the type system, with `children?: never`
 * on an icon-only branch. It worked, but it collapsed the whole props type to
 * `never` for any tool reading it - Storybook's controls, generated docs, and
 * any AI reading the component's API. For a design system whose point is being
 * machine-readable, a type nothing can read is a bad trade. The check moved to
 * runtime so the types stay legible.
 */
export interface Button2Content {
  /** The label. Omit it, and pass an icon, to get an icon-only button. */
  children?: ReactNode;

  /** Required for icon-only buttons. Optional when there is a visible label. */
  'aria-label'?: string;
}

/** Native attributes, minus the ones this component owns. */
export type Button2NativeProps = Omit<
  ComponentPropsWithoutRef<'button'> & AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'aria-label' | 'href' | 'target' | 'className' | 'color'
>;

export interface Button2LinkProps {
  /** Renders the button as a link to this URL. */
  href?: string;

  /** Where the link opens. Only meaningful alongside `href`. */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Blocks interaction.
   *
   * A link cannot be disabled natively, so when `href` is set this removes the
   * href and marks it `aria-disabled` instead.
   */
  disabled?: boolean;
}

/**
 * Props for Button2.
 *
 * Nine props do the work of the thirty-six on the original Button, because each
 * thing can only be said one way.
 */
export type Button2Props = Button2BaseProps &
  Button2Content &
  Button2LinkProps &
  Button2NativeProps;
