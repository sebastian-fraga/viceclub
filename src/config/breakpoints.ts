/**
 * Breakpoint "mobile" del sitio.
 *
 * DEBE coincidir con `--breakpoint-mobile` de `src/styles/main.css`, que es
 * lo que genera las variantes `max-mobile:` de Tailwind. Si divergen, el JS
 * y el CSS discrepan sobre cuando aplica el layout movil.
 */
export const MOBILE_BREAKPOINT = 660;

/** Media query equivalente al breakpoint mobile del sitio. */
export const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`;
