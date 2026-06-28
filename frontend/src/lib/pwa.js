// Registers the service worker only in production builds (CRA sets NODE_ENV=production for build).
// Hot-reloading dev never registers SW so it doesn't interfere with development.
export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  if (process.env.NODE_ENV !== "production") return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .catch((err) => console.warn("SW registration failed", err));
  });
}
