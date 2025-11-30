import React from 'react';
import { Video } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 rounded-2xl shadow-lg shadow-red-500/30 mb-6 animate-pulse">
        <Video className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
        Video Downloader
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mx-auto">
        Download videos from Instagram and TikTok instantly
      </p>
    </header>
  );
};
