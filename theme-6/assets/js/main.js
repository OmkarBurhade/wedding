import { initCountdown } from "./countdown.js";
import { gallery } from "./gallery.js";
import { initInvitation } from "./invitation.js";
import { initLangToggle } from "./lang-toggle.js";
import { initLogoLoader } from "./loader.js";
import { initMusicPlayer } from "./music.js";
import { initRsvpForm } from "./rsvp-form.js";
import { initScrollProgress } from "./scroll-progress.js";
import { videoPopup } from "./video-popup.js";
import { initWishesForm } from "./wishes-form.js";

function setupAos() {
  if (typeof AOS === "undefined") {
    return;
  }

  const aosOptions = {
    duration: 1200,
    easing: "ease-out",
    once: true,
    offset: 100
  };

  const refreshVisibleAnimations = () => {
    document.querySelectorAll("[data-aos]").forEach((element) => {
      element.classList.remove("aos-animate");
    });

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        AOS.refreshHard();
      });
    });
  };

  AOS.init(aosOptions);

  window.addEventListener("load", () => {
    refreshVisibleAnimations();
  });

  document.addEventListener("invitation:opened", () => {
    window.setTimeout(() => {
      refreshVisibleAnimations();
    }, 180);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLogoLoader();
  setupAos();

  gallery();
  initInvitation();
  initMusicPlayer();
  initCountdown();
  initScrollProgress();
  initRsvpForm();
  videoPopup();
  initWishesForm();
  initLangToggle();
});
