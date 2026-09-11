export const SIDE_MISSION_TYPES = {
    rampages_III: {
        color: "#21A8D2",
        label: "maps.markers.sideMissions.common.rampages",
        singularLabel: "maps.markers.sideMissions.common.rampage",
    },
    rcMission_III: {
        color: "#FDFF12",
        label: "maps.markers.sideMissions.common.rcMissions",
        singularLabel: "maps.markers.sideMissions.iii.rcToyz",
    },
    offRoad_III: {
        color: "#364668",
        label: "maps.markers.sideMissions.common.offRoadMissions",
        singularLabel: "maps.markers.sideMissions.common.offRoadMission",
    },
    rampages_VC: {
        color: "#E08BF8",
        label: "maps.markers.sideMissions.common.rampages",
        singularLabel: "maps.markers.sideMissions.common.rampage",
    },
    pizzaBoy_VC: {
        color: "#AD291C",
        label: "maps.markers.sideMissions.common.pizzaBoy",
    },
    chopperCheckpoint_VC: {
        color: "#D74198",
        label: "maps.markers.sideMissions.vc.chopperCheckpoint",
    },
    offRoad_VC: {
        color: "#5664AD",
        label: "maps.markers.sideMissions.common.offRoadMissions",
        singularLabel: "maps.markers.sideMissions.common.offRoadMission",
    },
    rcMission_VC: {
        color: "#A412FF",
        label: "maps.markers.sideMissions.common.rcMissions",
        singularLabel: "maps.markers.sideMissions.vc.rcMission",
    },
    storeRobbery_VC: {
        color: "#0D0C0D",
        label: "maps.markers.sideMissions.vc.storeRobberies",
        singularLabel: "maps.markers.sideMissions.vc.storeRobbery",
    },
} as const;

export type SideMissionType = keyof typeof SIDE_MISSION_TYPES;
