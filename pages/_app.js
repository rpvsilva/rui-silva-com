import '../styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import rebassTheme from '@rebass/preset';

const theme = {
  ...rebassTheme
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
