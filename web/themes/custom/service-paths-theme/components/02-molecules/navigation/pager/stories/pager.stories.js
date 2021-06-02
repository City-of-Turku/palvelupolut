import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import pagerTemplate from '../pager.twig';

import pagerData from './pager.yml';
import pagerEllipsesData from './pager-ellipses.yml';
import pagerPrevEllipsesData from './pager-prev-ellipses.yml';
import pagerBothEllipsesData from './pager-both-ellipses.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Navigation' };

export const pager = () => (
  <CollectionWrapper>
    <ComponentWrapper label="Pager" markup={pagerTemplate(pagerData)} />
    <ComponentWrapper
      label="Pager with next ellipses"
      markup={pagerTemplate({ ...pagerData, ...pagerEllipsesData })}
    />
    <ComponentWrapper
      label="Pager with both ellipses"
      markup={pagerTemplate({ ...pagerData, ...pagerBothEllipsesData })}
    />
    <ComponentWrapper
      label="Pager with previous ellipses"
      markup={pagerTemplate({ ...pagerData, ...pagerPrevEllipsesData })}
    />
  </CollectionWrapper>
);
