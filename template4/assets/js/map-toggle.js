export function initMapToggles() {
  document.querySelectorAll(".js-map-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.dataset.target);

      if (!panel) {
        return;
      }

      panel.classList.toggle("is-open");
    });
  });
}
