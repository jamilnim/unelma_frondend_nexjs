"use client";

import { useEffect, useState } from "react";
import styles from "./LanguageToggle.module.css";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fi", label: "Suomi" },
  { code: "sv", label: "Svenska" },
];

const COOKIE_NAME = "googtrans";

const getCurrentFromCookie = () => {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match?.[1]) return "en";
  const value = decodeURIComponent(match[1]);
  const parts = value.split("/");
  return parts.at(-1) || "en";
};

const setCookie = (value) => {
  if (typeof document === "undefined") return;
  const expires = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000
  ).toUTCString();
  const baseCookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/`;
  document.cookie = baseCookie;

  const host = window.location.hostname;
  if (host.includes(".")) {
    document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; domain=.${host}`;
  }
};

export default function LanguageToggle() {
  const [current, setCurrent] = useState("en");

  const removeBanner = () => {
    if (typeof window === "undefined") return;
    const bannerIframe = document.getElementById("goog-te-banner-frame");
    if (bannerIframe) bannerIframe.remove();
    const banner = document.querySelector(".goog-te-banner-frame");
    if (banner) banner.remove();
    const body = document.body;
    if (body) {
      body.style.top = "0px";
      body.style.position = "static";
    }
  };

  useEffect(() => {
    setCurrent(getCurrentFromCookie());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initGoogleTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fi,sv",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = initGoogleTranslate;
    }

    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.defer = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      initGoogleTranslate();
    }

    const observer = new MutationObserver(() => removeBanner());
    observer.observe(document.body, { childList: true, subtree: true });

    const intervalId = window.setInterval(removeBanner, 500);
    const timeoutId = window.setTimeout(() => clearInterval(intervalId), 5000);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSelect = (code) => {
    if (code === current) return;
    const value = `/en/${code}`;
    setCookie(value);
    setCurrent(code);
    // Reload to ensure translator applies everywhere
    window.location.reload();
  };

  return (
    <>
      <div id="google_translate_element" className={styles.hidden} />
      <div
        className={styles.toggleWrapper}
        role="group"
        aria-label="Change language"
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleSelect(lang.code)}
            className={`${styles.button} ${
              current === lang.code ? styles.active : ""
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </>
  );
}
