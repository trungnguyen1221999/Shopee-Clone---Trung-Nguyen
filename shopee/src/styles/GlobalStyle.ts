// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html { font-size: 62.5%; overflow-x: hidden; } /* 1rem = 10px */

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.6;
  }

  h1 { font-size: 2.4rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.8rem; }
  h4 { font-size: 1.4rem; }
  h5 { font-size: 1.3rem; }
  h6 { font-size: 1.2rem; }

  a { text-decoration: none; color: inherit; }
  button, input { font-family: inherit; cursor: pointer; }
`;
