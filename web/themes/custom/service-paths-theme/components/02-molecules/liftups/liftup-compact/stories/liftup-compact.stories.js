import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import liftupCompactTemplate from '../liftup-compact.twig';

import liftupCompactData from './liftup-compact.yml';
import liftupCompactImageRightData from './liftup-compact-image-right.yml';
import liftupCompactLongTextData from './liftup-compact-long-text.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Liftups' };

export const liftupCompact = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={liftupCompactTemplate(liftupCompactData)}
      label="Liftup Compact"
    />
    <ComponentWrapper
      markup={liftupCompactTemplate(liftupCompactImageRightData)}
      label="Liftup Compact with image aligned right"
    />
    <ComponentWrapper
      markup={liftupCompactTemplate(liftupCompactLongTextData)}
      label="Liftup Compact with long text"
    />
  </CollectionWrapper>
);
