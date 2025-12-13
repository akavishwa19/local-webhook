import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Local Webhook Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mb-2 max-w-2xl mx-auto">
            Monitor and track all webhook events in real-time
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto">
            Secure webhook system with signature verification and replay protection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="group relative rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-sm text-muted-foreground">
              HMAC SHA256 signature verification ensures authenticity
            </p>
          </div>

          <div className="group relative rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time</h3>
            <p className="text-sm text-muted-foreground">
              Live monitoring of webhook events as they happen
            </p>
          </div>

          <div className="group relative rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Track status, timestamps, and event details
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">System Architecture</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="font-medium text-primary min-w-[120px]">Main Server:</span>
              <span className="text-muted-foreground">Receives and verifies webhooks with signature validation, IP whitelisting, and replay protection</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-medium text-primary min-w-[120px]">Third Party Server:</span>
              <span className="text-muted-foreground">Processes orders, generates signed webhooks, and logs all events to MongoDB</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-medium text-primary min-w-[120px]">Security:</span>
              <span className="text-muted-foreground">HMAC SHA-256 signatures, timestamp-based replay protection, duplicate prevention, and IP whitelisting</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

