import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import buttonTemplate from '../button.twig';

import buttonData from './button.yml';
import buttonSmallData from './button-small.yml';
import buttonInverseData from './button-inverse.yml';
import buttonInverseSmallData from './button-inverse-small.yml';
import buttonMinimalData from './button-minimal.yml';
import buttonVisuallyHiddenTextData from './button-visually-hidden-text.yml';

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
        markup={buttonTemplate(buttonMinimalData)}
        label="Button minimal"
      />
      <ComponentWrapper
        markup={buttonTemplate(buttonVisuallyHiddenTextData)}
        label="Button visually hidden text"
      />
    </CollectionWrapper>

    <CollectionWrapper negative>
      <ComponentWrapper
        markup={buttonTemplate(buttonInverseData)}
        label="Button inverse"
      />
      <ComponentWrapper
        markup={buttonTemplate(buttonInverseSmallData)}
        label="Button inverse, small"
      />
    </CollectionWrapper>
  </>
);
