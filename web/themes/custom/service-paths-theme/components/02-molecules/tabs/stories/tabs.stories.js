import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import tabsTemplate from '../tabs.twig';

import tabsData from './tabs.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Tabs' };

export const tabs = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={tabsTemplate(tabsData)} label="Tabs" />
  </CollectionWrapper>
);
