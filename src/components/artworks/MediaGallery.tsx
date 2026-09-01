import Title from "@/components/ui/Title";
import { gamesList, type GameId } from "@/config/games";
import useLocale from "@/hooks/useLocale";
import { useMemo, useRef, useState } from "react";
import { CategorySwitcher } from "./CategorySwitcher";
import { Lightbox } from "./Lightbox";
import { flattenCategory } from "./mediaUtils";
import { SectionGrid } from "./SectionGrid";
import type { GameMediaIndex, MediaCategory } from "./types";
import { useLightbox } from "./useLightbox";

import useT from "@/hooks/useT";
import { AnimatePresence, motion } from "framer-motion";
import { flushSync } from "react-dom";
import "./artworks.css";

interface Props {
    gameId: GameId;
    data: GameMediaIndex;
}

export function MediaGallery({ gameId, data }: Props) {
    const gameInfo = gamesList.find((item) => item.id === gameId);
    const i18n = useT();
    const lang = useLocale();

    const [category, setCategory] = useState<MediaCategory>("artworks");
    const flatImages = useMemo(
        () => flattenCategory(data, category),
        [data, category],
    );
    const lightbox = useLightbox(flatImages);

    const thumbRefs = useRef(new Map<string, HTMLImageElement>());

    function registerThumb(id: string, el: HTMLImageElement | null) {
        if (el) thumbRefs.current.set(id, el);
        else thumbRefs.current.delete(id);
    }

    function handleClose() {
        const imgEl = lightbox.current
            ? thumbRefs.current.get(lightbox.current.id)
            : null;

        if (!document.startViewTransition || !imgEl) {
            lightbox.close();
            return;
        }

        const transition = document.startViewTransition(() => {
            imgEl.style.viewTransitionName = "gallery-image";
            flushSync(() => {
                lightbox.close();
            });
        });

        transition.finished.finally(() => {
            imgEl.style.viewTransitionName = "";
        });
    }

    return (
        <>
            <CategorySwitcher active={category} onChange={setCategory} />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto mt-30 max-w-430 max-mobile:mt-0 max-mobile:mx-4"
            >
                <div className="mb-12 mt-6 max-w-fit">
                    <Title
                        label={i18n("artworks.title", {
                            fullName: gameInfo?.fullName,
                        })}
                    />
                </div>

                <AnimatePresence>
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {Object.entries(data[category]).map(
                            ([section, images]) => (
                                <SectionGrid
                                    key={section}
                                    gameId={gameId}
                                    category={category}
                                    section={section}
                                    images={images.map((img) => ({
                                        ...img,
                                        section,
                                    }))}
                                    lang={lang}
                                    onSelect={lightbox.open}
                                    registerThumb={registerThumb}
                                    activeImageId={null}
                                />
                            ),
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {lightbox.isOpen && lightbox.current && (
                <Lightbox
                    gameId={gameId}
                    category={category}
                    image={lightbox.current}
                    lang={lang}
                    onNext={lightbox.next}
                    onPrev={lightbox.prev}
                    canNext={lightbox.canNext}
                    canPrev={lightbox.canPrev}
                    onClose={lightbox.close}
                />
            )}
        </>
    );
}
