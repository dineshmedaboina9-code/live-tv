import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  RotateCcw, Heart, Tv, Radio, AlertCircle, ShieldAlert,
  PictureInPicture2, Sparkles, ExternalLink
} from 'lucide-react';

export default function VideoPlayer({ 
  channel, 
  isFavorite, 
  onToggleFavorite, 
  onOpenEPG,
  isTheaterMode,
  onToggleTheater
}) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [usingBackup, setUsingBackup] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  // Playback initialization
  useEffect(() => {
    if (!channel) return;

    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
    setUsingBackup(false);

    const streamUrl = channel.url;
    const video = videoRef.current;
    if (!video) return;

    // Clean up previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const loadStream = (url) => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 60,
          manifestLoadingTimeOut: 12000,
          levelLoadingTimeOut: 12000,
          fragLoadingTimeOut: 15000,
        });

        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          video.play().then(() => setIsPlaying(true)).catch(() => {
            // Browser autoplay policy might require user click or mute
            setIsPlaying(false);
          });
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.warn('HLS Network error encountered, attempting recovery...');
                // Try backup stream if available
                if (channel.backupUrl && !usingBackup) {
                  setUsingBackup(true);
                  loadStream(channel.backupUrl);
                } else {
                  hls.startLoad();
                }
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn('HLS Media error encountered, recovering...');
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                setIsLoading(false);
                setHasError(true);
                setErrorMessage('Stream broadcast currently unreachable or geo-restricted.');
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Safari HLS
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        });
        video.addEventListener('error', () => {
          if (channel.backupUrl && !usingBackup) {
            setUsingBackup(true);
            loadStream(channel.backupUrl);
          } else {
            setIsLoading(false);
            setHasError(true);
            setErrorMessage('Native stream playback failed.');
          }
        });
      } else {
        setIsLoading(false);
        setHasError(true);
        setErrorMessage('HLS playback is not supported on this browser.');
      }
    };

    loadStream(streamUrl);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel]);

  // Handle Fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error('Picture-in-Picture failed:', err);
    }
  };

  const handleReload = () => {
    if (!channel) return;
    setIsLoading(true);
    setHasError(false);
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }
    const video = videoRef.current;
    if (video) {
      video.load();
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(usingBackup && channel.backupUrl ? channel.backupUrl : channel.url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          video.play().then(() => setIsPlaying(true));
        });
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  if (!channel) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-dark-card border border-white/5 flex flex-col items-center justify-center text-slate-400 p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 animate-pulse">
          <Tv className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-200 mb-1">Select a Channel to Stream</h3>
        <p className="text-sm text-slate-400 max-w-md">
          Choose from over 30+ top live Indian news, entertainment, music, movie and sports channels below.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative w-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl transition-all duration-300 group ${
        isTheaterMode ? 'aspect-[21/9] max-h-[75vh]' : 'aspect-video'
      }`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain cursor-pointer"
        onClick={handlePlayPause}
        playsInline
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 bg-dark-base/80 backdrop-blur-sm flex flex-col items-center justify-center text-sky-400 pointer-events-none z-20">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-sky-500/20 animate-ping" />
            <div className="w-14 h-14 rounded-full border-3 border-transparent border-t-sky-400 border-r-sky-400 animate-spin" />
          </div>
          <p className="mt-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Connecting to Live Feed...</p>
        </div>
      )}

      {/* Error Overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-dark-base/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-25">
          <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-slate-100 mb-1">Stream Currently Offline</h4>
          <p className="text-xs text-slate-400 max-w-sm mb-4">
            {errorMessage || 'This live transmission source is temporarily unreachable or blocked by CORS headers.'}
          </p>
          <div className="flex gap-2.5">
            <button
              onClick={handleReload}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-sky-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry Stream
            </button>
            {channel.backupUrl && !usingBackup && (
              <button
                onClick={() => {
                  setUsingBackup(true);
                  handleReload();
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-white/10 transition-colors"
              >
                Try Mirror Stream
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Overlay Badge Bar */}
      <div className={`absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between z-10 transition-opacity duration-300 ${
        showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center gap-3">
          {/* Channel Logo */}
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md p-1 border border-white/20 flex items-center justify-center overflow-hidden shadow-lg">
            {channel.logo ? (
              <img 
                src={channel.logo} 
                alt={channel.name} 
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <Tv className="w-5 h-5 text-sky-400" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white drop-shadow-md leading-tight">{channel.name}</h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider bg-rose-500 text-white uppercase flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30">
                {channel.quality || 'HD'}
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
              <span>{channel.category}</span>
              <span>•</span>
              <span>{channel.language}</span>
              {usingBackup && <span className="text-amber-400 font-medium">• Backup CDN</span>}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(channel.id)}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-all ${
              isFavorite 
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' 
                : 'bg-black/40 border-white/10 text-slate-300 hover:text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => onOpenEPG(channel)}
            title="View TV Program Guide"
            className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-black/60 transition-all flex items-center gap-1.5 text-xs font-medium"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">EPG Guide</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className={`absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between z-10 transition-opacity duration-300 ${
        showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 flex items-center justify-center transition-all shadow-lg shadow-sky-500/25 active:scale-95"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <button
              onClick={toggleMute}
              className="text-slate-300 hover:text-white transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-18 accent-sky-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Reload Stream Button */}
          <button
            onClick={handleReload}
            title="Refresh Live Stream"
            className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-black/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Picture in Picture */}
          <button
            onClick={togglePiP}
            title="Picture-in-Picture"
            className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-black/60 transition-colors hidden sm:flex"
          >
            <PictureInPicture2 className="w-4 h-4" />
          </button>

          {/* Theater Mode Toggle */}
          <button
            onClick={onToggleTheater}
            title={isTheaterMode ? "Standard View" : "Theater Mode"}
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-colors hidden md:flex ${
              isTheaterMode 
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-400' 
                : 'bg-black/40 border-white/10 text-slate-300 hover:text-white hover:bg-black/60'
            }`}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-black/60 transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
