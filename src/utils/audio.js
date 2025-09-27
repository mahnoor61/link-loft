import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useAudioContext } from './audioContext';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const router = useRouter();
  const { isSoundOn } = useAudioContext(); // Correct hook usage

  useEffect(() => {
    const handleRouteChange = () => {
      if (router.pathname === '/' || !isSoundOn) {
        if (audioRef.current) {
          audioRef.current.muted = true;
        }
      } else {
        if (audioRef.current) {
          audioRef.current.muted = false;
        }
      }
    };

    // Check on initial load
    handleRouteChange();

    // Listen for route changes
    const routeChangeCompleteListener = () => handleRouteChange();
    router.events.on('routeChangeComplete', routeChangeCompleteListener);

    return () => {
      router.events.off('routeChangeComplete', routeChangeCompleteListener);
    };
  }, [router, isSoundOn]);

  return (
    <Box style={{ display: 'none' }}>
      <audio ref={audioRef} controls autoPlay loop>
        <source src={src} type="audio/wav"/>
      </audio>
    </Box>
  );
};

export default AudioPlayer;
