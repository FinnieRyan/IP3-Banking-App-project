// Polished and React
import React from 'react';
import { darken, lighten } from 'polished';

// Styled Components
import styled from 'styled-components';

export const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ children }) =>
    React.Children.count(children) > 1 ? 'space-between' : 'center'};
  cursor: pointer;
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  width: 100%;
  padding: 15px 20px;
  color: ${({ type }) => (type === 'primary' ? 'white' : 'black')};
  background-color: ${({ theme, type }) =>
    type === 'primary' ? theme.colors.primary : '#ececec'};
  border: solid 1px
    ${({ type }) => (type === 'primary' ? '#244981' : '#BDBDBD')};
  border-radius: 20px;

  transition: transform 0.1s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    border: 2px solid transparent;
    background: linear-gradient(
        180deg,
        ${({ type }) =>
          type === 'primary'
            ? 'rgba(255, 255, 255, 0.4)'
            : 'rgba(255, 255, 255, 1)'},
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0)
      )
      border-box;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  &:hover {
    background-color: ${({ theme, type }) =>
      type === 'primary'
        ? lighten(0.05, theme.colors.primary)
        : lighten(0.02, '#ececec')};
  }

  &:active {
    background-color: ${({ theme, type }) =>
      type === 'primary'
        ? darken(0.05, theme.colors.primary)
        : darken(0.02, '#ececec')};
    transform: scale(0.98) translateY(2px);
  }
`;
