import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import pageDefaultTemplate from './page-default.twig';
import pageWithSidebarTemplate from './page-with-sidebar.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Templates/Layout' };

export const defaultLayout = () => (
  <ComponentWrapper markup={pageDefaultTemplate({})} />
);

export const withSidebar = () => (
  <ComponentWrapper markup={pageWithSidebarTemplate({})} />
);
