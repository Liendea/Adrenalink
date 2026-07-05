import { useEffect, useState } from "react";
import "./AppBanner.scss";

const SESSION_KEY = "appBannerDismissed";
const APP_STORE_URL = "#";
const GOOGLE_PLAY_URL = "#";

export default function AppBanner() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true",
  );

  useEffect(() => {
    document.body.classList.toggle("has-app-banner", !dismissed);
    return () => document.body.classList.remove("has-app-banner");
  }, [dismissed]);

  if (dismissed) return null;

  const handleDismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setDismissed(true);
  };

  return (
    <div className="app-banner">
      <p className="app-banner__text">
        Ladda ner appen för bättre upplevelse på mobil
      </p>
      <div className="app-banner__links">
        <a
          href={APP_STORE_URL}
          className="app-banner__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          App Store
        </a>
        <a
          href={GOOGLE_PLAY_URL}
          className="app-banner__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Play
        </a>
      </div>
      <button
        type="button"
        className="app-banner__close"
        aria-label="Stäng"
        onClick={handleDismiss}
      >
        ×
      </button>
    </div>
  );
}
