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

  // Helper to run the fade-to-white then navigate
  const navigateWithFade = (targetPath: string) => {
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
        setTimeout(() => setVisible(false), 300);
      }, 60);
    }, 260);
  };

  // Intercept clicks on <a> to handle category-to-category navigation
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.(
        "a",
      ) as HTMLAnchorElement | null;
      if (!el) return;
      const href = el.getAttribute("href") || el.href;
      if (!href) return;

      try {
        const url = new URL(href, window.location.origin);
        const path = url.pathname;
        const isTargetCategory = CATEGORY_PATHS.includes(path);
        const isFromCategory = CATEGORY_PATHS.includes(
          window.location.pathname,
        );
        const isFromHome = window.location.pathname === "/";

        // Trigger fade when navigating between categories, from a category to home,
        // or from home to a category
        const isNavigatingCategoryToHome = path === "/" && isFromCategory;
        const isNavigatingHomeToCategory = isFromHome && isTargetCategory;

        if (
          isNavigatingCategoryToHome ||
          isNavigatingHomeToCategory ||
          (isTargetCategory && isFromCategory)
        ) {
          e.preventDefault();
          navigateWithFade(path);
        }
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
    if (prev) {
      const wasCategory = CATEGORY_PATHS.includes(prev);
      const isCategoryNow = CATEGORY_PATHS.includes(pathname);

      // category -> category OR category -> home OR home -> category
      if (
        (wasCategory && (isCategoryNow || pathname === "/")) ||
        (prev === "/" && isCategoryNow)
      ) {
        // Show a quick white flash then fade to reveal new page
        setVisible(true);
        setOpaque(true);
        setTimeout(() => {
          setOpaque(false);
          setTimeout(() => setVisible(false), 300);
        }, 120);
      }
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
