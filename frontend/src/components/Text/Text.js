// React and PropTypes
import PropTypes from 'prop-types';

// Helpers and Styles
import { toTitleCase } from '../../common/helpers/toTitleCase';
import { StyledText } from './Text.style';

export const Text = ({
  children,
  size = 4,
  weight = 'normal',
  color = 'black',
}) => {
  return (
    <StyledText $size={size} $weight={weight} $color={toTitleCase(color)}>
      {children}
    </StyledText>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'bold', 'black']),
  color: PropTypes.oneOf(['black', 'grey', 'light', 'white']),
};
