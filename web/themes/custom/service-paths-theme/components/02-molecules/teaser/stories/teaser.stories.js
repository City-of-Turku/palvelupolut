import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import teaserTemplate from '../teaser.twig';
import teaserData from './teaser.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Teaser' };

export const teaser = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={teaserTemplate(teaserData)} />
  </CollectionWrapper>
);
