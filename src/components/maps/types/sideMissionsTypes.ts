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
    rampages_LCS: {
        color: "#0F3048",
        label: "maps.markers.sideMissions.common.rampages",
        singularLabel: "maps.markers.sideMissions.common.rampage",
    },
    noodlePunk: {
        color: "#FFD1FF",
        label: "🌴",
        singularLabel: "🌴",
    },
    pizzaBoy_LCS: {
        color: "#AD291C",
        label: "maps.markers.sideMissions.common.pizzaBoy",
    },
    seeTheSightBeforeYouFlight: {
        color: "#FFD1FF",
        label: "🌴",
    },
    carSalesman: {
        color: "#FFD1FF",
        label: "🌴",
    },
    bikeSalesman: {
        color: "#FFD1FF",
        label: "🌴",
    },
    karmageddon: {
        color: "#FFD1FF",
        label: "🌴",
    },
    slashTv: {
        color: "#FFD1FF",
        label: "🌴",
    },
    trashDash: {
        color: "#FFD1FF",
        label: "🌴",
        singularLabel: "🌴",
    },
    driveBy: {
        color: "#FFD1FF",
        label: "🌴",
        singularLabel: "🌴",
    },
    rcMission_LCS: {
        color: "#FFD1FF",
        label: "maps.markers.sideMissions.common.rcMissions",
        singularLabel: "maps.markers.sideMissions.vc.rcMission",
    },
    offRoad_LCS: {
        color: "#FFD1FF",
        label: "maps.markers.sideMissions.common.offRoadMissions",
        singularLabel: "maps.markers.sideMissions.common.offRoadMission",
    },
    streetRaces_LCS: {
        color: "#FFD1FF",
        label: "🌴",
        singularLabel: "🌴",
    },
    rampages_VCS: {
        color: "#0F3048",
        label: "maps.markers.sideMissions.common.rampages",
        singularLabel: "maps.markers.sideMissions.common.rampage",
    },
    airRescue: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
    beachPatrol: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
    fireCopter: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
    viceSights: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
    swingersClub: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
    skywolf: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
    crash: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
    rush: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
} as const;

export type SideMissionType = keyof typeof SIDE_MISSION_TYPES;
