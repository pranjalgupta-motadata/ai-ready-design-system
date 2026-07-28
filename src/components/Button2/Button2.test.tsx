import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Button2 } from './Button2';
import type { Button2Size, Button2Variant } from './Button2.types';

const SPINNER = 'button2-spinner';
const LABEL = 'Save changes';
const ARIA_BUSY = 'aria-busy';

const getButton = () => screen.getByRole('button');

describe('Button2', () => {
  describe('rendering', () => {
    it('renders its label', () => {
      render(<Button2>{LABEL}</Button2>);
      expect(getButton()).toHaveTextContent(LABEL);
    });

    it('defaults to type="button" so it never submits a form by accident', () => {
      render(<Button2>{LABEL}</Button2>);
      expect(getButton()).toHaveAttribute('type', 'button');
    });

    it('allows the type to be overridden', () => {
      render(<Button2 type="submit">{LABEL}</Button2>);
      expect(getButton()).toHaveAttribute('type', 'submit');
    });

    it('merges a custom className', () => {
      render(<Button2 className="mdt-mt-4">{LABEL}</Button2>);
      expect(getButton()).toHaveClass('mdt-mt-4');
    });

    it('forwards a ref', () => {
      const ref = createRef<HTMLButtonElement & HTMLAnchorElement>();
      render(<Button2 ref={ref}>{LABEL}</Button2>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('variants', () => {
    const cases: Array<[Button2Variant, string]> = [
      ['primary', 'mdt-bg-primary'],
      ['secondary', 'mdt-bg-secondary'],
      ['outline', 'mdt-border-input'],
      ['ghost', 'mdt-text-foreground'],
      ['link', 'mdt-underline-offset-4'],
      ['destructive', 'mdt-bg-destructive'],
      ['success', 'mdt-bg-success'],
    ];

    it.each(cases)('applies the %s variant', (variant, expected) => {
      render(<Button2 variant={variant}>{LABEL}</Button2>);
      expect(getButton()).toHaveClass(expected);
    });

    it('uses primary when no variant is given', () => {
      render(<Button2>{LABEL}</Button2>);
      expect(getButton()).toHaveClass('mdt-bg-primary');
    });
  });

  describe('sizes', () => {
    const cases: Array<[Button2Size, string]> = [
      ['xs', 'mdt-h-7'],
      ['sm', 'mdt-h-8'],
      ['md', 'mdt-h-9'],
      ['lg', 'mdt-h-10'],
      ['xl', 'mdt-h-12'],
    ];

    it.each(cases)('applies the %s size', (size, expected) => {
      render(<Button2 size={size}>{LABEL}</Button2>);
      expect(getButton()).toHaveClass(expected);
    });
  });

  describe('radius', () => {
    it('defaults to md corners', () => {
      render(<Button2>{LABEL}</Button2>);
      expect(getButton()).toHaveClass('mdt-rounded-md');
    });

    it('applies square corners', () => {
      render(<Button2 radius="none">{LABEL}</Button2>);
      expect(getButton()).toHaveClass('mdt-rounded-none');
    });

    it('applies a pill', () => {
      render(<Button2 radius="full">{LABEL}</Button2>);
      expect(getButton()).toHaveClass('mdt-rounded-full');
    });

    it('applies small and large corners', () => {
      const { rerender } = render(<Button2 radius="sm">{LABEL}</Button2>);
      expect(getButton()).toHaveClass('mdt-rounded-sm');
      rerender(<Button2 radius="lg">{LABEL}</Button2>);
      expect(getButton()).toHaveClass('mdt-rounded-lg');
    });
  });

  describe('elevation', () => {
    it('is flat by default', () => {
      render(<Button2>{LABEL}</Button2>);
      expect(getButton().className).not.toContain('mdt-shadow');
    });

    it.each([
      [1, 'mdt-shadow-sm'],
      [2, 'mdt-shadow-md'],
      [3, 'mdt-shadow-lg'],
    ] as const)('applies elevation %s', (level, expected) => {
      render(<Button2 elevation={level}>{LABEL}</Button2>);
      expect(getButton()).toHaveClass(expected);
    });
  });

  describe('icon layouts', () => {
    it('renders a start icon before the label', () => {
      render(<Button2 startIcon={<span data-testid="start" />}>{LABEL}</Button2>);
      expect(screen.getByTestId('start')).toBeInTheDocument();
      expect(getButton()).toHaveTextContent(LABEL);
    });

    it('renders an end icon after the label', () => {
      render(<Button2 endIcon={<span data-testid="end" />}>{LABEL}</Button2>);
      expect(screen.getByTestId('end')).toBeInTheDocument();
    });

    it('renders both icons at once', () => {
      render(
        <Button2 startIcon={<span data-testid="start" />} endIcon={<span data-testid="end" />}>
          {LABEL}
        </Button2>
      );
      expect(screen.getByTestId('start')).toBeInTheDocument();
      expect(screen.getByTestId('end')).toBeInTheDocument();
    });

    it('squares itself when there is no label', () => {
      render(<Button2 startIcon={<span data-testid="start" />} aria-label="Add" />);
      const button = getButton();
      expect(button).toHaveClass('mdt-w-9');
      expect(button).toHaveClass('mdt-px-0');
    });

    it('does not square itself when a label is present', () => {
      render(<Button2 startIcon={<span />}>{LABEL}</Button2>);
      expect(getButton()).not.toHaveClass('mdt-px-0');
    });

    it('sizes the icon-only square to match the size prop', () => {
      render(<Button2 size="xl" startIcon={<span />} aria-label="Add" />);
      expect(getButton()).toHaveClass('mdt-w-12');
    });

    it('names an icon-only button for screen readers', () => {
      render(<Button2 startIcon={<span />} aria-label="Delete item" />);
      expect(screen.getByRole('button', { name: 'Delete item' })).toBeInTheDocument();
    });
  });

  describe('accessibility guard', () => {
    // This warning is now the only thing catching an unlabelled icon-only
    // button, so it needs to actually fire.
    it('warns when an icon-only button has no aria-label', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(<Button2 startIcon={<span />} />);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('aria-label'));
      warn.mockRestore();
    });

    it('warns when aria-label is an empty string', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(<Button2 startIcon={<span />} aria-label="" />);
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });

    it('stays quiet when an icon-only button is labelled', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(<Button2 startIcon={<span />} aria-label="Add" />);
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });

    it('stays quiet when there is a visible label', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(<Button2>{LABEL}</Button2>);
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });
  });

  describe('loading', () => {
    it('shows a spinner', () => {
      render(<Button2 loading>{LABEL}</Button2>);
      expect(screen.getByTestId(SPINNER)).toBeInTheDocument();
    });

    it('keeps the label visible', () => {
      render(<Button2 loading>{LABEL}</Button2>);
      expect(getButton()).toHaveTextContent(LABEL);
    });

    it('swaps in loadingText when given', () => {
      render(
        <Button2 loading loadingText="Saving…">
          {LABEL}
        </Button2>
      );
      expect(getButton()).toHaveTextContent('Saving…');
      expect(getButton()).not.toHaveTextContent(LABEL);
    });

    it('replaces the start icon rather than sitting beside it', () => {
      render(
        <Button2 loading startIcon={<span data-testid="start" />}>
          {LABEL}
        </Button2>
      );
      expect(screen.queryByTestId('start')).not.toBeInTheDocument();
      expect(screen.getByTestId(SPINNER)).toBeInTheDocument();
    });

    it('hides the end icon', () => {
      render(
        <Button2 loading endIcon={<span data-testid="end" />}>
          {LABEL}
        </Button2>
      );
      expect(screen.queryByTestId('end')).not.toBeInTheDocument();
    });

    it('disables the button and announces itself as busy', () => {
      render(<Button2 loading>{LABEL}</Button2>);
      expect(getButton()).toBeDisabled();
      expect(getButton()).toHaveAttribute(ARIA_BUSY, 'true');
    });

    it('does not fire onClick while loading', async () => {
      const onClick = vi.fn();
      render(
        <Button2 loading onClick={onClick}>
          {LABEL}
        </Button2>
      );
      await userEvent.click(getButton(), { pointerEventsCheck: 0 });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('is not busy when idle', () => {
      render(<Button2>{LABEL}</Button2>);
      expect(getButton()).not.toHaveAttribute(ARIA_BUSY);
    });
  });

  describe('interaction', () => {
    it('calls onClick', async () => {
      const onClick = vi.fn();
      render(<Button2 onClick={onClick}>{LABEL}</Button2>);
      await userEvent.click(getButton());
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('activates on Enter', async () => {
      const onClick = vi.fn();
      render(<Button2 onClick={onClick}>{LABEL}</Button2>);
      getButton().focus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalled();
    });

    it('does not respond when disabled', async () => {
      const onClick = vi.fn();
      render(
        <Button2 disabled onClick={onClick}>
          {LABEL}
        </Button2>
      );
      expect(getButton()).toBeDisabled();
      await userEvent.click(getButton(), { pointerEventsCheck: 0 });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('as a link', () => {
    const HREF = 'https://example.com';

    it('renders an anchor when href is given', () => {
      render(<Button2 href={HREF}>{LABEL}</Button2>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', HREF);
    });

    it('keeps the button styling', () => {
      render(
        <Button2 href={HREF} variant="destructive">
          {LABEL}
        </Button2>
      );
      expect(screen.getByRole('link')).toHaveClass('mdt-bg-destructive');
    });

    it('passes through target', () => {
      render(
        <Button2 href={HREF} target="_blank">
          {LABEL}
        </Button2>
      );
      expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    });

    it('removes the href when disabled, since a link cannot be disabled natively', () => {
      render(
        <Button2 href={HREF} disabled>
          {LABEL}
        </Button2>
      );
      const link = screen.getByText(LABEL).closest('a');
      expect(link).not.toHaveAttribute('href');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('is inert while loading', () => {
      render(
        <Button2 href={HREF} loading>
          {LABEL}
        </Button2>
      );
      const link = screen.getByText(LABEL).closest('a');
      expect(link).not.toHaveAttribute('href');
      expect(link).toHaveAttribute(ARIA_BUSY, 'true');
    });

    it('renders an icon-only link', () => {
      render(<Button2 href={HREF} startIcon={<span />} aria-label="Open" />);
      expect(screen.getByRole('link', { name: 'Open' })).toBeInTheDocument();
    });
  });
});
