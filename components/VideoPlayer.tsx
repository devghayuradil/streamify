"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const TEST_STREAM =
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

interface VideoPlayerProps {
  streamUrl?: string;
}

export function VideoPlayer({ streamUrl = TEST_STREAM }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Native HLS support (Safari)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      return;
    }

    // hls.js for other browsers
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }
  }, [streamUrl]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className="w-full h-full"
        playsInline
        aria-label="Video player"
      />
    </div>
  );
}