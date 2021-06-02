import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import menuSocialTemplate from '../menu-social.twig';

import menuSocialData from './menu-social.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Navigation' };

export const menuSocial = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={menuSocialTemplate(menuSocialData)} />
  </CollectionWrapper>
);
