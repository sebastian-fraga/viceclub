import type { MouseEvent, PointerEvent } from "react";
import { useRef } from "react";

const DRAG_THRESHOLD = 5;

export function useDragToScroll<T extends HTMLElement>() {
    const drag = useRef({
        pointerId: -1,
        startX: 0,
        startScrollLeft: 0,
        isDragging: false,
        moved: false,
    });

    const onPointerDown = (e: PointerEvent<T>) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;

        const el = e.currentTarget;
        if (el.scrollWidth <= el.clientWidth) return;

        drag.current = {
            pointerId: e.pointerId,
            startX: e.clientX,
            startScrollLeft: el.scrollLeft,
            isDragging: false,
            moved: false,
        };
    };

    const onPointerMove = (e: PointerEvent<T>) => {
        const d = drag.current;
        if (e.pointerId !== d.pointerId) return;

        const el = e.currentTarget;
        const dx = e.clientX - d.startX;

        if (!d.isDragging) {
            if (Math.abs(dx) < DRAG_THRESHOLD) return;
            d.isDragging = true;
            d.moved = true;
            el.setPointerCapture(e.pointerId);
            el.style.cursor = "grabbing";
        }

        el.scrollLeft = d.startScrollLeft - dx;
    };

    const endDrag = (e: PointerEvent<T>) => {
        const d = drag.current;
        if (e.pointerId !== d.pointerId) return;

        d.pointerId = -1;
        if (d.isDragging) {
            d.isDragging = false;
            e.currentTarget.style.cursor = "";
        }
    };

    const onClickCapture = (e: MouseEvent<T>) => {
        if (!drag.current.moved) return;
        drag.current.moved = false;
        e.preventDefault();
        e.stopPropagation();
    };

    return {
        onPointerDown,
        onPointerMove,
        onPointerUp: endDrag,
        onPointerCancel: endDrag,
        onClickCapture,
    };
}
