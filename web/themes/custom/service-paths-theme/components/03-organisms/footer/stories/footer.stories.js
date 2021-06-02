import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import footerTemplate from '../footer.twig';

import footerMenuData from '../../../02-molecules/navigation/menu-footer/stories/menu-footer.yml';
import footerContactData from './footer.yml';
import footerSocialMenuData from '../../../02-molecules/navigation/menu-social/stories/menu-social.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Footer' };

export const footer = () => (
  <ComponentWrapper
    markup={footerTemplate({
      ...footerSocialMenuData,
      ...footerMenuData,
      ...footerContactData,
    })}
  />
);
