import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import contentSummaryTemplate from '../content-summary.twig';

import contentSummaryData from './content-summary.yml';
import contentSummaryTwoColumnsData from './content-summary-two-columns.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Content summary' };

export const contentSummary = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={contentSummaryTemplate(contentSummaryData)}
        label="Content summary, three column"
      />
      <ComponentWrapper
        markup={contentSummaryTemplate(contentSummaryTwoColumnsData)}
        label="Content summary, two columns"
      />
    </CollectionWrapper>
  </>
);
