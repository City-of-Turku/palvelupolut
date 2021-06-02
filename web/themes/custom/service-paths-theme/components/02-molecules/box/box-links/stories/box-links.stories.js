import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import boxLinksTemplate from '../box-links.twig';

import boxLinksData from './box-links.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Box' };

export const boxLinks = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={boxLinksTemplate(boxLinksData)}
      label="Box links"
    />
  </CollectionWrapper>
);
