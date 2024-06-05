// React and PropTypes
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { CardContainer } from './Card.style';

export const Card = ({ children, row, ...props }) => {
  return (
    <CardContainer $row={row} {...props}>
      {children}
    </CardContainer>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  row: PropTypes.bool,
};
