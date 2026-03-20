export function initRsvpForm() {
  const form = document.querySelector("#rsvpForm");
  const message = document.querySelector("#rsvpMessage");

  if (!form || !message) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    form.classList.add("hidden");
    message.classList.remove("hidden");
    message.textContent = `Thank you ${formData.get("name")}. Your RSVP for "${formData.get("status")}" has been recorded for ${formData.get("guests")} guest(s).`;
  });
}
