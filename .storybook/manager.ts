import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Motadata React Library',
  brandUrl: 'https://github.com/motadata/motadata-react-library',
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#3b82f6',
  colorSecondary: '#3b82f6',

  // UI
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,

  // Text colors
  textColor: '#1e293b',
  textInverseColor: '#f8fafc',
  textMutedColor: '#64748b',

  // Toolbar default and active colors
  barTextColor: '#64748b',
  barSelectedColor: '#3b82f6',
  barHoverColor: '#3b82f6',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#1e293b',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
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
