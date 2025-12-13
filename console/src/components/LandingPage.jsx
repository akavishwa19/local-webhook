const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Local Webhook Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Monitor and track all webhook events in real-time
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Secure webhook system with signature verification and replay protection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="group bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-500/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              HMAC SHA256 signature verification ensures authenticity
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 hover:border-green-500/50 dark:hover:border-green-500/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Live monitoring of webhook events as they happen
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 hover:border-purple-500/50 dark:hover:border-purple-500/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track status, timestamps, and event details
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 mb-8 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">System Architecture</h2>
          <div className="text-left space-y-3 text-gray-600 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Main Server:</span>
              <span>Receives and verifies webhooks with signature validation, IP whitelisting, and replay protection</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 font-semibold">Third Party Server:</span>
              <span>Processes orders, generates signed webhooks, and logs all events to MongoDB</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-600 dark:text-purple-400 font-semibold">Security:</span>
              <span>HMAC SHA-256 signatures, timestamp-based replay protection, duplicate prevention, and IP whitelisting</span>
            </div>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

