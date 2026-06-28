import React, { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "./ui/button";

const DISMISS_KEY = "ttx_install_dismissed_v1";
const isiOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const inStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  // iOS
  window.navigator.standalone === true;

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [show, setShow] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (inStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    const onBefore = (e) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onBefore);

    // iOS Safari doesn't fire beforeinstallprompt — show manual hint after 6s
    if (isiOS()) {
      const t = setTimeout(() => setIosHint(true), 6000);
      return () => {
        window.removeEventListener("beforeinstallprompt", onBefore);
        clearTimeout(t);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onBefore);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
    setIosHint(false);
  };

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") dismiss();
    else setShow(false);
  };

  if (!show && !iosHint) return null;

  return (
    <div
      data-testid="install-prompt"
      className="fixed left-1/2 -translate-x-1/2 bottom-4 z-[60] w-[calc(100%-2rem)] max-w-md bg-white border border-border/60 shadow-medium rounded-2xl p-4 flex items-start gap-3 animate-fade-up"
    >
      <div className="w-10 h-10 rounded-xl bg-brand-pinkSoft text-brand-pink grid place-items-center flex-none">
        {iosHint && !show ? <Smartphone className="w-5 h-5" /> : <Download className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-brand-ink text-sm">Install The Travelling Tutor X</p>
        <p className="text-xs text-brand-mute mt-0.5 leading-relaxed">
          {iosHint && !show
            ? "Tap the share icon, then 'Add to Home Screen' to use this site like an app."
            : "Add the app to your home screen — faster access, offline-ready."}
        </p>
        {show && (
          <Button
            data-testid="install-prompt-cta"
            onClick={install}
            className="mt-2.5 h-9 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white text-sm px-4"
          >
            Install app
          </Button>
        )}
      </div>
      <button
        data-testid="install-prompt-dismiss"
        onClick={dismiss}
        aria-label="Dismiss"
        className="p-1 rounded-full text-brand-mute hover:bg-muted"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
