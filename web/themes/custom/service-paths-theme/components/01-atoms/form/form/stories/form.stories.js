import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../form.twig';
import formData from './form.yml';
import formSearchData from './form-search.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const form = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(formData)} label="Form" />
    <ComponentWrapper markup={template(formSearchData)} label="Form search" />
  </CollectionWrapper>
);
