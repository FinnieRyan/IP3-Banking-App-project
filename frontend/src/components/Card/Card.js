import React from 'react';
import PropTypes from 'prop-types';
import { CardContainer } from './Card.style';

export const Card = ({ children, row }) => {
  return <CardContainer $row={row}>{children}</CardContainer>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  row: PropTypes.bool,
};
