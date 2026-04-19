"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SpeakerHigh, SpeakerSlash, SpeakerLow } from "@phosphor-icons/react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.22);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Start muted on mount — browsers allow muted autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = true;
    audio.play().then(() => setPlaying(true)).catch(() => {});

    // Pause when user leaves, resume when they come back
    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Unmute (and ensure playing) on first interaction
  useEffect(() => {
    const events = ["scroll", "click", "touchstart", "keydown", "pointermove"] as const;

    const tryUnmute = () => {
      const audio = audioRef.current;
      if (!audio) return; // not ready yet, keep listening

      // Unmute
      if (audio.muted) {
        audio.muted = false;
        setMuted(false);
      }

      // If play() failed silently on mount, kick it off now
      if (audio.paused) {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }

      // Stop listening once audio is live and unmuted
      if (!audio.muted && !audio.paused) {
        events.forEach((e) => window.removeEventListener(e, tryUnmute));
      }
    };

    events.forEach((e) => window.addEventListener(e, tryUnmute, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, tryUnmute));
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().catch(() => {}); setPlaying(true); }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    if (v === 0) { setMuted(true); audio.muted = true; }
    else if (muted) { setMuted(false); audio.muted = false; }
  };

  return (
    <>
      <audio ref={audioRef} src="/cyber-love.mp3" loop preload="auto" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-6 z-50"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="flex items-center gap-3 bg-bg-surface/95 backdrop-blur-md border border-bg-border px-4 py-3">

          <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-text-secondary hover:text-text-primary transition-colors duration-200">
            {playing ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}
          </button>

          <div className="flex items-end gap-[3px] h-4">
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] bg-accent rounded-full"
                animate={
                  playing && !muted
                    ? { height: ["4px", "14px", "6px", "12px", "4px"], transition: { duration: 0.8 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 } }
                    : { height: "4px" }
                }
                style={{ height: "4px" }}
              />
            ))}
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 72, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden flex items-center"
              >
                <input
                  type="range" min="0" max="1" step="0.01"
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-full h-px cursor-pointer"
                  style={{ accentColor: "#8b2020" }}
                  aria-label="Volume"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="text-text-secondary hover:text-text-primary transition-colors duration-200">
            {muted || volume === 0 ? <SpeakerSlash size={15} /> : volume < 0.4 ? <SpeakerLow size={15} /> : <SpeakerHigh size={15} />}
          </button>
        </div>
      </motion.div>
    </>
  );
}
