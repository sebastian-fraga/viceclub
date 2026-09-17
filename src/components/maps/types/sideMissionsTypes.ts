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
        color: "#4E7A9F",
        label: "🌴",
        singularLabel: "🌴",
    },
    pizzaBoy_LCS: {
        color: "#AD291C",
        label: "maps.markers.sideMissions.common.pizzaBoy",
    },
    seeTheSightBeforeYouFlight: {
        color: "#C6AD77",
        label: "🌴",
    },
    carSalesman: {
        color: "#06FBFF",
        label: "🌴",
    },
    bikeSalesman: {
        color: "#7EBBC8",
        label: "🌴",
    },
    karmageddon: {
        color: "#D60133",
        label: "🌴",
    },
    slashTv: {
        color: "#21295F",
        label: "🌴",
    },
    trashDash: {
        color: "#115A17",
        label: "🌴",
        singularLabel: "🌴",
    },
    driveBy: {
        color: "#8C0B0B",
        label: "🌴",
        singularLabel: "🌴",
    },
    rcMission_LCS: {
        color: "#FFFDA3",
        label: "maps.markers.sideMissions.common.rcMissions",
        singularLabel: "maps.markers.sideMissions.vc.rcMission",
    },
    offRoad_LCS: {
        color: "#FE8FFE",
        label: "maps.markers.sideMissions.common.offRoadMissions",
        singularLabel: "maps.markers.sideMissions.common.offRoadMission",
    },
    streetRaces_LCS: {
        color: "#3A3A3A",
        label: "🌴",
        singularLabel: "🌴",
    },
    rampages_VCS: {
        color: "#C87AE6",
        label: "maps.markers.sideMissions.common.rampages",
        singularLabel: "maps.markers.sideMissions.common.rampage",
    },
    airRescue: {
        color: "#E32F2F",
        label: "🌴",
        singularLabel: "🌴",
    },
    beachPatrol: {
        color: "#FFDFA8",
        label: "🌴",
        singularLabel: "🌴",
    },
    fireCopter: {
        color: "#9ABDE5",
        label: "🌴",
        singularLabel: "🌴",
    },
    viceSights: {
        color: "#504BDA",
        label: "🌴",
        singularLabel: "🌴",
    },
    swingersClub: {
        color: "#6DF059",
        label: "🌴",
        singularLabel: "🌴",
    },
    skywolf: {
        color: "rgb(248 248 53)",
        label: "🌴",
        singularLabel: "🌴",
    },
    crash: {
        color: "#693C86",
        label: "🌴",
        singularLabel: "🌴",
    },
    rush: {
        color: "#171818",
        label: "🌴",
        singularLabel: "🌴",
    },
} as const;

export type SideMissionType = keyof typeof SIDE_MISSION_TYPES;
