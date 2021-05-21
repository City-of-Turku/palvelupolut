import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import headingTemplate from '../heading.twig';

import headingH1Data from './heading-h1.yml';
import headingH2Data from './heading-h2.yml';
import headingH3Data from './heading-h3.yml';
import headingH4Data from './heading-h4.yml';
import headingH5Data from './heading-h5.yml';
import headingH6Data from './heading-h6.yml';
import headingH1WithLinkData from './heading-h1-with-link.yml';
import headingH2WithLinkData from './heading-h2-with-link.yml';
import headingH3WithLinkData from './heading-h3-with-link.yml';
import headingH4WithLinkData from './heading-h4-with-link.yml';
import headingH5WithLinkData from './heading-h5-with-link.yml';
import headingH6WithLinkData from './heading-h6-with-link.yml';

import headingTitleLabelData from './heading-title-label.yml';
import headingTitleSectionSmallData from './heading-title-section-small.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

export const Heading = () => (
  <CollectionWrapper>
    <ComponentWrapper markup={headingTemplate(headingH1Data)} label="h1" />
    <ComponentWrapper markup={headingTemplate(headingH2Data)} label="h2" />
    <ComponentWrapper markup={headingTemplate(headingH3Data)} label="h3" />
    <ComponentWrapper markup={headingTemplate(headingH4Data)} label="h4" />
    <ComponentWrapper markup={headingTemplate(headingH5Data)} label="h5" />
    <ComponentWrapper markup={headingTemplate(headingH6Data)} label="h6" />
    <ComponentWrapper
      markup={headingTemplate(headingH1WithLinkData)}
      label="h1 with link"
    />
    <ComponentWrapper
      markup={headingTemplate(headingH2WithLinkData)}
      label="h2 with link"
    />
    <ComponentWrapper
      markup={headingTemplate(headingH3WithLinkData)}
      label="h3 with link"
    />
    <ComponentWrapper
      markup={headingTemplate(headingH4WithLinkData)}
      label="h4 with link"
    />
    <ComponentWrapper
      markup={headingTemplate(headingH5WithLinkData)}
      label="h5 with link"
    />
    <ComponentWrapper
      markup={headingTemplate(headingH6WithLinkData)}
      label="h6 with link"
    />
  </CollectionWrapper>
);

export const Title = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={headingTemplate(headingTitleLabelData)}
      label="Title label"
    />
    <ComponentWrapper
      markup={headingTemplate(headingTitleSectionSmallData)}
      label="Title section small"
    />
  </CollectionWrapper>
);
