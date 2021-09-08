import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import linkTemplate from '../link.twig';

import linkData from './link.yml';
import linkExternalData from './link-external.yml';
import linkBackToTopData from './link-back-to-top.yml';
import linkIconData from './link-icon.yml';
import linkIconAttachmentData from './link-icon-attachment.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Links' };

export const link = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={linkTemplate(linkData)} label="Link" />
    <ComponentWrapper
      markup={linkTemplate(linkExternalData)}
      label="Link, external"
    />
    <ComponentWrapper
      markup={linkTemplate(linkBackToTopData)}
      label="Link back to top"
    />
    <ComponentWrapper markup={linkTemplate(linkIconData)} label="Link icon" />
    <ComponentWrapper
      markup={linkTemplate(linkIconAttachmentData)}
      label="Link icon with attachment"
    />
  </CollectionWrapper>
);
