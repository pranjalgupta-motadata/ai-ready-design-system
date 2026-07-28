import type { Preview, Decorator } from '@storybook/react-vite';
import { withDeprecationWarning } from './decorators/withDeprecationWarning';
import '../src/styles/globals.css';

// Inter font for Storybook preview
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

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

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    // No `backgrounds` parameter on purpose — the canvas is painted by the
    // design system's own `--mdt-background` token via the theme toggle above.
    // Re-adding it would hardcode colours that live in globals.css.
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Switches components and canvas between light and dark',
      defaultValue: 'light',
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
