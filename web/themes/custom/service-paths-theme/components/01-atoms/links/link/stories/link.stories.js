import React from 'react';
import { useEffect } from '@storybook/client-api';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import linkTemplate from '../link.twig';

import linkData from './link.yml';
import linkExternalData from './link-external.yml';
import linkIconData from './link-icon.yml';
import linkEnhancedData from './link-enhanced.yml';
import '../link';

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
    <ComponentWrapper markup={linkTemplate(linkIconData)} label="Link icon" />
    <ComponentWrapper
      markup={linkTemplate(linkEnhancedData)}
      label="Link enhanced"
    />
  </CollectionWrapper>
);
