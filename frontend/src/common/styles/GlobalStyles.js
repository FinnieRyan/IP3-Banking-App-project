import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  /* set up default styles for web site */
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    min-height: 100vh;
    font-family: ${({ theme }) =>
      theme.fonts
        .familySans}, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue';
    color: ${({ theme }) => theme.colors.textBlack};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* remove default margin and padding from text */
  h1, h2, h3, h4, h5, h6, p, ul, figure, blockquote, dl, dd {
    padding: 0;
    margin: 0;
  }

  /* remove default styling from buttons */
  button {
    border: none;
    background-color: transparent;
    font-family: inherit;
    padding: 0;
    cursor: pointer;
  }

  /* remove blue focus outline from inputs */
  button:focus,
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  /* remove ios styling of selects and manually add arrow back in */
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 20px;
    background-color: transparent;
    background-image: linear-gradient(45deg, transparent 50%, #aaa 50%),
                      linear-gradient(-45deg, transparent 50%, #aaa 50%);
    background-position: right 15px top 50%, right 10px top 50%;
    background-size: 5px 5px;
    background-repeat: no-repeat;
  }

  /* set up default styling from links */
  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  /* remove default styling from lists */
  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }
  li {
    list-style-type: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }
`;
