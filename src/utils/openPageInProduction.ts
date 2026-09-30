export default function openPageInProduction() {
    const VICE_CLUB_URL = "https://www.viceclub.app/";

    window.open(
        `${VICE_CLUB_URL}${window.location.pathname}${window.location.search}${window.location.hash}`,
        "_blank",
    );
}
