// React and PropTypes
import React from 'react';
import PropTypes from 'prop-types';

// Styled Components
import styled from 'styled-components';

// Components
import { Text } from '../Text/Text';

const DaySeparatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
`;

export const DaySeparator = ({ date, total }) => {
  return (
    <DaySeparatorContainer>
      <Text color="white" size={5}>
        {date}
      </Text>
      <Text color="white" size={5}>
        £{total}
      </Text>
    </DaySeparatorContainer>
  );
};

DaySeparator.propTypes = {
  date: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
