import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import colors from './colors.twig';

import colorsData from './colors.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Base/Colors' };

export const Palettes = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={colors({
          ...colorsData,
          colors_theme: 'default',
        })}
        label="Light theme (default)"
      />
    </CollectionWrapper>
    <CollectionWrapper negative>
      <ComponentWrapper
        markup={colors({
          ...colorsData,
          colors_theme: 'dark',
        })}
        label="Dark theme"
      />
    </CollectionWrapper>
  </>
);
