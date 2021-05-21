import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import menuFooterTemplate from '../menu-footer.twig';

import menuFooterData from './menu-footer.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Navigation' };

export const menuFooter = () => (
  <CollectionWrapper negative>
    <ComponentWrapper
      label="Menu Footer"
      markup={menuFooterTemplate(menuFooterData)}
    />
  </CollectionWrapper>
);
