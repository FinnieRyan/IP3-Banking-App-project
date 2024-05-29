import styled from 'styled-components'

const styles = {
  1: '28px',
  2: '24px',
  3: '22px',
  4: '20px',
  5: '18px',
  6: '16px',
}

export const StyledHeading = styled.h1`
  font-size: ${({ $displayAs, size }) => styles[$displayAs || size]};
  color: ${({ $color, theme }) => theme.colors['text' + $color] || 'black'};
`;
