import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import template from '../select.twig';

import selectData from './select.yml';

import selectErrorData from './select-error.yml';

import selectOptgroupData from './select-optgroup.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Form' };

export const select = () => (
  <CollectionWrapper layout="medium">
    <ComponentWrapper markup={template(selectData)} label="Select field" />
    <ComponentWrapper
      markup={template(selectErrorData)}
      label="Select field with error"
    />
    <ComponentWrapper
      markup={template(selectOptgroupData)}
      label="Select field with optgroup"
    />
  </CollectionWrapper>
);
