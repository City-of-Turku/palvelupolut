import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import fontawesomeIconTemplate from './fontawesome-icons.twig';

import fontawesomeIconData from './fontawesome-icons.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const fontawesomeIcons = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={fontawesomeIconTemplate(fontawesomeIconData)} />
  </CollectionWrapper>
);

fontawesomeIcons.parameters = {
  a11y: {
    disable: true,
  },
  docs: {
    disable: true,
  },
  html: {
    disable: true,
  },
};
