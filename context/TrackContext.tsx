import { Track } from "@/types/spotify";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const TrackContext = createContext<{
  track: Track | null;
  setTrack: (track: Track) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  duration: number;
  volume: number;
  setVolume: (volume: number) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  progress: number;
  error: string | null;
}>({} as any);

export const TrackProvider = ({ children }: any) => {
  const [track, setTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // [0, 1
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!track) return;

    if (audioRef.current === null) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setTrack(null);
    }

    if (!track.preview_url) {
      setError("No preview available");
      return;
    }

    audioRef.current.src = track.preview_url;
    audioRef.current.volume = volume;

    const setAudioData = () => {
      setDuration(audioRef.current!.duration);
      setCurrentTime(audioRef.current!.currentTime);
    };

    const setAudioTime = () => {
      const time = audioRef.current!.currentTime;
      setCurrentTime(time);
      setProgress((time / duration) * 100);
    };

    audioRef.current.addEventListener("loadeddata", () => setAudioData());
    audioRef.current.addEventListener("timeupdate", () => setAudioTime());
    audioRef.current.preload = "none";

    return () => {
      audioRef.current!.removeEventListener("loadeddata", () => setAudioData());
      audioRef.current!.removeEventListener("timeupdate", () => setAudioTime());
      audioRef.current!.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [track, isPlaying, volume, duration]);

  return (
    <TrackContext.Provider
      value={{
        track,
        setTrack,
        audioRef,
        isPlaying,
        setIsPlaying,
        duration,
        volume,
        setVolume,
        currentTime,
        setCurrentTime,
        progress,
        error,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackPlayer = () => useContext(TrackContext);
