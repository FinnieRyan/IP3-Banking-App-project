import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../Text/Text';
import { ActionCardContainer, IconTextContainer, StyledIcon, StyledChevron } from './ActionCard.style';

export const ActionCard = ({ content, subContent, action }) => {
  return (
    <ActionCardContainer onClick={action}>
      <IconTextContainer>
        <StyledIcon /> {/* THIS WILL NEED SWAPPED FOR REAL ICONS */}
        <div>
          <Text weight="medium">{content}</Text>
          {subContent && (
            <Text size={5} color="Grey">
              {subContent}
            </Text>
          )}
        </div>
      </IconTextContainer>
      <StyledChevron />
    </ActionCardContainer>
  );
};

ActionCard.propTypes = {
  content: PropTypes.string.isRequired,
  subContent: PropTypes.string,
  action: PropTypes.func.isRequired,
};
