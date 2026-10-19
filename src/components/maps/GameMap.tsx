import VariantSelector from "@/components/home/VariantSelector";
import GameMapCanvas from "@/components/maps/GameMapCanvas";
import { getGameMapData } from "@/lib/maps/loadMapData";
import type { GameId } from "@/config/games";
import { games } from "@/data/games";
import { themeToCssVars } from "@/lib/theme";
import { AnimatePresence, motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { useMemo, useState } from "react";

interface GameMapProps {
    gameId: GameId;
}

function getInitialVariant(gameId: GameId) {
    const variant = new URLSearchParams(window.location.search).get("variant");

    return (
        games[gameId].variants?.find(
            (item) => item.id.toLowerCase() === variant?.toLowerCase(),
        )?.id ?? gameId
    );

    
}

export default function GameMap({ gameId }: GameMapProps) {
    const [variantId, setVariantId] = useState(() => getInitialVariant(gameId));

    const game = games[gameId];

    const selectedVariant = game.variants?.find(
        (variant) => variant.id === variantId,
    );

    const activeTheme = selectedVariant?.theme ?? game.theme;
    const variants = games[gameId]?.variants;

    const mapData = useMemo(
        () => getGameMapData(gameId, variantId),
        [gameId, variantId],
    );

    if (!mapData?.mapMeta) {
        return null;
    }

    const handleVariantChange = (variantId: string) => {
        setVariantId(variantId);

        const url = new URL(window.location.href);

        if (variantId === gameId) {
            url.searchParams.delete("variant");
        } else {
            url.searchParams.set("variant", variantId);
        }

        url.searchParams.delete("type");
        url.searchParams.delete("marker");

        window.history.replaceState({}, "", url);
    };

    return (
        <div
            className="flex h-full w-full flex-col"
            style={themeToCssVars(activeTheme)}
        >
            {variants && (
                <div className="mt-4 flex justify-center">
                    <VariantSelector
                        variants={variants}
                        selected={variantId}
                        onChange={handleVariantChange}
                    />
                </div>
            )}

            <div className="relative h-full min-h-0 w-full flex-1">
                <AnimatePresence initial={false} mode="sync">
                    <motion.div
                        key={variantId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <GameMapCanvas
                            gameId={gameId}
                            variantId={variantId}
                            data={{
                                collectibles: mapData.collectibles ?? {},
                                sideMissions: mapData.sideMissions ?? {},
                                timeTrials: mapData.timeTrials ?? {},
                                challenges: mapData.challenges ?? {},
                                locations: mapData.locations ?? {},
                            }}
                            {...mapData.mapMeta}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
