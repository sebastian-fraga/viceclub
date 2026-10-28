"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Accordion({
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            className={cn("rounded-2xl overflow-hidden", className)}
            data-slot="accordion-item"
            {...props}
        />
    );
}

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex my-2">
            <AccordionPrimitive.Trigger
                className={cn(
                    "group flex flex-1 cursor-pointer items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left font-semibold text-base outline-none",
                    "bg-(--button-bg)/40 shadow-2xl shadow-(color:--button-bg)/20",
                    "transition-colors duration-400 hover:bg-(--button-bg-hover)/70",
                    "data-[state=open]:bg-(--button-bg-hover)",
                    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "[&[data-state=open]>svg]:rotate-180",
                    className,
                )}
                data-slot="accordion-trigger"
                {...props}
            >
                {children}
                <IconChevronDown
                    aria-hidden="true"
                    className="pointer-events-none shrink-0 opacity-70 transition-all duration-200 group-hover:opacity-100"
                    size={20}
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            className="overflow-hidden text-base leading-relaxed data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            data-slot="accordion-content"
            {...props}
        >
            <div
                className={cn(
                    "pt-2 pb-6 pl-4 max-w-3xl text-slate-200/90 border-l-2 border-yellow-200",
                    className,
                )}
            >
                {children}
            </div>
        </AccordionPrimitive.Content>
    );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
