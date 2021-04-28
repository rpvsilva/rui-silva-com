import '../styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import rebassTheme from '@rebass/preset';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const theme = {
  ...rebassTheme
};

function MyApp({ Component, pageProps }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_CLIENT}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
