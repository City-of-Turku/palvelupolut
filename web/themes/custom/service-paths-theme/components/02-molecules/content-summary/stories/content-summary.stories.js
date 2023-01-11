import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import contentSummaryTemplate from '../content-summary.twig';
import contentSummaryData from './content-summary.yml';
import contentSummaryTwoColumnsData from './content-summary-two-columns.yml';
import contactCardTemplate from '../../contact-card/contact-card.twig';
import contactCardOpeningHoursData from '../../contact-card/stories/contact-card-opening-hours.yml';

contentSummaryTwoColumnsData.content_summary__lead_text = contactCardTemplate(
  contactCardOpeningHoursData,
);

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
