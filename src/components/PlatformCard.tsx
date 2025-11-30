import React from 'react';
import { Instagram, Music } from 'lucide-react';

interface PlatformCardProps {
  platform: string;
  example: string;
}

const platformConfig: {
  [key: string]: { icon: React.ReactNode; color: string; bgColor: string; name: string };
} = {
  instagram: {
    icon: <Instagram className="w-8 h-8" />,
    color: 'from-pink-500 via-red-500 to-purple-500',
    bgColor: 'from-pink-500/10 to-purple-500/10',
    name: 'Instagram',
  },
  tiktok: {
    icon: <Music className="w-8 h-8" />,
    color: 'from-blue-500 via-cyan-500 to-blue-600',
    bgColor: 'from-blue-500/10 to-cyan-500/10',
    name: 'TikTok',
  },
};

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform, example }) => {
  const config = platformConfig[platform] || {
    icon: null,
    color: 'from-gray-600 to-gray-800',
    bgColor: 'from-gray-500/10 to-gray-700/10',
    name: platform,
  };

  return (
    <div
      className={`bg-gradient-to-br ${config.bgColor} backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 shadow-lg hover:shadow-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105`}
    >
      <div
        className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${config.color} text-white mb-4 shadow-lg`}
      >
        {config.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{config.name}</h3>
      <p className="text-sm text-slate-400 break-all">{example}</p>
    </div>
  );
};
