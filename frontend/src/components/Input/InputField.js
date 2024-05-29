import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';

const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  &.scrollable:not(.scrolled-left)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    pointer-events: none;
  }

  &.scrollable:not(.scrolled-right)::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    pointer-events: none;
  }
`;

const StyledInput = styled.input`
  font-weight: ${({ $weight, theme }) =>
    theme.fonts.weights[$weight] || 'normal'};
  color: ${({ $color, theme }) => theme.colors['text' + $color] || 'black'};
  line-height: 1.5;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
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
  ...props
}) => {
  const inputRef = useRef();

  useEffect(() => {
    const inputEl = inputRef.current;
    const wrapperEl = inputEl.parentElement;

    if (inputEl.scrollWidth > inputEl.clientWidth) {
      wrapperEl.classList.add('scrollable');
    } else {
      wrapperEl.classList.remove('scrollable');
    }
  }, [value]);

  const handleScroll = (e) => {
    const inputEl = e.target;
    const wrapperEl = inputEl.parentElement;

    if (inputEl.scrollLeft + inputEl.clientWidth >= inputEl.scrollWidth) {
      wrapperEl.classList.add('scrolled-right');
    } else {
      wrapperEl.classList.remove('scrolled-right');
    }

    if (inputEl.scrollLeft === 0) {
      wrapperEl.classList.add('scrolled-left');
    } else {
      wrapperEl.classList.remove('scrolled-left');
    }
  };

  return (
    <Card row>
      <Text>{label}</Text>
      <InputWrapper>
        <StyledInput
          ref={inputRef}
          value={value}
          onChange={onChange}
          onScroll={handleScroll}
          readOnly={readOnly}
          {...props}
        />
      </InputWrapper>
    </Card>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};
