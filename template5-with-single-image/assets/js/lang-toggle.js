export function initLangToggle() {
  const translateBox = document.getElementById("translateBox");
  const overlay = document.getElementById("overlay");
  const card = document.getElementById("popupCard");
  const translateLoading = document.getElementById("translateLoading");

  function setLoading(isLoading) {
    if (!translateLoading) return;
    translateLoading.classList.toggle("hidden", !isLoading);
  }

  function renderTranslateWidget() {
    if (typeof window.google?.translate?.TranslateElement !== "function") {
      console.warn("Google Translate widget is not available.");
      return;
    }

    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  }

  function loadGoogleTranslate() {
    if (window.google?.translate?.TranslateElement) {
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
    setLoading(true);

    setTimeout(() => {
      overlay.classList.remove("opacity-0");
      card.classList.remove("opacity-0", "scale-90");
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
    card.classList.add("opacity-0", "scale-90");

    setTimeout(() => {
      translateBox.classList.add("hidden");
      setLoading(false);
    }, 300);
  }

  document.getElementById("open-translate").addEventListener("click", openTranslate);
  document.getElementById("close-translate").addEventListener("click", closeTranslate);
  document.getElementById("overlay").addEventListener("click", closeTranslate);
}

