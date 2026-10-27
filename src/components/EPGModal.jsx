import React from 'react';
import { X, Play, Clock, Sparkles, Tv, Calendar } from 'lucide-react';
import { generateEPG } from '../services/iptvService';

export default function EPGModal({ channel, isOpen, onClose, onPlayChannel }) {
  if (!isOpen || !channel) return null;

  const programs = generateEPG(channel);
  const currentProgram = programs.find(p => p.isCurrent) || programs[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#121722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-gradient-to-r from-sky-950/40 via-dark-surface to-dark-surface flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 p-1.5 flex items-center justify-center overflow-hidden">
              {channel.logo ? (
                <img 
                  src={channel.logo} 
                  alt={channel.name} 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <Tv className="w-6 h-6 text-sky-400" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{channel.name}</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-400/30">
                  {channel.language}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-400 bg-white/5">
                  {channel.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>Today's Broadcast Schedule (EPG)</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Now Playing Featured Card */}
          {currentProgram && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-sky-900/30 to-indigo-950/40 border border-sky-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> ON AIR NOW
                </span>
                <span className="text-xs font-semibold text-sky-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentProgram.startTime} - {currentProgram.endTime}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-1">
                {currentProgram.title}
              </h4>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {currentProgram.description}
              </p>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${currentProgram.progress}%` }}
                />
              </div>

              <button
                onClick={() => {
                  onPlayChannel(channel);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Watch Live Now
              </button>
            </div>
          )}

          {/* Upcoming Shows Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Upcoming Programs Today
            </h4>
            
            <div className="space-y-2">
              {programs.filter(p => !p.isCurrent).map((prog) => (
                <div 
                  key={prog.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-start gap-3"
                >
                  <div className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/5 text-[11px] font-mono font-semibold text-sky-400 shrink-0">
                    {prog.startTime}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-200">
                      {prog.title}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {prog.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
