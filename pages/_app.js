import { ThemeProvider } from 'next-themes';
import { NavBar, Footer } from '../components';
import Script from 'next/script';

import './globals.css';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
    <Script src="https://kit.fontawesome.com/d6eb679684.js" crossOrigin="anonymous" />
  </ThemeProvider>
);
export default MyApp;
