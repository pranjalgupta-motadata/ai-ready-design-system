import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

/**
 * Storybook's own interface (sidebar, toolbar, panels).
 *
 * The manager runs outside the preview iframe, so it cannot read the CSS
 * variables in `globals.css`. The values below are therefore mirrored from the
 * design system by hand.
 *
 * KEEP IN SYNC WITH: src/styles/globals.css and TOKENS.md
 * Every value here is a real system token — no stray colours.
 */

// --- Mirrored token values (see TOKENS.md) -------------------------------
const BLUE_50 = '#3d7dff'; // --mdt-blue-50   : primary / accent
const WHITE = '#ffffff'; // --mdt-white
const BLACK = '#070f1d'; // --mdt-black     : hsl(218 63% 7%)
const NEUTRAL_10 = '#f6f9fc'; // --mdt-neutral-10
const NEUTRAL_40 = '#cad3e2'; // --mdt-neutral-40 : light border
const NEUTRAL_90 = '#516381'; // --mdt-neutral-90 : dark border
const NEUTRAL_100 = '#485975'; // --mdt-neutral-100: muted text
const NEUTRAL_150 = '#111c2c'; // --mdt-neutral-150: dark surface
const NEUTRAL_160 = '#0b1628'; // --mdt-neutral-160: dark background

// --mdt-radius is 0.5rem (8px); inputs use the derived `md` step (8 - 2)
const RADIUS = 8;
const RADIUS_MD = 6;

const brand = {
  brandTitle: 'Motadata React Library',
  brandUrl: 'https://github.com/pranjalgupta-motadata/ai-ready-design-system',
  brandTarget: '_blank' as const,
};

const lightTheme = create({
  ...brand,
  base: 'light',

  colorPrimary: BLUE_50,
  colorSecondary: BLUE_50,

  appBg: NEUTRAL_10,
  appContentBg: WHITE,
  appPreviewBg: WHITE,
  appBorderColor: NEUTRAL_40,
  appBorderRadius: RADIUS,

  textColor: BLACK,
  textInverseColor: NEUTRAL_10,
  textMutedColor: NEUTRAL_100,

  barTextColor: NEUTRAL_100,
  barSelectedColor: BLUE_50,
  barHoverColor: BLUE_50,
  barBg: WHITE,

  inputBg: WHITE,
  inputBorder: NEUTRAL_40,
  inputTextColor: BLACK,
  inputBorderRadius: RADIUS_MD,
});

const darkTheme = create({
  ...brand,
  base: 'dark',

  colorPrimary: BLUE_50,
  colorSecondary: BLUE_50,

  appBg: NEUTRAL_160,
  appContentBg: NEUTRAL_150,
  appPreviewBg: NEUTRAL_160,
  appBorderColor: NEUTRAL_90,
  appBorderRadius: RADIUS,

  textColor: NEUTRAL_10,
  textInverseColor: BLACK,
  textMutedColor: NEUTRAL_40,

  barTextColor: NEUTRAL_40,
  barSelectedColor: BLUE_50,
  barHoverColor: BLUE_50,
  barBg: NEUTRAL_150,

  inputBg: NEUTRAL_150,
  inputBorder: NEUTRAL_90,
  inputTextColor: NEUTRAL_10,
  inputBorderRadius: RADIUS_MD,
});

/**
 * Follow the viewer's operating system setting. Someone browsing in dark mode
 * gets a dark Storybook without touching anything.
 */
const prefersDark =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
