// React and PropTypes
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Text } from '../Text/Text';

// Styles
import {
  ActionCardContainer,
  IconTextContainer,
  StyledChevron,
  IconImg,
} from './ActionCard.style';

export const ActionCard = ({ icon, content, subContent, onClick }) => {
  return (
    <ActionCardContainer onClick={onClick}>
      <IconTextContainer>
        <IconImg src={icon} alt="action card icon" />
        <div>
          <Text weight="medium">{content}</Text>
          {subContent && (
            <Text size={5} color="grey">
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
  icon: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  subContent: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
