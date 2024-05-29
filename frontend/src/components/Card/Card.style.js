import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 16px 20px;
  height: fit-content;
  display: flex;
  flex-direction: ${({ $row }) => ($row ? 'row' : 'column')};
  justify-content: space-between;
  gap: 20px;
  align-self: stretch;
  box-shadow: ${({ theme }) => theme.shadows.cardShadow};
`;
