import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import boxSummaryTemplate from '../box-summary.twig';
import boxSummaryWysiwygTemplate from './box-summary-wysiwyg.twig';

import boxSummaryData from './box-summary.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Box' };

export const boxSummary = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={boxSummaryTemplate(boxSummaryData)}
      label="Box summary"
    />
    <ComponentWrapper
      markup={boxSummaryWysiwygTemplate()}
      label="Box summary wysiwyg"
    />
  </CollectionWrapper>
);
