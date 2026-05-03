import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const soundRef = useRef(null);

  useEffect(() => {
    async function startMusic() {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/Artifact - The Dark Contenent - Kevin MacLeod.mp3'),
        {
          isLooping: true,
          volume: 0.3,
          shouldPlay: true,
        }
      );

      soundRef.current = sound;
    }

    startMusic();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <MusicContext.Provider value={{}}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);