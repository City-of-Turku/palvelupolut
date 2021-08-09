import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import statusTemplate from '../status.twig';

import statusData from './status.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Status' };

export const Status = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={statusTemplate(statusData)} />
  </CollectionWrapper>
);
