import DropdownSelector from "@/components/ui/selector/DropdownSelector";
import type { ComponentType, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export interface MultiSelectorOption<
    T1 extends string = string,
    T2 extends string = string,
> {
    id: T1;
    label: string;
    icon?: ComponentType<any>;
    subOptions?: Array<{
        id: T2;
        label: string;
        labelEdition?: string;
        icon?: ComponentType<any>;
        infoBanner?: ReactNode;
    }>;
    infoBanner?: ReactNode;
}

export interface MultiSelectorProps<
    T1 extends string = string,
    T2 extends string = string,
> {
    options: MultiSelectorOption<T1, T2>[];
    selectedPrimaryId: T1;
    selectedSecondaryId?: T2;
    onSelectPrimary: (id: T1) => void;
    onSelectSecondary: (id: T2) => void;
    className?: string;
}

export function MultiSelector<
    T1 extends string = string,
    T2 extends string = string,
>({
    options,
    selectedPrimaryId,
    selectedSecondaryId,
    onSelectPrimary,
    onSelectSecondary,
}: MultiSelectorProps<T1, T2>) {
    const {t} = useTranslation()
    const activePrimary = options.find(
        (option) => option.id === selectedPrimaryId,
    );

    const activeSecondary = activePrimary?.subOptions?.find(
        (option) => option.id === selectedSecondaryId,
    );

    const activeBanner =
        activeSecondary?.infoBanner ?? activePrimary?.infoBanner;

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-wrap gap-3 max-mobile:gap-2">
                {options.map((option) => {
                    const isSelected = option.id === selectedPrimaryId;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onSelectPrimary(option.id)}
                            className={`flex items-center gap-5 max-mobile:gap-3 px-10 max-mobile:px-5 py-4 max-mobile:py-2.5 rounded-full transition-all cursor-pointer select-none text-xl max-mobile:text-base font-bold ${
                                isSelected
                                    ? "bg-(--game-accent) text-(--game-buttons-primary-text) shadow-md shadow-yellow-500/10 scale-[1.02]"
                                    : "hover:text-(--game-accent)"
                            }`}
                        >
                            <span>{option.label}</span>
                        </button>
                    );
                })}
            </div>

            {activePrimary?.subOptions &&
                activePrimary.subOptions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in duration-200">
                        <DropdownSelector
                            placeholder={t("common.buttons.selectPlatform")}
                            options={activePrimary.subOptions}
                            selectedOption={activeSecondary}
                            onSelect={onSelectSecondary}
                            disabled={activePrimary.subOptions.length === 1}
                        />
                    </div>
                )}

            {activeBanner && (
                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80 text-zinc-300 text-xs flex items-start gap-3 animate-in fade-in duration-200">
                    <div className="text-yellow-500 shrink-0 font-bold text-base leading-none">
                        ℹ
                    </div>

                    <div className="leading-relaxed">{activeBanner}</div>
                </div>
            )}
        </div>
    );
}
