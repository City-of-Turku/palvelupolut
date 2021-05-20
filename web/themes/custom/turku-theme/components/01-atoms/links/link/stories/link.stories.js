import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import linkTemplate from '../link.twig';

import linkData from './link.yml';
import linkExternalData from './link-external.yml';
import linkActionData from './link-action.yml';
import linkActiveData from './link-active.yml';
import linkInverseData from './link-inverse.yml';
import linkActiveInverseData from './link-active-inverse.yml';
import linkBackToTopData from './link-back-to-top.yml';
import linkIconData from './link-icon.yml';
import linkIconAttachmentData from './link-icon-attachment.yml';
import linkIconAttachmentCompact from './link-icon-attachment-compact.yml';
import linkQuickData from './link-quick.yml';
import linkQuickExternalData from './link-quick-external.yml';
import linkTabData from './link-tab.yml';
import linkTabActiveData from './link-tab-active.yml';

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
      markup={linkTemplate(linkActiveData)}
      label="Link, active"
    />
    <ComponentWrapper
      markup={linkTemplate(linkActionData)}
      label="Link action"
    />
    <ComponentWrapper
      markup={linkTemplate(linkInverseData)}
      label="Link inverse"
    />
    <ComponentWrapper
      markup={linkTemplate(linkActiveInverseData)}
      label="Link inverse, active"
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
    <ComponentWrapper
      markup={linkTemplate(linkIconAttachmentCompact)}
      label="Link icon with attachment, compact"
    />
    <ComponentWrapper markup={linkTemplate(linkQuickData)} label="Link quick" />
    <ComponentWrapper
      markup={linkTemplate(linkQuickExternalData)}
      label="Link quick, external"
    />
    <ComponentWrapper markup={linkTemplate(linkTabData)} label="Tab" />
    <ComponentWrapper
      markup={linkTemplate(linkTabActiveData)}
      label="Active tab"
    />
  </CollectionWrapper>
);
