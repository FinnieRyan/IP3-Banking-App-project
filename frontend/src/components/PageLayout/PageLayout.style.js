import styled from 'styled-components'

export const Container = styled.div`
  margin: 30px auto;
  max-width: ${({ theme }) => theme.sizes.tablet};
  min-width: ${({ theme }) => theme.sizes.sm};
  display: flex;
  padding: 0 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  gap: 20px;
`
