import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoPlayer from './components/VideoPlayer';
import ChannelCard from './components/ChannelCard';
import EPGModal from './components/EPGModal';
import CustomPlaylistModal from './components/CustomPlaylistModal';
import { getIndianChannels } from './services/iptvService';
import { defaultChannels, CATEGORIES, LANGUAGES } from './data/defaultChannels';
import { Tv, Flame, Heart, Clock, AlertCircle, RefreshCw, X, Search } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'stream_pulse_favorites_v1';
const RECENT_STORAGE_KEY = 'stream_pulse_recent_v1';

export default function App() {
  const [channels, setChannels] = useState(defaultChannels);
  const [selectedChannel, setSelectedChannel] = useState(defaultChannels[0] || null);
  const [isLoadingChannels, setIsLoadingChannels] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'featured' | 'favorites' | 'recent'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [epgTargetChannel, setEpgTargetChannel] = useState(null);
  const [isCustomM3UOpen, setIsCustomM3UOpen] = useState(false);

  const channelGridRef = useRef(null);

  // Persistence: Favorites & Recent
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentChannelIds, setRecentChannelIds] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load channels from IPTV-org on launch
  useEffect(() => {
    async function loadData() {
      setIsLoadingChannels(true);
      try {
        const data = await getIndianChannels();
        if (data && data.length > 0) {
          setChannels(data);
          const initial = data.find(c => c.isFeatured) || data[0];
          setSelectedChannel(initial);
        }
      } catch (err) {
        console.error('Failed to load initial channels:', err);
      } finally {
        setIsLoadingChannels(false);
      }
    }
    loadData();
  }, []);

  // Save Favorites
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Save Recents
  useEffect(() => {
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentChannelIds));
    } catch {}
  }, [recentChannelIds]);

  // Handle Channel Selection
  const handleSelectChannel = useCallback((channel) => {
    setSelectedChannel(channel);
    // Add to recent list (deduplicated, keep max 20)
    setRecentChannelIds(prev => {
      const filtered = prev.filter(id => id !== channel.id);
      return [channel.id, ...filtered].slice(0, 20);
    });
    // Scroll player into view on small screens
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Toggle Favorite
  const handleToggleFavorite = useCallback((channelId) => {
    setFavorites(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  }, []);

  // Refresh live playlist from IPTV-org
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const freshChannels = await getIndianChannels(true);
      setChannels(freshChannels);
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Add custom imported channels
  const handleCustomChannelsLoaded = (newChannels) => {
    setChannels(prev => {
      const existingIds = new Set(prev.map(c => c.id));
      const filteredNew = newChannels.filter(c => !existingIds.has(c.id));
      return [...filteredNew, ...prev];
    });
    if (newChannels.length > 0) {
      setSelectedChannel(newChannels[0]);
    }
  };

  // Filter channels based on active tab, category, language, and search
  const filteredChannels = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return channels.filter(channel => {
      // If user is searching, prioritize global search across all channels
      if (query) {
        const name = (channel.name || '').toLowerCase();
        const category = (channel.category || '').toLowerCase();
        const language = (channel.language || '').toLowerCase();
        const desc = (channel.description || '').toLowerCase();

        const terms = query.split(/\s+/).filter(Boolean);
        return terms.every(term => 
          name.includes(term) || category.includes(term) || language.includes(term) || desc.includes(term)
        );
      }

      // Tab filter
      if (activeTab === 'featured' && !channel.isFeatured) return false;
      if (activeTab === 'favorites' && !favorites.includes(channel.id)) return false;
      if (activeTab === 'recent' && !recentChannelIds.includes(channel.id)) return false;

      // Category filter (safe null-check)
      if (selectedCategory !== 'All' && (channel.category || '').toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Language filter (safe null-check)
      if (selectedLanguage !== 'All' && (channel.language || '').toLowerCase() !== selectedLanguage.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [channels, activeTab, favorites, recentChannelIds, selectedCategory, selectedLanguage, searchTerm]);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col">
      {/* Top Navigation Bar with Search */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        channels={channels}
        onSelectChannel={handleSelectChannel}
        channelCount={channels.length}
        onOpenCustomM3U={() => setIsCustomM3UOpen(true)}
        onRefreshChannels={handleRefresh}
        isRefreshing={isRefreshing}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Sidebar Drawer */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSearchTerm(''); // Clear search when user explicitly navigates tabs
          }}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchTerm('');
          }}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={(lang) => {
            setSelectedLanguage(lang);
            setSearchTerm('');
          }}
          favoritesCount={favorites.length}
          recentCount={recentChannelIds.length}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto min-w-0">
          {/* Top Video Player Section */}
          <div className="mb-8">
            <VideoPlayer
              channel={selectedChannel}
              isFavorite={selectedChannel ? favorites.includes(selectedChannel.id) : false}
              onToggleFavorite={handleToggleFavorite}
              onOpenEPG={(ch) => setEpgTargetChannel(ch)}
              isTheaterMode={isTheaterMode}
              onToggleTheater={() => setIsTheaterMode(prev => !prev)}
            />
          </div>

          {/* Channels Header & Search Active Indicator */}
          <div ref={channelGridRef} className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  {searchTerm.trim() ? (
                    <>
                      <Search className="w-5 h-5 text-sky-400" />
                      <span>Results for &ldquo;{searchTerm}&rdquo;</span>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-normal flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3 h-3" /> Clear
                      </button>
                    </>
                  ) : (
                    <>
                      {activeTab === 'all' && 'All Live Channels'}
                      {activeTab === 'featured' && 'Featured & Trending'}
                      {activeTab === 'favorites' && 'Your Favorite Channels'}
                      {activeTab === 'recent' && 'Recently Watched'}
                    </>
                  )}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-300">
                  {filteredChannels.length}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {searchTerm.trim() 
                  ? 'Searching live channels across names, categories, and languages' 
                  : (selectedCategory !== 'All' ? `Filtered by ${selectedCategory}` : 'Broadcasting 24/7 in High Definition')
                }
                {!searchTerm.trim() && selectedLanguage !== 'All' ? ` • ${selectedLanguage}` : ''}
              </p>
            </div>

            {/* Quick Horizontal Category Filters */}
            {!searchTerm.trim() && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                      selectedCategory === cat
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Channel Grid */}
          {filteredChannels.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3.5 sm:gap-4">
              {filteredChannels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  isActive={selectedChannel?.id === channel.id}
                  isFavorite={favorites.includes(channel.id)}
                  onSelect={handleSelectChannel}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenEPG={(ch) => setEpgTargetChannel(ch)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-dark-card border border-white/5 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-200 mb-1">No channels found</h4>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                No TV channels match &ldquo;{searchTerm}&rdquo;. Try another name, genre, or language.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedLanguage('All');
                  setActiveTab('all');
                }}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-sky-500/20"
              >
                Reset Search & Show All Channels
              </button>
            </div>
          )}
        </main>
      </div>

      {/* EPG Program Guide Modal */}
      <EPGModal
        channel={epgTargetChannel}
        isOpen={!!epgTargetChannel}
        onClose={() => setEpgTargetChannel(null)}
        onPlayChannel={handleSelectChannel}
      />

      {/* Custom M3U Playlist Modal */}
      <CustomPlaylistModal
        isOpen={isCustomM3UOpen}
        onClose={() => setIsCustomM3UOpen(false)}
        onChannelsLoaded={handleCustomChannelsLoaded}
      />
    </div>
  );
}
