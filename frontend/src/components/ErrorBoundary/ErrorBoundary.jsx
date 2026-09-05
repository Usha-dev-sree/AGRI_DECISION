import React from 'react';
import Button from '../Button/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f87171', marginBottom: '0.75rem' }}>
              Something went wrong loading this view
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            {this.state.errorInfo?.componentStack && (
              <details style={{ textAlign: 'left', marginBottom: '1.5rem', background: '#0f172a', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#cbd5e1', overflowX: 'auto', maxHeight: '180px' }}>
                <summary style={{ cursor: 'pointer', color: '#38bdf8', marginBottom: '6px' }}>View Technical Trace</summary>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Button onClick={this.handleReload}>
                Reload Page
              </Button>
              <Button variant="secondary" onClick={this.handleReset}>
                Clear Cache & Log In
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
