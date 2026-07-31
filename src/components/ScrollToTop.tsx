import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll window to top on every Cadbury route change. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
