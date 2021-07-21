import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import labelTemplate from '../label.twig';

import labelData from './label.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

export const Label = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={labelTemplate(labelData)} />
  </CollectionWrapper>
);
