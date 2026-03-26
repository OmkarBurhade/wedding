export function initLangToggle() {
  const openButton =
    document.getElementById("open-translate") ||
    document.getElementById("openTranslate");
  const translateBox =
    document.getElementById("translateBox") ||
    document.getElementById("translateModal");
  const overlay =
    document.getElementById("overlay") ||
    document.getElementById("translateBackdrop");
  const card =
    document.getElementById("popupCard") ||
    translateBox?.querySelector(".relative.z-10");
  const closeButton =
    document.getElementById("close-translate") ||
    document.getElementById("closeTranslate");
  const translateLoading = document.getElementById("translateLoading");

  if (!openButton || !translateBox || !overlay || !card || !closeButton) {
    return;
  }

  function setLoading(isLoading) {
    if (!translateLoading) return;
    translateLoading.classList.toggle("hidden", !isLoading);
  }

  function renderTranslateWidget() {
    const widgetRoot = document.getElementById("google_translate_element");

    if (typeof window.google?.translate?.TranslateElement !== "function") {
      console.warn("Google Translate widget is not available.");
      return;
    }

    if (!widgetRoot) {
      return;
    }

    if (widgetRoot.dataset.widgetReady === "true") {
      return;
    }

    widgetRoot.innerHTML = "";

    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );

    widgetRoot.dataset.widgetReady = "true";
  }

  function loadGoogleTranslate() {
    if (window.google?.translate?.TranslateElement) {
      renderTranslateWidget();
      return Promise.resolve();
    }

    if (window.__googleTranslateLoading) {
      return window.__googleTranslateLoading;
    }

    window.__googleTranslateLoading = new Promise((resolve, reject) => {
      window.googleTranslateElementInit = () => {
        renderTranslateWidget();
        resolve();
      };

      const script = document.createElement("script");
      script.id = "googleTranslateScript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        console.warn("Failed to load Google Translate script.");
        reject(new Error("Google Translate script failed to load"));
      };
      document.head.appendChild(script);
    });

    return window.__googleTranslateLoading;
  }

  function openTranslate() {
    translateBox.classList.remove("hidden");
    translateBox.classList.add("flex");
    setLoading(true);

    setTimeout(() => {
      overlay.classList.remove("opacity-0");
      card.classList.remove("opacity-0", "scale-90", "scale-95");
      card.classList.add("opacity-100", "scale-100");
    }, 10);

    loadGoogleTranslate()
      .catch(() => {
        // Translation may not work if the script fails to load.
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function closeTranslate() {
    overlay.classList.add("opacity-0");
    card.classList.add("opacity-0");
    if (card.classList.contains("scale-90")) {
      card.classList.add("scale-90");
    } else {
      card.classList.add("scale-95");
    }
    card.classList.remove("opacity-100", "scale-100");

    setTimeout(() => {
      translateBox.classList.add("hidden");
      translateBox.classList.remove("flex");
      setLoading(false);
    }, 300);
  }

  overlay.classList.add("opacity-0");
  card.classList.add("opacity-0", "transition", "duration-300");
  if (!card.classList.contains("scale-90") && !card.classList.contains("scale-95")) {
    card.classList.add("scale-95");
  }

  openButton.addEventListener("click", openTranslate);
  closeButton.addEventListener("click", closeTranslate);
  overlay.addEventListener("click", closeTranslate);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !translateBox.classList.contains("hidden")) {
      closeTranslate();
    }
  });
}

