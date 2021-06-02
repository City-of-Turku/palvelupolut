import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import tagsTemplate from '../tags.twig';

import tagsData from './tags.yml';
import tagsLinkData from './tags-link.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Tags' };

export const tags = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={tagsTemplate(tagsData)} label="Tags" />
    <ComponentWrapper markup={tagsTemplate(tagsLinkData)} label="Tags link" />
  </CollectionWrapper>
);
