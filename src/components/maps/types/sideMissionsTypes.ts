export const SIDE_MISSION_TYPES = {
    rampages_III: {
        color: "#21A8D2",
        label: "maps.markers.sideMissions.common.rampages",
        singularLabel: "maps.markers.sideMissions.common.rampage",
    },
    rcToyz_III: {
        color: "#FE9E97",
        label: "maps.markers.sideMissions.iii.rcToyz",
    },
    offRoad_III: {
        color: "#FE9E97",
        label: "maps.markers.sideMissions.iii.offRoadMissions",
        singularLabel: "maps.markers.sideMissions.iii.offRoadMission",
    },
} as const;

export type SideMissionType = keyof typeof SIDE_MISSION_TYPES;
