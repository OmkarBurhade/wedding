export function initInvitation() {
  const openButton = document.querySelector("#btn-envelope");
  const coverSection = document.querySelector(".envelope-wrap");
  const mainContent = document.querySelector("#mainContent");
  const footer = document.querySelector("#mainFooter");

  if (!openButton || !coverSection || !mainContent) {
    return;
  }

  document.body.classList.add("is-locked");

  openButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    coverSection.style.transform = "translateY(-100%)";
    document.body.classList.remove("is-loading");
    document.querySelector("[data-loader]")?.classList.add("is-hidden");
    document.dispatchEvent(new CustomEvent("invitation:opened"));

    window.setTimeout(() => {
      mainContent.classList.remove("-z-10");
      coverSection.style.display = "none";
      document.body.classList.remove("is-locked");
    }, 500);
  });
}
