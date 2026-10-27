import React from 'react';
import { 
  Tv, Heart, Clock, Flame, Globe2, Sparkles, 
  Film, Music, Trophy, BookOpen, Newspaper, Shield, X
} from 'lucide-react';
import { CATEGORIES, LANGUAGES } from '../data/defaultChannels';

export default function Sidebar({
  activeTab,
  onSelectTab,
  selectedCategory,
  onSelectCategory,
  selectedLanguage,
  onSelectLanguage,
  favoritesCount,
  recentCount,
  isOpen,
  onClose
}) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'News': return <Newspaper className="w-4 h-4" />;
      case 'Entertainment': return <Tv className="w-4 h-4" />;
      case 'Music': return <Music className="w-4 h-4" />;
      case 'Movies': return <Film className="w-4 h-4" />;
      case 'Sports': return <Trophy className="w-4 h-4" />;
      case 'Devotional': return <Sparkles className="w-4 h-4" />;
      case 'Kids & Learning': return <BookOpen className="w-4 h-4" />;
      default: return <Tv className="w-4 h-4" />;
    }
  };

  const navItems = [
    { id: 'all', label: 'All Channels', icon: <Tv className="w-4 h-4" /> },
    { id: 'featured', label: 'Featured & Hot', icon: <Flame className="w-4 h-4 text-amber-400" /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart className="w-4 h-4 text-rose-400" />, badge: favoritesCount },
    { id: 'recent', label: 'Recently Watched', icon: <Clock className="w-4 h-4 text-sky-400" />, badge: recentCount },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full overflow-y-auto pr-1">
      {/* Mobile Close Button */}
      <div className="flex items-center justify-between lg:hidden mb-4 pb-2 border-b border-white/10">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Views */}
      <div className="space-y-1 mb-6">
        <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Discover
        </p>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                onClose?.();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Categories */}
      <div className="space-y-1 mb-6">
        <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Genres & Categories
        </p>
        <div className="space-y-0.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  onClose?.();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white/10 text-white font-semibold border border-white/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Regional Languages */}
      <div className="space-y-1 mb-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Indian Languages
          </p>
          <Globe2 className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex flex-wrap gap-1.5 px-2">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => {
                  onSelectLanguage(lang);
                  onClose?.();
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info / IPTV-org status badge */}
      <div className="mt-auto pt-4 border-t border-white/5 px-3">
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>IPTV-org Live Network</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Free, open-source TV streams delivered directly via HLS.js. No signup required.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 p-4 border-r border-white/5 bg-[#0e121a]/80 backdrop-blur-xl h-[calc(100vh-65px)] sticky top-[65px]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />
          {/* Drawer panel */}
          <div className="absolute top-0 bottom-0 left-0 w-72 bg-[#0e121a] border-r border-white/10 p-4 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
