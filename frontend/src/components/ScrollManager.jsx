import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// On navigation: jump to the #section in the URL if there is one (dropdown
// links point at page sections), otherwise start the new page at the top.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;
    // The section may not be rendered yet on a fresh page, so retry briefly.
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 20) timer = setTimeout(scroll, 50);
    };
    scroll();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
