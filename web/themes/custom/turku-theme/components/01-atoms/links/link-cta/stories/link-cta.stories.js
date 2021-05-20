import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import linkCtaTemplate from '../link-cta.twig';

import linkCtaData from './link-cta.yml';
import linkCtaInverseData from './link-cta-inverse.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Links' };

export const linkCTA = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={linkCtaTemplate(linkCtaData)}
        label="Link CTA"
      />
    </CollectionWrapper>

    <CollectionWrapper negative>
      <ComponentWrapper
        markup={linkCtaTemplate(linkCtaInverseData)}
        label="Link CTA, inverse"
      />
    </CollectionWrapper>
  </>
);
