import { useState } from 'react';

interface ShortenResponse {
  message: string;
  shortId: string;
  originalUrl: string;
}

interface ShortenError {
  message: string;
  error?: string;
}

interface UseShortenReturn {
  shorten: (longUrl: string, customAlias?: string, expiresAt?: string) => Promise<void>;
  shortUrl: string | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export const useShorten = (): UseShortenReturn => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shorten = async (longUrl: string, customAlias?: string, expiresAt?: string) => {
    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longUrl,
          ...(customAlias && { customAlias }),
          ...(expiresAt && { expiresAt }),
        }),
      });

      // Get response text first to handle non-JSON responses
      const responseText = await response.text();
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned ${contentType || 'non-JSON'} response. Response: ${responseText.substring(0, 200)}`);
      }

      let data: ShortenResponse | ShortenError;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', responseText);
        throw new Error(`Invalid JSON response from server: ${responseText.substring(0, 200)}`);
      }

      if (!response.ok) {
        const errorData = data as ShortenError;
        throw new Error(errorData.message || errorData.error || 'Failed to shorten URL');
      }

      const successData = data as ShortenResponse;
      // Construct the full short URL from the shortId
      const fullShortUrl = `${API_BASE_URL}/${successData.shortId}`;
      setShortUrl(fullShortUrl);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Network error: Unable to reach the server. Please check if the backend is running.');
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setShortUrl(null);
    setError(null);
    setLoading(false);
  };

  return {
    shorten,
    shortUrl,
    loading,
    error,
    reset,
  };
};
