import { useState } from 'react';
import { useShorten } from '../hooks/useShorten';
// @ts-ignore - ElectricBorder is a JSX component without types
import ElectricBorder from './ElectricBorder';

export const UrlShortener = () => {
  const { shorten, shortUrl, loading, error, reset } = useShorten();
  const [copied, setCopied] = useState(false);
  const [showCustomAlias, setShowCustomAlias] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const longUrl = formData.get('url') as string;
    const customAlias = formData.get('customAlias') as string;
    await shorten(longUrl, customAlias || undefined);
  };

  const handleCopy = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleReset = () => {
    reset();
    setCopied(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <ElectricBorder
        color="#ffffff"
        speed={1}
        chaos={0.12}
        borderRadius={16}
      >
        <div 
          className="rounded-2xl p-8 space-y-6"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            minHeight: 'fit-content',
          }}
        >
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-gray-300">Transform long URLs into short, shareable links</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                name="url"
                type="url"
                required
                placeholder="Enter your long URL here..."
                disabled={loading}
                className="cursor-target flex-1 px-4 py-3 bg-gray-900/50 border-2 border-gray-700 text-white rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all disabled:bg-gray-800/50 disabled:cursor-not-allowed placeholder-gray-500"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="cursor-target px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-white/50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap shadow-lg shadow-white/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Shortening...
                  </span>
                ) : (
                  'Shorten'
                )}
              </button>
            </div>
            
            {/* Custom Alias Section - Grid layout for smooth expansion without moving card */}
            <div 
              className="grid"
              style={{
                gridTemplateRows: showCustomAlias ? 'auto 1fr' : 'auto 0fr',
                transition: 'grid-template-rows 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Custom Alias Toggle */}
              <button
                type="button"
                onClick={() => setShowCustomAlias(!showCustomAlias)}
                className="cursor-target text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <svg 
                  className={`w-4 h-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showCustomAlias ? 'rotate-90' : 'rotate-0'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {showCustomAlias ? 'Hide custom alias' : 'Add custom alias (optional)'}
              </button>

              {/* Custom Alias Input - Grid child for smooth expansion */}
              <div className="overflow-hidden">
                <div 
                  style={{
                    opacity: showCustomAlias ? 1 : 0,
                    transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                    marginTop: showCustomAlias ? '12px' : '0px',
                  }}
                >
                  <label htmlFor="customAlias" className="block text-sm font-medium text-gray-300 mb-2">
                    Custom Alias
                  </label>
                  <input
                    id="customAlias"
                    name="customAlias"
                    type="text"
                    minLength={3}
                    maxLength={30}
                    pattern="^[a-zA-Z0-9_-]+$"
                    placeholder="my-custom-link (3-30 chars, alphanumeric, _, -)"
                    disabled={loading}
                    className="cursor-target w-full px-4 py-3 text-white rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all disabled:bg-gray-800/50 disabled:cursor-not-allowed placeholder-gray-500"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                    }}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    3-30 characters, only letters, numbers, underscores (_), and hyphens (-)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {shortUrl && (
          <div className="bg-green-900/20 border-2 border-green-500/30 rounded-lg p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="font-semibold text-lg">URL Shortened Successfully!</h3>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/20">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400 mb-1">Short URL:</p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target text-white hover:text-gray-300 font-mono text-sm break-all hover:underline"
                  >
                    {shortUrl}
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="cursor-target px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="cursor-target px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    New URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </ElectricBorder>
    </div>
  );
};