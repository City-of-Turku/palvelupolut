import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import breadcrumbsTemplate from '../breadcrumbs.twig';

import breadcrumbsData from './breadcrumbs.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Navigation' };

export const breadcrumbs = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={breadcrumbsTemplate(breadcrumbsData)} />
  </CollectionWrapper>
);
