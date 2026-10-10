import {
    animate,
    motion,
    useMotionValue,
    useTransform,
    type MotionValue,
    type PanInfo,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RadioStation } from "./types/types";

const SWIPE_DISTANCE = 50;
const SWIPE_VELOCITY = 400;
const MAX_ITEM_WIDTH = 280;
const SPRING = { type: "spring", stiffness: 320, damping: 34 } as const;

interface StationCarouselProps {
    stations: RadioStation[];
    activeStationId: string | null;
    onSelect: (stationId: string) => void;
}

export function StationCarousel({
    stations,
    activeStationId,
    onSelect,
}: StationCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasPositionedRef = useRef(false);
    const [width, setWidth] = useState(0);
    const x = useMotionValue(0);

    const activeIndex = Math.max(
        0,
        stations.findIndex((s) => s.id === activeStationId),
    );
    const itemWidth = Math.min(width * 0.62, MAX_ITEM_WIDTH);
    const sidePadding = (width - itemWidth) / 2;

    const targetX = -activeIndex * itemWidth;

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => setWidth(el.clientWidth);
        update();

        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (width === 0) return;

        if (!hasPositionedRef.current) {
            x.set(targetX);
            hasPositionedRef.current = true;
            return;
        }

        const controls = animate(x, targetX, SPRING);
        return () => controls.stop();
    }, [targetX, width, x]);

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const { offset, velocity } = info;
        let next = activeIndex;

        if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) {
            next = activeIndex + 1;
        } else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) {
            next = activeIndex - 1;
        }

        next = Math.min(stations.length - 1, Math.max(0, next));

        if (next !== activeIndex) {
            onSelect(stations[next].id);
        } else {
            animate(x, targetX, SPRING);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden py-4"
            role="group"
            aria-roledescription="carousel"
        >
            {width > 0 && (
                <motion.div
                    className="flex cursor-grab active:cursor-grabbing"
                    style={{
                        x,
                        paddingLeft: sidePadding,
                        paddingRight: sidePadding,
                    }}
                    drag="x"
                    dragMomentum={false}
                    dragElastic={0.15}
                    dragConstraints={{
                        left: Math.max(
                            targetX - itemWidth,
                            -(stations.length - 1) * itemWidth,
                        ),
                        right: Math.min(targetX + itemWidth, 0),
                    }}
                    onDragEnd={handleDragEnd}
                >
                    {stations.map((station, index) => (
                        <CarouselItem
                            key={station.id}
                            station={station}
                            index={index}
                            itemWidth={itemWidth}
                            x={x}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}

interface CarouselItemProps {
    station: RadioStation;
    index: number;
    itemWidth: number;
    x: MotionValue<number>;
}

function CarouselItem({ station, index, itemWidth, x }: CarouselItemProps) {
    const center = -index * itemWidth;
    const range = [center - itemWidth, center, center + itemWidth];

    const scale = useTransform(x, range, [0.74, 1, 0.74]);
    const opacity = useTransform(x, range, [0.45, 1, 0.45]);

    return (
        <motion.div
            className="shrink-0 px-2"
            style={{ width: itemWidth, scale, opacity }}
        >
            <div className="flex aspect-square w-full items-center justify-center rounded-4xl bg-[color-mix(in_oklch,var(--radio-station-accent)_30%,black)] p-6 shadow-2xl shadow-black/40">
                <img
                    src={station.image}
                    alt={station.displayName}
                    draggable={false}
                    className="pointer-events-none h-full w-full select-none object-contain drop-shadow-xl drop-shadow-[color-mix(in_oklch,var(--radio-station-accent)_25%,rgb(255_255_255/5%))]"
                />
            </div>
        </motion.div>
    );
}
