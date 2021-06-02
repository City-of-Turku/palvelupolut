import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import videoTemplate from '../video.twig';

import videoData from './video.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Videos' };

export const video = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={videoTemplate(videoData)}
      label="Video with caption"
    />
  </CollectionWrapper>
);
