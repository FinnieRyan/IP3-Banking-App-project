import styled from 'styled-components';

export const ExpensesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 12px;
`;

export const BarLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BarAmount = styled.div`
  width: 100%;
  height: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Bar = styled.div`
  height: 100%;
  background-color: ${({ $color }) => $color};
  width: ${({ $percentage }) => $percentage}%;
  border-radius: 5px;
  min-width: 10px;
`;
