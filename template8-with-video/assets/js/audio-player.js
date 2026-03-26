const SEEK_STEP_SECONDS = 2;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function initAudioPlayer() {
  const backgroundAudio = document.querySelector("#bgMusic");
  const blessingAudio = document.querySelector("#blessingAudio");
  const musicControl = document.querySelector("#musicControl");
  const musicControlIcon = document.querySelector("#playPause");
  const openPlayerButton = document.querySelector("#audioPlayerBtn");
  const popup = document.querySelector("#audioPopup");
  const closePopupButton = document.querySelector("#closeAudioPopup");
  const backwardButton = document.querySelector("#audioBackward");
  const popupPlayPauseButton = document.querySelector("#audioPlayPause");
  const popupPlayPauseIcon = document.querySelector("#audioPlayPauseIcon");
  const fastForwardButton = document.querySelector("#audioForward");
  const progressBar = document.querySelector("#audioProgressBar");
  const seekInput = document.querySelector("#audioSeek");
  const currentTimeLabel = document.querySelector("#audioCurrentTime");
  const durationLabel = document.querySelector("#audioDuration");
  const invitationButton = document.querySelector("#btn-envelope");

  if (
    !backgroundAudio ||
    !blessingAudio ||
    !musicControl ||
    !musicControlIcon ||
    !openPlayerButton ||
    !popup ||
    !closePopupButton ||
    !backwardButton ||
    !popupPlayPauseButton ||
    !popupPlayPauseIcon ||
    !fastForwardButton ||
    !progressBar ||
    !seekInput ||
    !currentTimeLabel ||
    !durationLabel
  ) {
    return;
  }

  // The floating music button controls the background track that starts with the invitation.
  const syncBackgroundAudioUi = () => {
    musicControlIcon.className = backgroundAudio.paused ? "fa-solid fa-play" : "fa-solid fa-pause";
  };

  // The popup player manages a separate blessing track with its own playback state and seek controls.
  const syncUi = () => {
    const isPaused = blessingAudio.paused;
    const iconClassName = isPaused ? "fa-solid fa-play" : "fa-solid fa-pause";
    const duration = Number.isFinite(blessingAudio.duration) ? blessingAudio.duration : 0;
    const currentTime = Number.isFinite(blessingAudio.currentTime) ? blessingAudio.currentTime : 0;
    const progress = duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";

    popupPlayPauseIcon.className = iconClassName;
    currentTimeLabel.textContent = formatTime(currentTime);
    durationLabel.textContent = formatTime(duration);
    progressBar.style.width = progress;
    seekInput.value = duration > 0 ? String((currentTime / duration) * 100) : "0";
  };

  const playBackgroundAudio = async () => {
    // Keep playback mutually exclusive so the background music never overlaps with the blessing audio.
    blessingAudio.pause();
    blessingAudio.currentTime = 0;
    syncUi();

    try {
      await backgroundAudio.play();
    } catch (error) {
      // Browsers can block playback until a user gesture happens.
    }

    syncBackgroundAudioUi();
  };

  const toggleBackgroundAudio = async () => {
    if (backgroundAudio.paused) {
      await playBackgroundAudio();
      return;
    }

    backgroundAudio.pause();
    syncBackgroundAudioUi();
  };

  const playBlessingAudio = async () => {
    // Pause the invitation soundtrack before starting the popup-specific blessing track.
    backgroundAudio.pause();
    syncBackgroundAudioUi();

    try {
      await blessingAudio.play();
    } catch (error) {
      // Browsers can block playback until a user gesture happens.
    }

    syncUi();
  };

  const pauseBlessingAudio = (resetPlayback = false) => {
    blessingAudio.pause();

    if (resetPlayback) {
      blessingAudio.currentTime = 0;
    }

    syncUi();
  };

  const toggleBlessingAudio = async () => {
    if (blessingAudio.paused) {
      await playBlessingAudio();
      return;
    }

    pauseBlessingAudio();
  };

  const openPopup = () => {
    popup.classList.remove("hidden");
    popup.classList.add("flex");
  };

  const closePopup = () => {
    popup.classList.add("hidden");
    popup.classList.remove("flex");
    pauseBlessingAudio(true);
  };

  const seekToPercentage = (percentage) => {
    if (!Number.isFinite(blessingAudio.duration)) {
      return;
    }

    const safePercentage = Math.min(Math.max(percentage, 0), 100);
    blessingAudio.currentTime = (safePercentage / 100) * blessingAudio.duration;
    syncUi();
  };

  musicControl.addEventListener("click", toggleBackgroundAudio);
  popupPlayPauseButton.addEventListener("click", toggleBlessingAudio);

  openPlayerButton.addEventListener("click", async () => {
    openPopup();
    await playBlessingAudio();
    syncUi();
  });

  closePopupButton.addEventListener("click", closePopup);

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup();
    }
  });

  backwardButton.addEventListener("click", () => {
    blessingAudio.currentTime = Math.max(blessingAudio.currentTime - SEEK_STEP_SECONDS, 0);
    syncUi();
  });

  fastForwardButton.addEventListener("click", () => {
    if (!Number.isFinite(blessingAudio.duration)) {
      return;
    }

    blessingAudio.currentTime = Math.min(blessingAudio.currentTime + SEEK_STEP_SECONDS, blessingAudio.duration);
    syncUi();
  });

  seekInput.addEventListener("input", () => {
    seekToPercentage(Number(seekInput.value));
  });

  invitationButton?.addEventListener("click", playBackgroundAudio);
  document.addEventListener("invitation:opened", playBackgroundAudio);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.classList.contains("flex")) {
      closePopup();
    }
  });

  backgroundAudio.addEventListener("play", syncBackgroundAudioUi);
  backgroundAudio.addEventListener("pause", syncBackgroundAudioUi);

  blessingAudio.addEventListener("play", syncUi);
  blessingAudio.addEventListener("pause", syncUi);
  blessingAudio.addEventListener("timeupdate", syncUi);
  blessingAudio.addEventListener("loadedmetadata", syncUi);
  blessingAudio.addEventListener("ended", syncUi);

  syncBackgroundAudioUi();
  syncUi();
}
