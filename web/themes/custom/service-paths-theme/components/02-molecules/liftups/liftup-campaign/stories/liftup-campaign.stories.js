import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import liftupCampaignTemplate from '../liftup-campaign.twig';

import liftupCampaignData from './liftup-campaign.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Liftups' };

export const liftupCampaign = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={liftupCampaignTemplate(liftupCampaignData)}
      label="Liftup Campaign"
    />
  </CollectionWrapper>
);
