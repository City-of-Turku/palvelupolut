import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import boxApplicationsTemplate from '../box-applications.twig';

import boxApplicationsData from './box-applications.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Box' };

export const boxApplications = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={boxApplicationsTemplate(boxApplicationsData)}
      label="Box applications"
    />
  </CollectionWrapper>
);
