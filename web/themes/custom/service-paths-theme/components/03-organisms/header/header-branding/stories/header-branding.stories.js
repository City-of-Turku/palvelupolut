import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import headerBrandingTemplate from '../header-branding.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Header' };

export const headerBranding = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={headerBrandingTemplate()}
      label="Site header branding"
    />
  </CollectionWrapper>
);
