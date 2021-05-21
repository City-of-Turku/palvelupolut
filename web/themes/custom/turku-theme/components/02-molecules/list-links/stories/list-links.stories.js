import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import listLinksTemplate from '../list-links.twig';

import listLinksData from './list-links.yml';
import listLinksActionData from './list-links-action.yml';
import listLinksIconData from './list-links-icon.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/List links' };

export const listLinks = () => (
  <>
    <CollectionWrapper>
      <ComponentWrapper
        markup={listLinksTemplate(listLinksData)}
        label="Link list"
      />
      <ComponentWrapper
        markup={listLinksTemplate(listLinksActionData)}
        label="Link list action"
      />
      <ComponentWrapper
        markup={listLinksTemplate(listLinksIconData)}
        label="Link list icons"
      />
    </CollectionWrapper>
  </>
);
