import styled from 'styled-components';

const styles = {
  1: '28px',
  2: '24px',
  3: '22px',
  4: '20px',
  5: '18px',
  6: '16px',
};

export const StyledHeading = styled.h1`
  font-size: ${(props) => styles[props.displayAs || props.size]};
`;
