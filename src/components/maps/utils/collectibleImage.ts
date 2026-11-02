import thumbConfig from "@/data/map-thumb-widths.json";

const S3_BASE = import.meta.env.PUBLIC_S3_BUCKET;

const buildPath = (segments: (string | undefined)[]) =>
    segments.filter(Boolean).join("/");

export const getCollectibleImageUrl = (
    gameId: string,
    variant: string | undefined,
    type: string,
    id: string,
) => `${S3_BASE}/${buildPath([gameId, "maps", variant, type, `${id}.webp`])}`;

export const getCollectibleThumbUrl = (
    gameId: string,
    variant: string | undefined,
    type: string,
    id: string,
    width: number,
) =>
    `${S3_BASE}/${buildPath([
        gameId,
        "maps",
        "thumbs",
        variant,
        type,
        `${id}-${width}.webp`,
    ])}`;

export const THUMB_WIDTHS: readonly number[] = thumbConfig.widths;

export const COLLECTIBLE_IMAGE_SIZES =
    "(max-width: 640px) calc(100vw - 48px), 288px";

export const getCollectibleImageSrcSet = (
    gameId: string,
    variant: string | undefined,
    type: string,
    id: string,
    excludeWidths: readonly number[] = [],
) =>
    THUMB_WIDTHS.filter((width) => !excludeWidths.includes(width))
        .map(
            (width) =>
                `${getCollectibleThumbUrl(gameId, variant, type, id, width)} ${width}w`,
        )
        .join(", ");

export const getThumbWidthFromUrl = (url: string): number | undefined =>
    THUMB_WIDTHS.find(
        (width) =>
            url.includes("/maps/thumbs/") && url.endsWith(`-${width}.webp`),
    );
