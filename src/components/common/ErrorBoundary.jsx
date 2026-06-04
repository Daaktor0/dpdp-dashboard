import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4"
          style={{ background: 'var(--color-bg-primary, #000000)' }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'rgba(245, 158, 11, 0.15)' }}
          >
            <AlertTriangle className="w-10 h-10 text-amber-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">Something went wrong</h1>
          <p className="text-gray-400 max-w-md mb-2">
            An unexpected error occurred. This has been logged and we'll look into it.
          </p>
          <p className="text-xs text-gray-600 mb-8 font-mono max-w-lg break-all">
            {this.state.error?.message || 'Unknown error'}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%)',
                color: 'white'
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>
            <a
              href="/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-300 hover:bg-white/10 transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Home className="w-4 h-4" />
              Go Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
