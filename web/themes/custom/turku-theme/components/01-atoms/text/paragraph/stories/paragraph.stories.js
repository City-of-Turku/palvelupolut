import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import paragraphTemplate from './paragraph.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

export const paragraph = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={paragraphTemplate({})} />
  </CollectionWrapper>
);
