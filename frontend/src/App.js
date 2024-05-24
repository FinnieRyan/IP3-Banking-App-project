import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';

// PAGES
import { Home } from './pages/Home/Home';

// COMPONENTS
import { NavBar } from './components/NavBar/NavBar';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
