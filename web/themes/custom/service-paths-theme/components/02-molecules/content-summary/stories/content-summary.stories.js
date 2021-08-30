import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import contentSummaryTemplate from '../content-summary.twig';

import contentSummaryData from './content-summary.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Content summary' };

export const contentSummary = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={contentSummaryTemplate(contentSummaryData)}
        label="Content summary"
      />
    </CollectionWrapper>
  </>
);
