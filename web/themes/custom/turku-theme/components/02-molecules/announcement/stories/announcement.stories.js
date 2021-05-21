import React from 'react';

import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../storybook/storybook';

import announcementTemplate from '../announcement.twig';

import announcementData from './announcement.yml';
import announcementWarningData from './announcement-warning.yml';
import announcementCriticalData from './announcement-critical.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Announcement' };

export const announcement = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={announcementTemplate(announcementData)}
      label="Announcement"
    />
    <ComponentWrapper
      markup={announcementTemplate(announcementWarningData)}
      label="Warning Announcement"
    />
    <ComponentWrapper
      markup={announcementTemplate(announcementCriticalData)}
      label="Critical Announcement"
    />
  </CollectionWrapper>
);
