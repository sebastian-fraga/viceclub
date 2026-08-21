export const storeIds = [
    "rgl",
    "steam",
    "playstation",
    "xbox",
    "switch",
    "android",
    "ios",
] as const;

export type StoreIcon = (typeof storeIds)[number];
