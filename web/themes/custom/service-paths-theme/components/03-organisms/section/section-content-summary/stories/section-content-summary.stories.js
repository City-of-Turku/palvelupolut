import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionContentSummaryTemplate from '../section-content-summary.twig';
import sectionContentSummaryData from './section-content-summary.yml';
import contactCardTemplate from '../../../../02-molecules/contact-card/contact-card.twig';
import contactCardOpeningHoursData from '../../../../02-molecules/contact-card/stories/contact-card-opening-hours.yml';

sectionContentSummaryData.section_content_summary__items[1].lead_text =
  contactCardTemplate(contactCardOpeningHoursData);

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionContentSummary = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionContentSummaryTemplate(sectionContentSummaryData)}
      label="Section contact cards"
    />
  </CollectionWrapper>
);
