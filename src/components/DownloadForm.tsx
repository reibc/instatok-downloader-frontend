import React, { useState } from 'react';
import { Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { downloadVideo } from '../api';

export const DownloadForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const blob = await downloadVideo(url);

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      const urlParts = url.split('/');
      const videoId = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
      link.download = `video_${videoId}.mp4`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setSuccess(true);
      setUrl('');

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Download error:', err);

      if (err.response?.data) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result as string);
            setError(errorData.error || 'Failed to download video');
          } catch {
            setError('Failed to download video');
          }
        };
        reader.readAsText(err.response.data);
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to download video');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-slate-200 mb-2">
          Video URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://www.instagram.com/reel/..."
          className="input-field"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-300 backdrop-blur-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-300 backdrop-blur-sm">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">Video downloaded successfully!</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download Video
          </>
        )}
      </button>
    </form>
  );
};
