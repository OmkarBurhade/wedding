export function initInvitation() {
  const openButton = document.querySelector("#btn-envelope");
  const coverSection = document.querySelector(".envelope-wrap");
  const mainContent = document.querySelector("#mainContent, #app");

  if (!openButton || !coverSection || !mainContent) {
    return;
  }

  document.body.style.overflow = "hidden";

  openButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    coverSection.style.transform = "translateY(-100%)";

    window.setTimeout(() => {
      mainContent.classList.remove("hidden");
      mainContent.classList.remove("-z-10");
      coverSection.style.display = "none";
      document.body.style.overflow = "";
      document.dispatchEvent(new CustomEvent("invitation:opened"));
    }, 500);
  });
}
