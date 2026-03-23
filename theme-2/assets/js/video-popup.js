export function videoPopup() {
  const videoButton = document.getElementById("videoBtn");
  const popup = document.getElementById("videoPopup");
  const closeButton = document.getElementById("closePopup");
  const video = document.getElementById("popupVideo");

  if (!videoButton || !popup || !closeButton || !video) {
    return;
  }

  videoButton.addEventListener("click", () => {
    popup.classList.remove("hidden");
    popup.classList.add("flex");
    video.play();
  });

  closeButton.addEventListener("click", () => {
    popup.classList.add("hidden");
    popup.classList.remove("flex");
    video.pause();
  });
}
