import { useCallback } from "react";

export function useScrollToTop() {
  return useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
}

export function useScrollToPosition() {
  return useCallback((y: number = 0) => {
    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, []);
}