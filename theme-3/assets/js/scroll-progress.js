export function initScrollProgress() {
  const progressBar = document.querySelector(".js-scroll-progress");
  const rightScroll = document.getElementById("right-scroll");

  if (!progressBar) {
    return;
  }

  const updateProgress = () => {
    const usePanelScroll =
      rightScroll &&
      rightScroll.classList.contains("h-screen") &&
      rightScroll.scrollHeight > rightScroll.clientHeight;

    const scrollTop = usePanelScroll
      ? rightScroll.scrollTop
      : document.documentElement.scrollTop || document.body.scrollTop;

    const scrollHeight = usePanelScroll
      ? rightScroll.scrollHeight - rightScroll.clientHeight
      : document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  rightScroll?.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  document.addEventListener("invitation:opened", updateProgress);
  updateProgress();
}
