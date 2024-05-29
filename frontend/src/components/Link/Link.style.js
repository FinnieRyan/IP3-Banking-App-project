import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkContainer = styled(({ inline, ...props }) => (
  <Link {...props} />
))`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  width: fit-content;
  color: ${({ theme, $white }) => $white && theme.colors.textWhite};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
