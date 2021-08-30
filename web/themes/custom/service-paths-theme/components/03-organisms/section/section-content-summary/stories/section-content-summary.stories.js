import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionContentSummaryTemplate from '../section-content-summary.twig';

import sectionContentSummaryData from './section-content-summary.yml';

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
