import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  align-self: stretch;
  ${({ theme }) => theme.shadows.cardShadow};
`;