import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Search, X, Tv, PlusCircle, RefreshCw, Menu, Play, ArrowRight } from 'lucide-react';

export default function Navbar({
  searchTerm,
  onSearchChange,
  channels = [],
  onSelectChannel,
  channelCount,
  onOpenCustomM3U,
  onRefreshChannels,
  isRefreshing,
  onToggleSidebar
}) {
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Compute live search suggestions for dropdown (max 8 channels)
  const searchSuggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    const terms = query.split(/\s+/).filter(Boolean);
    return channels
      .filter(ch => {
        const name = (ch.name || '').toLowerCase();
        const cat = (ch.category || '').toLowerCase();
        const lang = (ch.language || '').toLowerCase();
        return terms.every(term => name.includes(term) || cat.includes(term) || lang.includes(term));
      })
      .slice(0, 8);
  }, [channels, searchTerm]);

  // Open dropdown when search term is typed
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setIsDropdownOpen(true);
      setSelectedIndex(0);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for search dropdown & '/' shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search on '/'
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      if (!isDropdownOpen || searchSuggestions.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % searchSuggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + searchSuggestions.length) % searchSuggestions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (searchSuggestions[selectedIndex]) {
          handleSelect(searchSuggestions[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen, searchSuggestions, selectedIndex]);

  const handleSelect = (channel) => {
    onSelectChannel?.(channel);
    setIsDropdownOpen(false);
    onSearchChange('');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Brand & Mobile Toggle */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                StreamPulse
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-black tracking-wider bg-sky-500/20 text-sky-400 border border-sky-400/30">
                INDIA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
              Virtual Live TV Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Global Search Bar with Live Suggestions Dropdown */}
      <div ref={searchContainerRef} className="flex-1 max-w-xl mx-2 relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search channels, genres, languages (Press '/' to search)..."
            value={searchTerm}
            onFocus={() => {
              if (searchTerm.trim().length > 0) setIsDropdownOpen(true);
            }}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#141A25] text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => {
                onSearchChange('');
                setIsDropdownOpen(false);
              }}
              className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Instant Results Dropdown */}
        {isDropdownOpen && searchSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#121722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="p-2 border-b border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-semibold px-3">
              <span>Matching Live Channels ({searchSuggestions.length})</span>
              <span>Use ↑ ↓ to navigate, Enter to play</span>
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
              {searchSuggestions.map((channel, idx) => {
                const isHighlighted = idx === selectedIndex;
                return (
                  <div
                    key={channel.id}
                    onClick={() => handleSelect(channel)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-2.5 px-3 cursor-pointer transition-colors ${
                      isHighlighted ? 'bg-sky-500/15 text-white' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Thumbnail/Logo */}
                      <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 p-1 flex items-center justify-center shrink-0">
                        {channel.logo ? (
                          <img
                            src={channel.logo}
                            alt=""
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <Tv className="w-4 h-4 text-sky-400" />
                        )}
                      </div>

                      {/* Title & Details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs truncate text-slate-100">
                            {channel.name}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase">
                            LIVE
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {channel.category} • {channel.language}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-sky-400 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100">
                        <Play className="w-3 h-3 fill-current" /> Play
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Channel Count Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">{channelCount}</span>
          <span className="text-slate-400">Live</span>
        </div>

        {/* Sync / Refresh Button */}
        <button
          onClick={onRefreshChannels}
          disabled={isRefreshing}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50"
          title="Sync latest IPTV-org playlist"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
        </button>

        {/* Add Custom M3U Modal trigger */}
        <button
          onClick={onOpenCustomM3U}
          className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-sky-500/20 active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add M3U</span>
        </button>
      </div>
    </header>
  );
}
