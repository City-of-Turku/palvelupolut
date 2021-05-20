import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import textLongTemplate from '../text-long.twig';

import textLongData from './text-long.yml';
import textLongInlineElementsData from './text-long-inline-elements.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

export const textLong = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={textLongTemplate(textLongData)}
      label="Text long"
    />
    <ComponentWrapper
      markup={textLongTemplate(textLongInlineElementsData)}
      label="Text long with inline elements"
    />
  </CollectionWrapper>
);
