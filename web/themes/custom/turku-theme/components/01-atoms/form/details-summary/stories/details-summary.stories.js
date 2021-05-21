import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../details-summary.twig';
import detailsSummaryData from './details-summary.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const detailsSummary = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper
      markup={template(detailsSummaryData)}
      label="Details and Summary"
    />
  </CollectionWrapper>
);
