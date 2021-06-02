import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import tablesTemplate from './tables.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Tables' };

export const table = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={tablesTemplate({})} />
  </CollectionWrapper>
);
