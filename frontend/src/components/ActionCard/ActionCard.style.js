import { FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';
import { CardContainer } from '../Card/Card.style';

export const ActionCardContainer = styled(CardContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const IconTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const IconImg = styled.img`
  fill: ${({ theme }) => theme.colors.primary};
`;

export const StyledChevron = styled(FiChevronRight)`
  font-size: 38px;
  margin-right: -12px;
  color: ${({ theme }) => theme.colors.primary};
`;
