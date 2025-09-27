import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { Toaster } from 'react-hot-toast';
import { Box } from '@mui/material';
import Marquee from 'react-fast-marquee';
import AudioPlayer from '../utils/audio';
import { AudioProvider } from '../utils/audioContext';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

const clientSideEmotionCache = createEmotionCache();

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { NavbarProvider } from '../contexts/navbar-context';
import { GameInstanceProvider } from '../contexts/game-context';

const SplashScreen = () => null;

const App = (props) => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useNProgress();
  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();
  const router = useRouter();
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: false, mirror: true, offset: 40 });
  }, []);
  useEffect(() => {
    const handleRouteChange = () => {
      AOS.refreshHard();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <GameInstanceProvider>
            <AudioProvider>
              <Toaster/>
              <ThemeProvider theme={theme}>
                <CssBaseline/>
                <NavbarProvider>
                  <AuthConsumer>
                    {(auth) => auth.isLoading ? <SplashScreen/> : (
                      // <Box position="relative" sx={{ minHeight: '100vh', width: '100vw' }}>
                      //   <Box position="relative" sx={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
                      //     {/*audio*/}
                      //     <AudioPlayer src={`${WEB_URL}/game_map_music.wav`}/>
                      //     {/*background*/}
                      //     <Box sx={{
                      //       backgroundImage: `url('/bg.png')`,
                      //       backgroundSize: 'cover',
                      //       backgroundPosition: 'center',
                      //       height: '100vh',
                      //       width: '100%'
                      //     }}>
                      //       <Marquee speed={100}
                      //                direction={'right'}
                      //                style={{
                      //                  height: '100vh', width: '100%', overflowY: 'hidden'
                      //                }}>
                      //         <img src="/bg.png" style={{
                      //           objectFit: 'cover', width: '100vw', height: '100vh'
                      //         }}/>
                      //       </Marquee>
                      //     </Box>
                          <Box position="relative" top="0" left="0" width="100%" sx={{ zIndex: 1, minHeight: '100vh' }}>
                            {getLayout(
                              <Component {...pageProps}/>)}
                          </Box>
                        // </Box>
                      // </Box>
                    )}
                  </AuthConsumer>
                </NavbarProvider>
              </ThemeProvider>
            </AudioProvider>
          </GameInstanceProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
