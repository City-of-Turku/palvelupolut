import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import selectionBoxTemplate from '../box-selection.twig';

import selectionBoxData from './box-selection.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Box' };

export const boxSelection = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={selectionBoxTemplate(selectionBoxData)}
        label="Box Selection"
      />
    </CollectionWrapper>
  </>
);
