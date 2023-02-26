import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { NavBar, Footer } from '../components/index';

import './globals.css';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <NavBar />
      <div className="pt-65">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
    <Script src="https://kit.fontawesome.com/d6eb679684.js" crossOrigin="anonymous" />
  </ThemeProvider>
);
export default MyApp;
