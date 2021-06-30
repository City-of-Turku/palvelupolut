import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../blockquote.twig';

import blockquoteData from './blockquote.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

export const blockquote = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper label="Blockquote" markup={template(blockquoteData)} />
  </CollectionWrapper>
);
