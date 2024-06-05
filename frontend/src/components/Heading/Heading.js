// React and PropTypes
import React from 'react';
import PropTypes from 'prop-types';

// Helpers and Styles
import { toTitleCase } from '../../common/helpers/toTitleCase';
import { StyledHeading } from './Heading.style';

export const Heading = ({
  size = 1,
  displayAs = size,
  color = 'black',
  children,
  ...props
}) => {
  const HeadingComponent = `h${size}`;

  return (
    <StyledHeading
      as={HeadingComponent}
      $displayAs={displayAs}
      $color={toTitleCase(color)}
      {...props}
    >
      {children}
    </StyledHeading>
  );
};

Heading.propTypes = {
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  displayAs: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  color: PropTypes.oneOf(['black', 'grey', 'light', 'white']),
  children: PropTypes.node.isRequired,
};
