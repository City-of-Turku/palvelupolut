import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import listDefinitionTemplate from '../list-definition.twig';
import listUnorderedTemplate from '../list-unordered.twig';
import listOrderedTemplate from '../list-ordered.twig';

import listDefinitionData from './list-definition.yml';
import listUnorderedData from './list-unordered.yml';
import listOrderedData from './list-ordered.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/List' };

export const lists = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={listUnorderedTemplate(listUnorderedData)}
      label="Unordered list"
    />
    <ComponentWrapper
      markup={listOrderedTemplate(listOrderedData)}
      label="Ordered list"
    />
    <ComponentWrapper
      markup={listDefinitionTemplate(listDefinitionData)}
      label="Definition list"
    />
  </CollectionWrapper>
);
