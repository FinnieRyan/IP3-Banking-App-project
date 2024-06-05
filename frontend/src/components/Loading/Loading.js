import styled, { useTheme } from 'styled-components';
import { PuffLoader } from 'react-spinners';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85dvh;
`;

export const Loading = () => {
  const theme = useTheme();
  return (
    <Container>
      <PuffLoader color={theme.colors.primary} size={300} />
    </Container>
  );
};
