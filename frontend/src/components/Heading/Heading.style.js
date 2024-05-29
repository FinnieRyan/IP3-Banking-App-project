import styled from 'styled-components';

const fontSizes = {
  1: '28px',
  2: '24px',
  3: '22px',
  4: '20px',
  5: '18px',
  6: '16px',
};
const fontWeights = {
  1: 'bold',
  2: 'medium',
  3: 'medium',
  4: 'medium',
  5: 'medium',
  6: 'normal',
};

export const StyledHeading = styled.h1`
  font-size: ${({ $displayAs, size }) => fontSizes[$displayAs || size]};
  color: ${({ $color, theme }) => theme.colors['text' + $color] || 'black'};
  font-weight: ${({ theme, $displayAs, size }) =>
    theme.fonts.weights[fontWeights[$displayAs || size]]};
`;
