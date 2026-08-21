import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import Title from "../ui/Title";

const GAMES = [
    { id: "III", name: "GTA III" },
    { id: "VC", name: "GTA Vice City" },
    { id: "SA", name: "GTA San Andreas" },
    { id: "LCS", name: "GTA Liberty City Stories" },
    { id: "VCS", name: "GTA Vice City Stories" },
    { id: "IV", name: "GTA IV" },
    { id: "V", name: "GTA V" },
    { id: "VI", name: "GTA VI" },
];

const DRAG_THRESHOLD = 2;
const FADE_SIZE = 64;
const EDGE_TOLERANCE = 1;

export default function GameCarousel() {
    const { t } = useTranslation();
    const scrollerRef = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);
    const hasDragged = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    function updateScrollState() {
        const el = scrollerRef.current;
        if (!el) return;

        const isAtStart = el.scrollLeft <= 2;
        const isAtEnd =
            Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 2;

        console.log({
            scrollLeft: el.scrollLeft,
            clientWidth: el.clientWidth,
            scrollWidth: el.scrollWidth,
            isAtStart,
            isAtEnd,
            canScrollLeft: !isAtStart,
            canScrollRight: !isAtEnd,
        });

        setCanScrollLeft(!isAtStart);
        setCanScrollRight(!isAtEnd);
    }

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        updateScrollState();

        const resizeObserver = new ResizeObserver(() => {
            updateScrollState();
        });

        resizeObserver.observe(el);
        for (const child of el.children) {
            resizeObserver.observe(child);
        }

        el.addEventListener("scroll", updateScrollState, { passive: true });

        return () => {
            resizeObserver.disconnect();
            el.removeEventListener("scroll", updateScrollState);
        };
    }, []);

    function handlePointerDown(e: React.PointerEvent) {
        if (!scrollerRef.current) return;

        if (e.pointerType !== "mouse") return;

        isDragging.current = true;
        hasDragged.current = false;
        startX.current = e.clientX;
        startScrollLeft.current = scrollerRef.current.scrollLeft;
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (!isDragging.current || !scrollerRef.current) return;

        const delta = e.clientX - startX.current;

        if (Math.abs(delta) > DRAG_THRESHOLD) {
            if (!hasDragged.current) {
                hasDragged.current = true;
                scrollerRef.current.setPointerCapture(e.pointerId);
            }
            scrollerRef.current.scrollLeft = startScrollLeft.current - delta;
        }
    }

    function handlePointerUp(e: React.PointerEvent) {
        if (!isDragging.current) return;

        isDragging.current = false;

        if (scrollerRef.current?.hasPointerCapture(e.pointerId)) {
            scrollerRef.current.releasePointerCapture(e.pointerId);
        }
    }

    function handleCardClick(e: React.MouseEvent) {
        if (hasDragged.current) {
            e.preventDefault();
        }
    }

    function scrollByAmount(direction: 1 | -1) {
        scrollerRef.current?.scrollBy({
            left: direction * 320,
            behavior: "smooth",
        });
    }

    const maskImage = [
        "linear-gradient(to right",
        canScrollLeft ? `transparent 0px, black ${FADE_SIZE}px` : "black 0px",
        canScrollRight
            ? `black calc(100% - ${FADE_SIZE}px), transparent 100%`
            : "black 100%",
    ].join(", ");

    return (
        <section
            className="w-full max-w-400 flex flex-col items-start scroll-mt-62"
            id="explore"
        >
            <div className="flex items-center justify-between w-full">
                <Title label={t("index.titles.carousel")} />

                <div className="flex gap-2 pr-1">
                    <button
                        type="button"
                        onClick={() => scrollByAmount(-1)}
                        disabled={!canScrollLeft}
                        aria-label="Anterior"
                        className="rounded-full p-2 border border-white/20 text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                    >
                        <IconChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByAmount(1)}
                        disabled={!canScrollRight}
                        aria-label="Siguiente"
                        className="rounded-full p-2 border border-white/20 text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                    >
                        <IconChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                className="relative w-full"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <div
                    ref={scrollerRef}
                    onScroll={updateScrollState}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className="flex gap-5 overflow-x-auto pr-6 pl-1 py-6 snap-x snap-mandatory mx-8 scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing select-none"
                >
                    {GAMES.map((game) => (
                        <a
                            key={game.id}
                            href={`/${game.id}/inicio`}
                            onClick={handleCardClick}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            className="group relative block w-56 max-mobile:w-40 shrink-0 snap-start overflow-hidden rounded-xl border-2 border-transparent hover:border-cyan-200 focus-visible:border-yellow-200 outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] active:scale-95 will-change-transform"
                        >
                            <img
                                src={`/assets/images/main/boxarts/portada_${game.id}.webp`}
                                alt={game.name}
                                loading="lazy"
                                decoding="async"
                                draggable={false}
                                className="aspect-2/3 w-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                            <span className="absolute bottom-0 left-0 right-0 translate-y-3 px-3 py-3 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
                                {game.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
