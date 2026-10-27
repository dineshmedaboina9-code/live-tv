import React, { useState } from 'react';
import { X, Link2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { loadCustomPlaylist } from '../services/iptvService';

export default function CustomPlaylistModal({ isOpen, onClose, onChannelsLoaded }) {
  const [activeTab, setActiveTab] = useState('url'); // 'url' | 'raw'
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successCount, setSuccessCount] = useState(null);

  if (!isOpen) return null;

  const handleImport = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessCount(null);
    setIsLoading(true);

    try {
      const source = activeTab === 'url' ? playlistUrl.trim() : rawText.trim();
      if (!source) {
        throw new Error('Please enter a valid playlist URL or raw M3U text.');
      }

      const channels = await loadCustomPlaylist(source);
      if (!channels || channels.length === 0) {
        throw new Error('No valid channel stream entries found in this M3U playlist.');
      }

      setSuccessCount(channels.length);
      setTimeout(() => {
        onChannelsLoaded(channels);
        onClose();
      }, 900);
    } catch (err) {
      setError(err.message || 'Failed to parse playlist. Check URL or CORS permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const presetPlaylists = [
    { name: "IPTV-org India (Default)", url: "https://iptv-org.github.io/iptv/countries/in.m3u" },
    { name: "IPTV-org News (Global)", url: "https://iptv-org.github.io/iptv/categories/news.m3u" },
    { name: "IPTV-org Sports (Global)", url: "https://iptv-org.github.io/iptv/categories/sports.m3u" },
    { name: "IPTV-org Music (Global)", url: "https://iptv-org.github.io/iptv/categories/music.m3u" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      <div className="relative w-full max-w-xl bg-[#121722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Import Custom M3U Playlist</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Add custom TV playlists from IPTV-org or your personal stream provider
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-5 pt-4 flex gap-2 border-b border-white/5">
          <button
            onClick={() => { setActiveTab('url'); setError(''); }}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'url'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" /> Playlist URL (.m3u / .m3u8)
          </button>
          <button
            onClick={() => { setActiveTab('raw'); setError(''); }}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'raw'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Paste Raw M3U Content
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleImport} className="p-5 space-y-4">
          {activeTab === 'url' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                M3U Playlist Web Address
              </label>
              <input
                type="url"
                required
                placeholder="https://example.com/playlist.m3u"
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                className="w-full bg-[#181F2C] text-slate-100 placeholder:text-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-sky-500"
              />

              {/* Quick Presets */}
              <div className="mt-3">
                <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Popular IPTV-org Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetPlaylists.map(preset => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setPlaylistUrl(preset.url)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Paste Raw M3U Content
              </label>
              <textarea
                rows={6}
                required
                placeholder={'#EXTM3U\n#EXTINF:-1 tvg-id="AajTak" tvg-name="Aaj Tak",Aaj Tak\nhttps://example.com/stream.m3u8'}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full bg-[#181F2C] text-slate-100 placeholder:text-slate-500 text-xs font-mono p-3 rounded-xl border border-white/10 focus:outline-none focus:border-sky-500"
              />
            </div>
          )}

          {/* Feedback messages */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successCount !== null && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Successfully parsed {successCount} channels! Loading...</span>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
            >
              {isLoading ? 'Parsing Playlist...' : 'Import Playlist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
