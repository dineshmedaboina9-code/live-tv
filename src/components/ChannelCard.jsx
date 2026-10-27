import React, { useState } from 'react';
import { Play, Heart, Sparkles, Tv, Volume2 } from 'lucide-react';

export default function ChannelCard({
  channel,
  isActive,
  isFavorite,
  onSelect,
  onToggleFavorite,
  onOpenEPG
}) {
  const [imageError, setImageError] = useState(false);

  // Fallback initial generator
  const getInitials = (name) => {
    return name
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase() || 'TV';
  };

  return (
    <div
      onClick={() => onSelect(channel)}
      className={`group relative rounded-2xl p-3.5 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
        isActive 
          ? 'bg-sky-500/10 border-sky-500/40 shadow-lg shadow-sky-500/15 ring-1 ring-sky-400/30' 
          : 'glass-card hover:border-white/20'
      }`}
    >
      {/* Top Bar inside card: Badges & Favorite */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex items-center gap-1.5">
          {isActive ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-rose-500 text-white uppercase flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Playing
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/5">
              {channel.quality || 'HD'}
            </span>
          )}
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-sky-300/80 bg-sky-500/10 border border-sky-500/20">
            {channel.language}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(channel.id);
          }}
          className={`p-1.5 rounded-lg transition-all ${
            isFavorite 
              ? 'text-rose-500 bg-rose-500/10' 
              : 'text-slate-400 hover:text-rose-400 hover:bg-white/5 opacity-0 group-hover:opacity-100'
          }`}
          title={isFavorite ? "Remove favorite" : "Add to favorites"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Center: Logo & Equalizer */}
      <div className="relative aspect-[16/9] w-full rounded-xl bg-black/40 border border-white/5 flex items-center justify-center p-3 mb-3 overflow-hidden group-hover:border-sky-500/20 transition-colors">
        {channel.logo && !imageError ? (
          <img
            src={channel.logo}
            alt={channel.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain filter drop-shadow transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm tracking-widest shadow-inner">
            {getInitials(channel.name)}
          </div>
        )}

        {/* Hover Play Button Overlay */}
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 ${
          isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className="w-10 h-10 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shadow-lg shadow-sky-500/40 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-4 h-4 fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Active Animated Sound Wave */}
        {isActive && (
          <div className="absolute bottom-2 right-2 flex items-end gap-0.5 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md border border-sky-500/30">
            <span className="w-1 h-3 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-2 bg-sky-400 rounded-full animate-bounce" />
          </div>
        )}
      </div>

      {/* Footer Info: Channel Name, Category & EPG link */}
      <div className="flex items-center justify-between mt-auto">
        <div className="min-w-0 pr-2">
          <h4 className="text-sm font-bold text-slate-100 truncate group-hover:text-sky-300 transition-colors">
            {channel.name}
          </h4>
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {channel.category}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenEPG(channel);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-colors shrink-0"
          title="View TV Guide / Schedule"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
