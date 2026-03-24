export function initCountdown() {
  const countdown = document.querySelector(".countdown");

  if (!countdown) {
    return;
  }

  const updateCountdown = () => {
    const targetDate = new Date(countdown.dataset.date).getTime();
    const now = Date.now();
    const distance = Math.max(0, targetDate - now);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdown.querySelector('[data-unit="days"]').textContent = String(days).padStart(2, "0");
    countdown.querySelector('[data-unit="hours"]').textContent = String(hours).padStart(2, "0");
    countdown.querySelector('[data-unit="minutes"]').textContent = String(minutes).padStart(2, "0");
    countdown.querySelector('[data-unit="seconds"]').textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}
