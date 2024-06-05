// Styled Components
import styled from 'styled-components';

// Icons
import { FaRegCopy } from 'react-icons/fa6';

// Polished
import { darken, lighten } from 'polished';

export const CopyIcon = styled(FaRegCopy)`
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  fill: ${({ theme }) => theme.colors.link};

  &:hover {
    fill: ${({ theme }) => lighten(0.05, theme.colors.primary)};
  }

  &:active {
    transform: scale(0.9);
    fill: ${({ theme }) => darken(0.05, theme.colors.primary)};
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const CopyConfirmation = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: 20px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  padding: 20px 40px;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  animation: fade-in-out 2s ease-in-out forwards;
  @keyframes fade-in-out {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    85% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
