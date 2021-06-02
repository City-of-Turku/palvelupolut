// Documentation on theming Storybook: https://storybook.js.org/docs/configurations/theming/

import { create } from '@storybook/theming';

export default create({
  base: 'light',
  // Branding
  brandTitle: 'Emulsify design system',
  brandUrl: 'https://wunder.io',
  brandImage:
    'logo.png',
});
