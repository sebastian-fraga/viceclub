import { MOBILE_BREAKPOINT } from "@/config/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Indica si el viewport es mas estrecho que el breakpoint mobile del sitio.
 *
 * `null` hasta el primer render en cliente (ver `useMediaQuery`).
 */
export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
    return useMediaQuery(`(max-width: ${breakpoint}px)`);
}
