import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import metaTemplate from '../meta.twig';
import metaData from './meta.yml';
import metaLightData from './meta-light.yml';
import metaDarkData from './meta-dark.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

export const meta = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={metaTemplate(metaData)} label="Meta" />
    <ComponentWrapper
      markup={metaTemplate(metaLightData)}
      label="Meta with light background"
    />
    <ComponentWrapper
      markup={metaTemplate(metaDarkData)}
      label="Meta with dark background"
    />
  </CollectionWrapper>
);
