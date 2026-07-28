import type { Preview, Decorator } from '@storybook/react-vite';
import { withDeprecationWarning } from './decorators/withDeprecationWarning';
import { darkTheme, lightTheme, prefersDark } from './themes';
import '../src/styles/globals.css';
// Covers the Docs chrome that `docs.theme` cannot reach when the Theme toolbar
// is switched manually, away from the operating system preference.
import './docs-theme.css';

/**
 * Applies the design system's own theming to the preview canvas.
 *
 * Adding `.dark` to the root element flips every semantic token, and
 * `globals.css` paints the body from `--mdt-background`. That means the canvas
 * background follows the theme on its own — there is deliberately no separate
 * `backgrounds` toolbar here. One switch, not two.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string | undefined) ?? 'light';

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  return Story();
};

// Start from the viewer's operating system setting so the interface, the Docs
// pages and the component canvas all agree by default.
const startsDark = prefersDark();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    // Docs pages are chrome, not components — Storybook paints them, so it needs
    // the theme handed to it. Without this the page renders on a hardcoded white
    // panel while the text follows the dark theme, which is unreadable.
    docs: {
      theme: startsDark ? darkTheme : lightTheme,
    },
    // No `backgrounds` parameter on purpose — the canvas is painted by the
    // design system's own `--mdt-background` token via the theme toggle above.
    // Re-adding it would hardcode colours that live in globals.css.
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Switches components and canvas between light and dark',
      defaultValue: startsDark ? 'dark' : 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withDeprecationWarning, withTheme],
  tags: ['autodocs'],
};

export default preview;
