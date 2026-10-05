export default function openPageInPageSpeed() {
    const VICE_CLUB_URL = "https://www.viceclub.app";
    const PAGESPEED_URL = "https://pagespeed.web.dev/analysis?url=";

    const pageUrl = `${VICE_CLUB_URL}${window.location.pathname}${window.location.search}${window.location.hash}`;

    window.open(`${PAGESPEED_URL}${encodeURIComponent(pageUrl)}`, "_blank");
}
