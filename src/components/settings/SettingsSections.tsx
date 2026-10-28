import { useTranslation } from "react-i18next";
import { getPlatformOptions, type PlatformFamily } from "@/config/platforms";
import SettingItem, { type SettingStatusMessage } from "./SettingItem";

interface SettingsSectionsProps {
    sections: typeof import("@/config/settings").settingsConfig;
    settings: Record<string, string | boolean>;
    setSetting: (id: string, value: string | boolean) => void;
    isMobile: boolean | null;
    actionStatus: ({ id: string } & SettingStatusMessage) | null;
    handleAction: (id: string) => void;
}

export default function SettingsSections({
    sections,
    settings,
    setSetting,
    isMobile,
    actionStatus,
    handleAction,
}: SettingsSectionsProps) {
    const { t } = useTranslation();
    return (
        <>
            {sections
                .filter(
                    (section) =>
                        !(
                            import.meta.env.PROD && section.hideOnProduction
                        ),
                )
                .map((section) => (
                    <section
                        key={section.id}
                        className="flex flex-col mb-4 px-2 max-mobile:px-0"
                    >
                        <h3 className="text-xs text-gray-300/80 tracking-wide pl-1 mt-4 first:mt-6 mb-1.5 uppercase">
                            {t(section.name)}
                        </h3>

                        <article className="flex flex-col gap-1">
                            {section.settings
                                .filter(
                                    (setting) =>
                                        !(
                                            isMobile && setting.hideOnMobile
                                        ),
                                )
                                .map((setting) => {
                                    const platformFamily =
                                        settings["platform-family"] as
                                            | PlatformFamily
                                            | "default";

                                    const options =
                                        setting.id === "platform"
                                            ? getPlatformOptions(platformFamily)
                                            : undefined;

                                    const statusMessage =
                                        actionStatus?.id === setting.id
                                            ? {
                                                  text: actionStatus.text,
                                                  variant: actionStatus.variant,
                                              }
                                            : undefined;

                                    return (
                                        <SettingItem
                                            key={setting.id}
                                            setting={setting}
                                            value={settings[setting.id]}
                                            onChange={(value) =>
                                                setSetting(setting.id, value)
                                            }
                                            onAction={handleAction}
                                            options={options}
                                            disabled={
                                                setting.id === "platform" &&
                                                platformFamily === "default"
                                            }
                                            statusMessage={statusMessage}
                                        />
                                    );
                                })}
                        </article>
                    </section>
                ))}
        </>
    );
}