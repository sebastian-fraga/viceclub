import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

export const prerender = true;

export const GET: APIRoute = async () => {
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
                "public/assets/images/app/og/fallback.jpg",
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
                                backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.89) 100%)`,
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
                                            fontSize: 84,
                                            color: "#FEF9C2",
                                            fontWeight: 900,
                                            fontFamily: "GTAArtDecoCondensed",
                                        },
                                        children: "VICE CLUB",
                                    },
                                },
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            fontSize: 32,
                                            color: "#e5e5e5",
                                            fontFamily: "GTAArtDecoCondensed",
                                            marginTop: 2,
                                            width: "700px",
                                        },
                                        children:
                                            "El sitio web definitivo para los fans de la saga Grand Theft Auto",
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
