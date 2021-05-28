import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionProcessStepsTemplate from '../section-process-steps.twig';

import sectionProcessStepsData from './section-process-steps.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionProcessSteps = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={sectionProcessStepsTemplate(sectionProcessStepsData)}
      label="Section process steps"
    />
  </CollectionWrapper>
);
