// Styled Components and Animations
import styled, { keyframes } from 'styled-components';

// Icons
import { IoClose } from 'react-icons/io5';

// Styled Components from other files
import { CardContainer } from '../Card/Card.style';
import { LinkContainer } from '../Link/Link.style';

const fadeInAndBlur = keyframes`
  0% { 
    opacity: 0; 
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }
  100% { 
    opacity: 1; 
    backdrop-filter: blur(16.5px);
    -webkit-backdrop-filter: blur(16.5px);
  }
`;

export const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.33);
  animation: ${fadeInAndBlur} 0.3s ease-in-out forwards;
`;

export const ModalContainer = styled(CardContainer)`
  position: relative;
  margin: auto;
  max-width: 500px;
  width: 100%;
  margin: auto 16px;
`;

export const CloseIcon = styled(IoClose)`
  position: absolute;
  right: 20px;
  top: 12px;
  font-size: 38px;
  cursor: pointer;
`;

export const StyledLink = styled(LinkContainer)`
  width: 100% !important;
  justify-content: space-between;
  div {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;
