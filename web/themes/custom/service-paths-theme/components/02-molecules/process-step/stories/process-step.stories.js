import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import processStepTemplate from '../process-step.twig';

import processStepData from './process-step.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Process Step' };

export const processSteps = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={processStepTemplate(processStepData)}
        label="Process Step"
      />
    </CollectionWrapper>
  </>
);
