import styled from 'styled-components';

const styles = {
  1: '22px',
  2: '20px',
  3: '18px',
  4: '16px',
  5: '14px',
  6: '12px',
};

export const StyledText = styled.p`
  font-size: ${({ $size }) => styles[$size] || styles[4]};
  font-weight: ${({ $weight, theme }) =>
    theme.fonts.weights[$weight] || 'normal'};
  color: ${({ $color, theme }) => theme.colors['text' + $color] || 'black'};
  line-height: 1.5;
`;
