import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkContainer = styled(Link)`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: center;
  gap: 5px;
  margin: 0.5rem 0;
  white-space: nowrap;
  width: fit-content;
`;

export const LinkText = styled.span`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
