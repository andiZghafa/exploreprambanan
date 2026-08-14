"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const CATEGORY_PATHS = ["/arca", "/lingga", "/literacy", "/others"];

export default function CategoryRouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const prevRef = useRef<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [opaque, setOpaque] = useState(false);
  const navigationInProgressRef = useRef(false);

  // Helper to run the fade-to-white then navigate
  const navigateWithFade = (targetPath: string) => {
    navigationInProgressRef.current = true;
    setVisible(true);
    // fade to white
    requestAnimationFrame(() => setOpaque(true));

    // wait for fade to white, then navigate, then fade back
    setTimeout(() => {
      router.push(targetPath);
      // small delay to ensure new page mounted
      setTimeout(() => {
        setOpaque(false);
        // hide overlay after fade-out
        setTimeout(() => {
          setVisible(false);
          navigationInProgressRef.current = false;
        }, 300);
      }, 60);
    }, 260);
  };

  // Intercept clicks on <a> to handle internal navigations and run pre-navigation fade
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.(
        "a",
      ) as HTMLAnchorElement | null;
      if (!el) return;

      // Ignore special links
      if (el.target && el.target !== "_self") return;
      if (el.hasAttribute("download")) return;

      const href = el.getAttribute("href");
      if (!href) return;

      try {
        const url = new URL(href, window.location.origin);
        // only handle same-origin navigations
        if (url.origin !== window.location.origin) return;

        const fullPath = `${url.pathname}${url.search}${url.hash}`;
        const currentFull = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (fullPath === currentFull) return;

        // Intercept internal navigation and run fade before navigating
        e.preventDefault();
        navigateWithFade(fullPath);
      } catch (err) {
        // ignore invalid URLs
      }
    };

    document.addEventListener("click", handler, { capture: true });
    return () =>
      document.removeEventListener("click", handler, { capture: true });
  }, []);

  // Also handle non-click navigations (back/forward or programmatic).
  useEffect(() => {
    const prev = prevRef.current;
    if (prev && prev !== pathname && !navigationInProgressRef.current) {
      // Show a quick white flash then fade to reveal new page (post-navigation)
      setVisible(true);
      setOpaque(true);
      setTimeout(() => {
        setOpaque(false);
        setTimeout(() => setVisible(false), 300);
      }, 120);
    }
    prevRef.current = pathname;
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-50 pointer-events-none bg-white transition-opacity duration-300 ${
        opaque ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
