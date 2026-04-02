import { initAudioPlayer } from "./audio-player.js";
import { initCountdown } from "./countdown.js";
import { gallery } from "./gallery.js";
import { initInvitation } from "./invitation.js";
import { initLangToggle } from "./lang-toggle.js";
// import { initLogoLoader } from "./loader.js";
import { initMapToggles } from "./map-toggle.js";
import { initRsvpForm } from "./rsvp-form.js";
import { theme } from "./theme-2.js";
import { initWishesForm } from "./wishes-form.js";

document.addEventListener("DOMContentLoaded", () => {
  // initLogoLoader();
  initAudioPlayer();
  gallery();
  initInvitation();
  initCountdown();
  initMapToggles();
  initRsvpForm();
  initWishesForm();
  initLangToggle();
  theme();
});
