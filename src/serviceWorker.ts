// Registers dist/sw.js (built by vite.config.ts) so the app opens offline after the first visit.
// A newly deployed version installs in the background and waits; onUpdateReady tells the page so it
// can offer a reload, and applyUpdate switches to it.

let waiting: ServiceWorker | null = null;
const listeners = new Set<() => void>();

function setWaiting(worker: ServiceWorker | null) {
  waiting = worker;
  listeners.forEach((fn) => fn());
}

export function registerServiceWorker(): void {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
      .then((reg) => {
        // Only an update (a worker already controls the page) needs the banner; the very first
        // install just finishes quietly.
        const track = (worker: ServiceWorker | null) => {
          if (!worker) return;
          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) setWaiting(worker);
          });
        };
        if (reg.waiting && navigator.serviceWorker.controller) setWaiting(reg.waiting);
        track(reg.installing);
        reg.addEventListener("updatefound", () => track(reg.installing));
        // Phones keep the page open for days; look for a new version when it comes back to the front.
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") reg.update().catch(() => {});
        });
      })
      .catch(() => {
        // No offline support (private mode, blocked): the site still works online.
      });
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  });
}

export function isUpdateReady(): boolean {
  return waiting !== null;
}

export function onUpdateReady(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function applyUpdate(): void {
  waiting?.postMessage("skip-waiting");
}
