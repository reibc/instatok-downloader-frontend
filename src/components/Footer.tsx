import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { getHealth } from '../api';

export const Footer: React.FC = () => {
  const [isHealthy, setIsHealthy] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const health = await getHealth();
        setIsHealthy(health.status === 'healthy');
      } catch {
        setIsHealthy(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <footer className="mt-16 text-center text-slate-300">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Activity className={`w-4 h-4 ${isHealthy ? 'text-green-400' : 'text-red-400'}`} />
        <span className="text-sm">
          Status:{' '}
          <span className={isHealthy ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
            {isHealthy ? 'Online' : 'Offline'}
          </span>
        </span>
      </div>
    </footer>
  );
};
