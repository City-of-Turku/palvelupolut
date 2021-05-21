import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import textTeaserTemplate from '../text-teaser.twig';

import textTeaserData from './text-teaser.yml';

import textTeaserSmallData from './text-teaser-small.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

export const textTeaser = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={textTeaserTemplate(textTeaserData)}
      label="Text teaser"
    />
    <ComponentWrapper
      markup={textTeaserTemplate(textTeaserSmallData)}
      label="Text teaser small"
    />
  </CollectionWrapper>
);
