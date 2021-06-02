import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import liftupColumnsTemplate from '../liftup-columns.twig';

import liftupColumnsData from './liftup-columns-default.yml';

import liftupColumnsDataNoImage from './liftup-columns-no-image.yml';

import liftupColumnsDataReverse from './liftup-columns-reverse.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Liftups' };

export const liftupColumns = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={liftupColumnsTemplate(liftupColumnsData)}
      label="Liftup Columns image on the left"
    />
    <ComponentWrapper
      markup={liftupColumnsTemplate(liftupColumnsDataReverse)}
      label="Liftup Columns image on the right"
    />
    <ComponentWrapper
      markup={liftupColumnsTemplate(liftupColumnsDataNoImage)}
      label="Liftup Columns with no image"
    />
  </CollectionWrapper>
);
