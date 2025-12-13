import { useState, useEffect } from 'react';
import WebhookCard from './WebhookCard';

const WebhookList = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWebhooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/webhooks');
      if (!response.ok) throw new Error('Failed to fetch webhooks');
      const data = await response.json();
      setWebhooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching webhooks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhooks();
    const interval = setInterval(fetchWebhooks, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && webhooks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 dark:bg-red-500/5 border border-red-500/30 dark:border-red-500/20 rounded-xl p-6 text-red-400 dark:text-red-300 shadow-lg">
        <p className="font-semibold text-lg mb-2">Error loading webhooks</p>
        <p className="text-sm mb-4">{error}</p>
        <button
          onClick={fetchWebhooks}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Webhook Events ({webhooks.length})
        </h2>
        <button
          onClick={fetchWebhooks}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-medium shadow-md hover:shadow-lg"
        >
          Refresh
        </button>
      </div>
      {webhooks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-lg">
          <p className="text-gray-500 dark:text-gray-400">No webhooks found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {webhooks.map((webhook) => (
            <WebhookCard key={webhook._id} webhook={webhook} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WebhookList;

