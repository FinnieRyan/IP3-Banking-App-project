import React from 'react'
import PropTypes from 'prop-types'
import { StyledButton } from './Button.style'

export const Button = ({ type = 'primary', children, onClick }) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
}
