import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import sectionWrapperListLinksTemplate from './section-wrapper-list-links.twig';
import sectionWrapperTagsTemplate from './section-wrapper-tags.twig';
import sectionWrapperShareTemplate from './section-wrapper-share.twig';

import listLinksData from '../../../../02-molecules/list-links/stories/list-links.yml';
import tagsData from '../../../../02-molecules/tags/stories/tags.yml';
import shareData from '../../../../02-molecules/share/stories/share.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Section' };

export const sectionWrapper = () => (
  <CollectionWrapper layout="narrow">
    <ComponentWrapper
      markup={sectionWrapperListLinksTemplate(listLinksData)}
      label="Section wrapper: List links"
    />
    <ComponentWrapper
      markup={sectionWrapperTagsTemplate(tagsData)}
      label="Section wrapper: Tags"
    />
    <ComponentWrapper
      markup={sectionWrapperShareTemplate({
        ...shareData,
        share__heading: null,
      })}
      label="Section wrapper: Share"
    />
  </CollectionWrapper>
);
