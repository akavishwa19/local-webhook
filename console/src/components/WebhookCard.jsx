import { useState } from 'react';

const WebhookCard = ({ webhook }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const truncateString = (str, maxLength = 50) => {
    if (!str) return 'N/A';
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  };

  const statusColors = {
    SUCCESS: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    ERROR: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  return (
    <div className="group relative rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h3 className="text-base font-semibold truncate">
              {webhook.event_id || 'N/A'}
            </h3>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors flex-shrink-0 ${statusColors[webhook.status] || 'bg-muted text-muted-foreground border-border'}`}>
              {webhook.status || 'UNKNOWN'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="font-medium">IP:</span>
              <span className="text-foreground">{webhook.requester_ip || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Created:</span>
              <span className="text-foreground">{formatDate(webhook.createdAt)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 flex-shrink-0"
          aria-label="Toggle details"
        >
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Event ID</label>
                <p className="text-sm font-mono bg-muted/50 p-2.5 rounded-md border break-all">
                  {webhook.event_id || 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Requester IP</label>
                <p className="text-sm font-mono bg-muted/50 p-2.5 rounded-md border">
                  {webhook.requester_ip || 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Timestamp</label>
                <p className="text-sm bg-muted/50 p-2.5 rounded-md border">
                  {formatTimestamp(webhook.timestamp)}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Created At</label>
                <p className="text-sm bg-muted/50 p-2.5 rounded-md border">
                  {formatDate(webhook.createdAt)}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Updated At</label>
                <p className="text-sm bg-muted/50 p-2.5 rounded-md border">
                  {formatDate(webhook.updatedAt)}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Status</label>
                <p className="mt-1">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${statusColors[webhook.status] || 'bg-muted text-muted-foreground border-border'}`}>
                    {webhook.status || 'UNKNOWN'}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          {webhook.signature && (
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Signature</label>
              <p className="text-xs font-mono bg-muted/50 p-3 rounded-md border break-all">
                {webhook.signature}
              </p>
            </div>
          )}

          {webhook.payload && (
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Payload</label>
              <pre className="text-xs font-mono bg-muted/50 p-3 rounded-md border overflow-x-auto">
                {JSON.stringify(webhook.payload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebhookCard;
