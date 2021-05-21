import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../description.twig';

import descriptionData from './description.yml';

import descriptionErrorData from './description-error.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const description = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(descriptionData)} label="Description" />
    <ComponentWrapper
      markup={template(descriptionErrorData)}
      label="Description with error"
    />
  </CollectionWrapper>
);
