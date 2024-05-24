import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';

// COMPONENTS
import { PageLayout } from './components/PageLayout/PageLayout';
import { Text } from './components/Text/Text';
import { Card } from './components/Card/Card';
import { Heading } from './components/Heading/Heading';
import { Button } from './components/Button/Button';
import { ButtonPattern } from './components/ButtonPattern/ButtonPattern';
import { NavBar } from './components/NavBar/NavBar';
import { HR } from './components/HR/HR';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <NavBar />
        <PageLayout>
          <Text>This is the app content</Text>
          <Card>This is a card</Card>
          <Card>
            <Heading size={2}>This is a card</Heading>
            <Button type="secondary">hello</Button>
            <HR />
            <Button>hello</Button>
          </Card>
          <ButtonPattern />
        </PageLayout>
      </Router>
    </ThemeProvider>
  );
};
