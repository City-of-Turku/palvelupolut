import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import searchKeywordTemplate from '../search-keyword.twig';

import searchKeywordData from './search-keyword.yml';

import '../search-keyword';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Search' };

export const searchKeyword = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={searchKeywordTemplate(searchKeywordData)}
        label="searchKeyword"
      />
    </CollectionWrapper>
  </>
);
