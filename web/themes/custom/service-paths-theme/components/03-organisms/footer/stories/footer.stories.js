import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import footerTemplate from '../footer.twig';

import footerContactData from './footer.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Footer' };

export const footer = () => (
  <ComponentWrapper markup={footerTemplate(footerContactData)} />
);
