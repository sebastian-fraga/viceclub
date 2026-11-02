/// <reference path="../.astro/types.d.ts" />

declare const __COMMIT__: string;

interface ImportMetaEnv {
    /** Base URL of the R2 bucket hosting the radio .ogg files (no trailing slash required). */
    readonly PUBLIC_R2_BUCKET: string;
}
