import { MOBILE_BREAKPOINT } from "@/config/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
    return useMediaQuery(`(max-width: ${breakpoint}px)`);
}
