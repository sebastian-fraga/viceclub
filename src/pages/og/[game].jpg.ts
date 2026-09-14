import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import { games } from "../../data/games";
import sharp from "sharp";

export const prerender = true;

export function getStaticPaths() {
    return Object.values(games).map((game) => ({
        params: { game: game.id },
        props: { game },
    }));
}

export const GET: APIRoute = async ({ props }) => {
    const { game } = props;
    const accentColor = game.theme.accent.default;

    const [fontData, imageBuffer] = await Promise.all([
        readFile(
            path.join(
                process.cwd(),
                "public/assets/fonts/GTAArtDecoCondensed.ttf",
            ),
        ),
        readFile(
            path.join(
                process.cwd(),
                `public/assets/images/app/og/${game.id}.jpg`,
            ),
        ),
    ]);

    const imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

    const svg = await satori(
        {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    position: "relative",
                },
                children: [
                    {
                        type: "img",
                        props: {
                            src: imageBase64,
                            style: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "1200px",
                                height: "630px",
                                objectFit: "cover",
                            },
                        },
                    },
                    {
                        type: "div",
                        props: {
                            style: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "1200px",
                                height: "630px",
                                display: "flex",
                                backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.92) 100%)`,
                            },
                        },
                    },
                    {
                        type: "div",
                        props: {
                            style: {
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "1200px",
                                display: "flex",
                                flexDirection: "column",
                                padding: "60px",
                            },
                            children: [
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            fontSize: 48,
                                            color: accentColor,
                                            marginBottom: 0,
                                            fontFamily: "GTAArtDecoCondensed",
                                        },
                                        children: "VICE CLUB",
                                    },
                                },
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            fontSize: 72,
                                            color: "#fff",
                                            fontWeight: 900,
                                            fontFamily: "GTAArtDecoCondensed",
                                        },
                                        children: game.title,
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        } as any,
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "GTAArtDecoCondensed",
                    data: fontData,
                    weight: 700,
                },
            ],
        },
    );

    const pngBuffer = new Resvg(svg).render().asPng();

    const jpegBuffer = await sharp(pngBuffer).jpeg({ quality: 85 }).toBuffer();

    return new Response(new Uint8Array(jpegBuffer), {
        headers: { "Content-Type": "image/jpeg" },
    });
};
