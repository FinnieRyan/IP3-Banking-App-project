// Styled Components
import styled from 'styled-components';

// Icons
import { FiChevronRight } from 'react-icons/fi';

// Styled Components from other files
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
  align-items: center;
`;

export const IconImg = styled.img`
  fill: ${({ theme }) => theme.colors.primary};
  max-height: 45px;
  object-fit: contain;
`;

export const StyledChevron = styled(FiChevronRight)`
  font-size: 44px;
  margin-right: -14px;
  color: ${({ theme }) => theme.colors.primary};
`;
