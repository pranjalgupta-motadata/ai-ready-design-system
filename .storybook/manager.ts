import { addons } from 'storybook/manager-api';
import { darkTheme, lightTheme, prefersDark } from './themes';

addons.setConfig({
  theme: prefersDark() ? darkTheme : lightTheme,
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
