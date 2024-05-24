import styled from 'styled-components'

export const HR = styled.hr`
  border: solid 1px ${({ theme }) => theme.colors.grey};
  border-radius: 5px;
  margin: ${({ $verticalCenter }) =>
    $verticalCenter ? '1rem 0 1rem 0' : '0.5rem 0 1rem 0'};
`
