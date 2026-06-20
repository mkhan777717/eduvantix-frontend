/**
 * Resolves the backend API base URL dynamically.
 * Detects the client's network IP (e.g. 192.168.x.x) or falls back to 127.0.0.1 (preferred over localhost in Windows due to IPv6 loopback issues).
 * Handles production vs development environment variables.
 */
export function getApiBase(fallbackPort = 5001) {
  // Explicit production API URL wins first.
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    // In deployed environments without a configured API URL, use same-origin.
    if (
      hostname &&
      hostname !== "localhost" &&
      hostname !== "127.0.0.1" &&
      hostname !== "::1"
    ) {
      return window.location.origin;
    }
  }

  // Preferred local network fallback is 127.0.0.1 to avoid Windows IPv6 resolution issues.
  const defaultLocal = `http://127.0.0.1:${fallbackPort}`;
  return defaultLocal;
}
