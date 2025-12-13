import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import WebhookList from './components/WebhookList';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <Header onBack={() => setShowDashboard(false)} showBack={showDashboard} />
        <main className="flex-1">
          {!showDashboard ? (
            <LandingPage onGetStarted={() => setShowDashboard(true)} />
          ) : (
            <div className="container mx-auto px-4 py-8 max-w-7xl">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Webhook Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor all webhook events sent to the main server
                </p>
              </div>
              <WebhookList />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
