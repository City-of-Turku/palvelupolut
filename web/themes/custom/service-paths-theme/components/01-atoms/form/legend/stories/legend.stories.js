import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../legend.twig';
import legendData from './legend.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const legend = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(legendData)} label="Legend" />
  </CollectionWrapper>
);
