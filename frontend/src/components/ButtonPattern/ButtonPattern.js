import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../Button/Button'
import { ButtonPatternContainer } from './ButtonPatter.style'

export const ButtonPattern = ({
  secondaryLabel = 'Secondary Button',
  primaryLabel = 'Primary Button',
}) => {
  return (
    <ButtonPatternContainer>
      <Button type="secondary">{secondaryLabel}</Button>
      <Button>{primaryLabel}</Button>
    </ButtonPatternContainer>
  )
}

ButtonPattern.propTypes = {
  secondaryLabel: PropTypes.string.isRequired,
  primaryLabel: PropTypes.string.isRequired,
}
