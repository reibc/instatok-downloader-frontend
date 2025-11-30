import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { DownloadForm } from './components/DownloadForm';
import { PlatformCard } from './components/PlatformCard';
import { Footer } from './components/Footer';
import { getPlatforms } from './api';
import { Loader2 } from 'lucide-react';

function App() {
  const [platforms, setPlatforms] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data.examples);
      } catch (error) {
        console.error('Failed to fetch platforms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="card hover:shadow-red-500/20 transition-shadow duration-300">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Download Video
            </h2>
            <DownloadForm />
          </div>

          <div className="card hover:shadow-blue-500/20 transition-shadow duration-300">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-6">
              Supported Platforms
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-red-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(platforms).map(([platform, example]) => (
                  <PlatformCard key={platform} platform={platform} example={example} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            How to Use
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-blue-500/20 text-red-400 border border-red-500/30 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-white mb-2">Copy URL</h3>
              <p className="text-sm text-slate-400">Copy the video link from Instagram or TikTok</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-white mb-2">Paste Link</h3>
              <p className="text-sm text-slate-400">Paste the URL in the input field above</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-red-500/20 text-blue-400 border border-blue-500/30 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-white mb-2">Download</h3>
              <p className="text-sm text-slate-400">Click download and save the video</p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
