import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import styled from 'styled-components';

const StyledInput = styled.input`
  font-weight: ${({ $weight, theme }) =>
    theme.fonts.weights[$weight] || 'normal'};
  color: ${({ $color, theme }) => theme.colors['text' + $color] || 'black'};
  line-height: 1.5;
  border: none;
  outline: none;
  background: transparent;
  width: auto;
  min-width: 50px;
  text-align: right;
  cursor: ${({ readOnly }) => (readOnly ? 'default' : 'text')};
  user-select: ${({ readOnly }) => (readOnly ? 'none' : 'auto')};
`;

export const InputField = ({
  label = '',
  value,
  onChange = () => {},
  readOnly = false,
}) => (
  <Card row>
    <Text>{label}</Text>
    <StyledInput value={value} onChange={onChange} readOnly={readOnly} />
  </Card>
);

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};
