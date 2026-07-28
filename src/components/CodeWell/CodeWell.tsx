import { cva } from 'class-variance-authority';
import { forwardRef, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Label } from '../Label';
import { SecretDots } from '../SecretDots';

/**
 * CodeWell styles - a read-only monospace surface for commands, tokens,
 * generated config and log output.
 *
 * Both Org Mgmt and Agent Fleet asked for exactly this in their own audits. Org
 * Mgmt has three separate wells and recommends extracting one CodeWell with
 * copy and mask options. Agent Fleet has a light CodeBlock and a hand-rolled
 * DarkTerminalWell, records three screens bypassing both, and recommends
 * folding them into a single component with a surface option. This is that
 * component.
 */
export const codeWellVariants = cva(
  'mdt-block mdt-w-full mdt-overflow-x-auto mdt-rounded-md mdt-font-mono mdt-text-xs',
  {
    variants: {
      surface: {
        light: 'mdt-bg-muted mdt-text-foreground mdt-border mdt-border-border',
        // In dark mode neutral-160 IS the page background, so a dark well would
        // read as a bordered hole rather than a surface - and the light variant
        // would stand out more than the dark one, inverting the relationship.
        // Lifting it one step keeps dark darker than light in both themes.
        dark: 'mdt-bg-neutral-160 mdt-text-neutral-20 mdt-border mdt-border-neutral-130 dark:mdt-bg-neutral-150 dark:mdt-border-neutral-120',
      },
      padded: {
        true: 'mdt-p-3',
        false: 'mdt-px-3 mdt-py-2',
      },
    },
    defaultVariants: { surface: 'light', padded: true },
  }
);

export type CodeWellVariantsType = VariantProps<typeof codeWellVariants>;
export type CodeWellSurface = 'light' | 'dark';

export interface CodeWellProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children' | 'color'> {
  /** The text to show. */
  children: ReactNode;

  /**
   * The raw value used for copying and for deciding what to reveal. Falls back
   * to `children` when it is already a string.
   */
  value?: string;

  /** @default 'light' */
  surface?: CodeWellSurface;

  /** An uppercase heading above the well. */
  label?: string;

  /** Shows a copy button. @default false */
  copyable?: boolean;

  /**
   * Starts masked, with a reveal control. Use for tokens and secrets.
   * @default false
   */
  maskable?: boolean;

  className?: string;
}

const CONTROL =
  'mdt-rounded-sm mdt-px-2 mdt-py-1 mdt-text-xs mdt-font-medium mdt-transition-colors focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring';

const CONTROL_SURFACE: Record<CodeWellSurface, string> = {
  light: 'mdt-text-muted-foreground hover:mdt-bg-background hover:mdt-text-foreground',
  dark: 'mdt-text-neutral-40 hover:mdt-bg-neutral-140 hover:mdt-text-neutral-10',
};

/**
 * CodeWell - a read-only monospace surface.
 *
 * @example
 * ```tsx
 * <CodeWell>npm install motadata-react-library</CodeWell>
 * <CodeWell surface="dark" label="Install command" copyable>curl -sSL ...</CodeWell>
 * <CodeWell maskable copyable value="sk-live-abc123">sk-live-abc123</CodeWell>
 * ```
 */
const CodeWell = forwardRef<HTMLDivElement, CodeWellProps>(
  (
    { children, value, surface = 'light', label, copyable = false, maskable = false, className, ...rest },
    ref
  ) => {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

    const raw = value ?? (typeof children === 'string' ? children : '');
    const hidden = maskable && !revealed;

    const copy = (): void => {
      void navigator.clipboard.writeText(raw);
      setCopied(true);
    };

    const showControls = copyable || maskable;

    return (
      <div ref={ref} className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', className)} {...rest}>
        {label !== undefined ? <Label>{label}</Label> : null}

        <div className="mdt-relative">
          <pre className={codeWellVariants({ surface })} data-testid="codewell-body">
            {hidden ? <SecretDots label="Hidden value" /> : children}
          </pre>

          {showControls ? (
            <div className="mdt-absolute mdt-right-1.5 mdt-top-1.5 mdt-flex mdt-gap-1">
              {maskable ? (
                <button
                  type="button"
                  className={cn(CONTROL, CONTROL_SURFACE[surface])}
                  onClick={() => {
                    setRevealed((r) => !r);
                  }}
                >
                  {revealed ? 'Hide' : 'Reveal'}
                </button>
              ) : null}
              {copyable ? (
                <button
                  type="button"
                  className={cn(CONTROL, CONTROL_SURFACE[surface])}
                  onClick={copy}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

CodeWell.displayName = 'CodeWell';

export { CodeWell };
