import { initCountdown } from "./countdown.js";
import { gallery } from "./gallery.js";
import { initInvitation } from "./invitation.js";
import { initLangToggle } from "./lang-toggle.js";
// import { initLogoLoader } from "./loader.js";
import { initMapToggles } from "./map-toggle.js";
import { initMusicPlayer } from "./music.js";
import { initRsvpForm } from "./rsvp-form.js";
import { theme } from "./theme-2.js";
import { videoPopup } from "./video-popup.js";
import { initWishesForm } from "./wishes-form.js";

document.addEventListener("DOMContentLoaded", () => {
  // initLogoLoader();
  gallery();
  initInvitation();
  initMusicPlayer();
  initCountdown();
  initMapToggles();
  initRsvpForm();
  initWishesForm();
  initLangToggle();
  videoPopup();
  theme()
});
