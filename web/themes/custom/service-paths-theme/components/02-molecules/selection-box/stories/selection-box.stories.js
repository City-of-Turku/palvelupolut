import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import selectionBoxTemplate from '../selection-box.twig';

import selectionBoxData from './selection-box.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Selection Box' };

export const selectionBox = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={selectionBoxTemplate(selectionBoxData)}
        label="Selection Box"
      />
    </CollectionWrapper>
  </>
);
