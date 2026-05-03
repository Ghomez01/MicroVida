import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const soundRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  // Função para alternar o mute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    async function startMusic() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/Artifact - The Dark Contenent - Kevin MacLeod.mp3'),
          {
            isLooping: true,
            volume: isMuted ? 0 : 0.3, // Define volume inicial baseado no estado
            shouldPlay: true,
          }
        );
        soundRef.current = sound;
      } catch (error) {
        console.log("Erro ao carregar música de fundo:", error);
      }
    }

    startMusic();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // useEffect para reagir às mudanças do botão de Mute
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setVolumeAsync(isMuted ? 0 : 0.3);
    }
  }, [isMuted]);

  return (
    <MusicContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);