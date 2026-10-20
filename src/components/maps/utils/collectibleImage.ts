const S3_BASE = "https://viceclub.s3.us-east-1.amazonaws.com";

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

export const THUMB_WIDTHS = [480, 640, 960, 1280] as const;

export const COLLECTIBLE_IMAGE_SIZES =
    "(max-width: 640px) calc(100vw - 48px), 288px";

export const getCollectibleImageSrcSet = (
    gameId: string,
    variant: string | undefined,
    type: string,
    id: string,
) =>
    THUMB_WIDTHS.map(
        (width) =>
            `${getCollectibleThumbUrl(gameId, variant, type, id, width)} ${width}w`,
    ).join(", ");
