import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import languageSwitcherTemplate from '../language-switcher.twig';

import languageSwitcherData from './language-switcher.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Navigation' };

export const languageSwitcher = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={languageSwitcherTemplate(languageSwitcherData)} />
  </CollectionWrapper>
);
