import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import dialogTemplate from '../dialog.twig';
import dialogData from './dialog.yml';
import dialogSecondData from './dialog-second.yml';
import '../dialog';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Dialog' };

export const dialog = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={dialogTemplate(dialogData)} label="Dialog" />
    <ComponentWrapper
      markup={dialogTemplate(dialogSecondData)}
      label="Another dialog"
    />
  </CollectionWrapper>
);
