import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import WebhookList from './components/WebhookList';
import ConfirmDialog from './components/ConfirmDialog';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [message, setMessage] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleStartCooking = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch('http://localhost:3000/start-cooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json().catch(() => ({ message: 'Request sent successfully' }));
      setMessage({ type: 'success', text: data.message || 'Cooking started successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to start cooking' });
    } finally {
      setIsLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleClearAllClick = () => {
    setShowConfirmDialog(true);
  };

  const handleClearAll = async () => {
    setIsClearing(true);
    setMessage(null);
    
    try {
      const response = await fetch('http://localhost:3001/webhooks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json().catch(() => ({ message: 'All data cleared successfully' }));
      setMessage({ type: 'success', text: data.message || 'All webhook data cleared successfully!' });
      
      // Trigger a page refresh to update the webhook list
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to clear data' });
    } finally {
      setIsClearing(false);
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Webhook Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor all webhook events sent to the main server
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartCooking}
              disabled={isLoading || isClearing}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 h-10 px-4 gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Start Cooking</span>
                </>
              )}
            </button>
            <button
              onClick={handleClearAllClick}
              disabled={isLoading || isClearing}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 gap-2"
            >
              {isClearing ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Clearing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear All</span>
                </>
              )}
            </button>
          </div>
        </div>
        {message && (
          <div className={`rounded-lg border p-4 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' 
              : 'bg-destructive/10 border-destructive/20 text-destructive'
          }`}>
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}
      </div>
      <WebhookList />
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleClearAll}
        title="Delete All Webhook Data"
        message="Are you sure you want to delete all webhook data? This action cannot be undone and will permanently remove all records from the collection."
        confirmText="Delete All"
        cancelText="Cancel"
        confirmColor="red"
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
