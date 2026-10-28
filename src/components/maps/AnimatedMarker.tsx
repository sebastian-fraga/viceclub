import type { CollectibleData } from "@/components/maps/types";
import { COLLECTIBLE_IMAGE_SIZES } from "@/components/maps/utils/collectibleImage";
import { preloadImage } from "@/lib/preloadImage";
import { motion } from "framer-motion";
import { divIcon } from "leaflet";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import { Marker, Polyline } from "react-leaflet";

export const guidePointIcon = (color: string) =>
    divIcon({
        className: "",
        html: `
            <div style="
                width: 14px;
                height: 14px;
                background: ${color};
                border: 2.5px solid #000000;
                border-radius: 100%;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.9), 0 0 8px ${color};
            "></div>
        `,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });

interface AnimatedMarkerProps {
    collectible: CollectibleData;
    marker: {
        icon?: string;
    };
    meta: { color: string };
    height: number;
    isCompleted: boolean;
    isSelected: boolean;
    zoomScale: number;
    imageUrl: string;
    imageSrcSet: string;
    onSelect: () => void;
}

export default function AnimatedMarker({
    collectible,
    marker,
    meta,
    height,
    isCompleted,
    isSelected,
    zoomScale,
    imageUrl,
    imageSrcSet,
    onSelect,
}: AnimatedMarkerProps) {
    const { customIcon, containerEl } = useMemo(() => {
        const el = document.createElement("div");
        const icon = divIcon({
            className: "custom-leaflet-marker",
            html: el,
            iconSize: [42, 42],
            iconAnchor: [21, 21],
        });
        return { customIcon: icon, containerEl: el };
    }, []);
    const currentScale = isSelected ? zoomScale * 1.25 : zoomScale;

    return (
        <>
            {isSelected && collectible.guide && (
                <>
                    <Polyline
                        positions={[
                            [
                                height - collectible.guide.fromY,
                                collectible.guide.fromX,
                            ],
                            [height - collectible.y, collectible.x],
                        ]}
                        pathOptions={{
                            color: meta.color,
                            dashArray: "6, 8",
                            weight: 3,
                            opacity: 0.9,
                        }}
                    />

                    <Marker
                        position={[
                            height - collectible.guide.fromY,
                            collectible.guide.fromX,
                        ]}
                        icon={guidePointIcon(meta.color)}
                        interactive={false}
                        zIndexOffset={999}
                    />
                </>
            )}

            <Marker
                position={[height - collectible.y, collectible.x]}
                icon={customIcon}
                zIndexOffset={isSelected ? 1000 : 0}
                eventHandlers={{
                    click: () => onSelect(),
                    mouseover: () =>
                        preloadImage(imageUrl, {
                            srcSet: imageSrcSet,
                            sizes: COLLECTIBLE_IMAGE_SIZES,
                        }),
                    mousedown: () =>
                        preloadImage(imageUrl, {
                            srcSet: imageSrcSet,
                            sizes: COLLECTIBLE_IMAGE_SIZES,
                        }),
                }}
            >
                {createPortal(
                    <motion.div
                        initial={false}
                        animate={{
                            scale: isCompleted ? 0.8 : currentScale,
                            opacity: isCompleted ? 0.7 : 1,
                            filter: isCompleted
                                ? "grayscale(70%)"
                                : "grayscale(0%)",
                        }}
                        whileHover={{
                            scale: isCompleted ? 0.9 : currentScale * 1.15,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                        }}
                        className="size-10 max-mobile:size-8 rounded-full cursor-pointer"
                    >
                        <motion.img
                            src={marker.icon}
                            alt=""
                            animate={{
                                boxShadow: isSelected
                                    ? `0 0 0 3px #000000, 0 0 20px ${meta.color}, 0 0 35px ${meta.color}`
                                    : `1px 1px 10px ${meta.color}`,
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block",
                                background: meta.color,
                                borderRadius: "100%",
                                padding: "2px",
                                border: "1px solid",
                                borderColor: `color-mix(in srgb, ${meta.color} 65%, black)`,
                            }}
                        />
                    </motion.div>,
                    containerEl,
                )}
            </Marker>
        </>
    );
}
