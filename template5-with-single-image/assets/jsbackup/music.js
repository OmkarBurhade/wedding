export function initMusicPlayer() {
  const musicControl = document.querySelector("#musicControl");
  const audio = document.querySelector("#bgMusic");
  const icon = document.querySelector("#playPause");

  if (!musicControl || !audio || !icon) {
    return;
  }

  const syncIcon = () => {
    icon.className = audio.paused ? "fa-solid fa-play" : "fa-solid fa-pause";
  };

  const playAudio = async () => {
    try {
      await audio.play();
    } catch (error) {
      // Autoplay can be blocked until there is a gesture.
    }
    syncIcon();
  };

  musicControl.addEventListener("click", async () => {
    if (audio.paused) {
      await playAudio();
      return;
    }

    audio.pause();
    syncIcon();
  });
document.querySelector('#btn-envelope').addEventListener('click', async ()=>{
  if (audio.paused) {
      await playAudio();
      return;
    }

    audio.pause();
    syncIcon();
})
  document.addEventListener("invitation:opened", playAudio);
  audio.addEventListener("play", syncIcon);
  audio.addEventListener("pause", syncIcon);
  syncIcon();
}
