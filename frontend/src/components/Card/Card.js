import React from 'react'
import PropTypes from 'prop-types'
import { CardContainer } from './Card.style'

export const Card = ({ children }) => {
  return <CardContainer>{children}</CardContainer>
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
}
