import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  display: flex;
  padding: 16px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  ${({ theme }) => theme.shadows.cardShadow};
`;
