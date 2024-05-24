import styled from 'styled-components';
import PropTypes from 'prop-types';

const styles = {
  1: '22px',
  2: '20px',
  3: '18px',
  4: '16px',
  5: '14px',
  6: '12px',
};

export const Text = styled.p`
  font-size: ${(props) => styles[props.size >= 1 && props.size <= 6 ? props.size : 4]};
  font-weight: ${(props) => props.theme.fonts.weights[props.weight] || props.theme.fonts.weights.normal};
  color: ${(props) => props.theme.colors['text' + props.color] || props.theme.colors.textBlack};
`;

Text.propTypes = {
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'bold', 'black']),
  color: PropTypes.oneOf(['Black', 'Grey', 'Light', 'White']),
};
