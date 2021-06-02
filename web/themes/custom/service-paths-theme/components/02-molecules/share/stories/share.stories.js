import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import shareTemplate from '../share.twig';

import shareData from './share.yml';
import shareVerticalData from './share-vertical.yml';
import shareFollowUs from './share-follow-us.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Share' };

export const share = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper markup={shareTemplate(shareData)} label="Share" />
      <ComponentWrapper
        markup={shareTemplate(shareVerticalData)}
        label="Share vertical"
      />
    </CollectionWrapper>

    <CollectionWrapper negative>
      <ComponentWrapper markup={shareTemplate(shareFollowUs)} label="Follow" />
    </CollectionWrapper>
  </>
);
