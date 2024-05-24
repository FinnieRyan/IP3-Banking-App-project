import styled from 'styled-components'
import PropTypes from 'prop-types'

const styles = {
  1: '12px',
  2: '14px',
  3: '16px',
  4: '18px',
  5: '20px',
  6: '22px',
}

export const Text = styled.p`
  font-size: ${(props) =>
    styles[props.size >= 1 && props.size <= 6 ? props.size : 3]};
  font-weight: ${(props) =>
    props.theme.fonts.weights[props.weight] ||
    props.theme.fonts.weights.normal};
`

Text.propTypes = {
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'bold', 'black']),
}
