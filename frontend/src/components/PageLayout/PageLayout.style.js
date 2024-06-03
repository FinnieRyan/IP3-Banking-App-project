import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px auto;
  max-width: ${({ theme }) => theme.sizes.tablet};
  min-width: ${({ theme }) => theme.sizes.sm};
  display: flex;
  padding: 0 16px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  gap: 32px;

  height: calc(
    100dvh - 120px
  ); /* Subtract the height of the navbar and the needed margin */
`;
