// React and PropTypes
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { StyledButton } from './Button.style';

export const Button = ({ type = 'primary', children, onClick, ...props }) => {
  return (
    <StyledButton type={type} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
};
