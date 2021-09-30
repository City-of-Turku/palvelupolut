import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import buttonTemplate from '../button.twig';

import buttonData from './button.yml';
import buttonSmallData from './button-small.yml';
import buttonInverseData from './button-inverse.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Button' };

export const button = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper markup={buttonTemplate(buttonData)} label="Button" />
      <ComponentWrapper
        markup={buttonTemplate(buttonSmallData)}
        label="Button small"
      />
      <ComponentWrapper
        markup={buttonTemplate(buttonInverseData)}
        label="Button secondary"
      />
    </CollectionWrapper>
  </>
);
