import styled from 'styled-components';

export const ExpensesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BarLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BarAmount = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Bar = styled.div`
  height: 10px;
  background-color: ${({ $color }) => $color};
  width: ${({ $percentage }) => $percentage}%;
  border-radius: 5px;
  min-width: 10px;
`;
