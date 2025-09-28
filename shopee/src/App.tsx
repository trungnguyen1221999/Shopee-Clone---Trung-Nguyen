// src/App.tsx
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import useRoutesNav from "./useRoutesNav";
import Footer from "./components/Footer";
function App() {
  const NavLinks = useRoutesNav();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {NavLinks}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
