import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import textCaptionTemplate from '../text-caption.twig';

import textCaptionData from './text-caption.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Text' };

export const textCaption = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={textCaptionTemplate(textCaptionData)}
      label="Text caption"
    />
  </CollectionWrapper>
);
