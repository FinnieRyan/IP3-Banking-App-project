import React from 'react';
import PropTypes from 'prop-types';
import { StyledHeading } from './Heading.style';

export const Heading = ({ size = 1, displayAs = size, white = false, children }) => {
  const HeadingComponent = `h${size}`;

  return (
    <StyledHeading as={HeadingComponent} displayAs={displayAs} white={white}>
      {children}
    </StyledHeading>
  );
};

Heading.propTypes = {
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  displayAs: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  white: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
