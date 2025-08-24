import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
  }

  html, body, #root { height: 100%; }
  body {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.family.body};
    font-weight: ${({ theme }) => theme.fonts.weight.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a { color: ${({ theme }) => theme.colors.link}; }
`;


