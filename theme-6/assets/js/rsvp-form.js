export function initRsvpForm() {
  const form = document.querySelector("#rsvpForm");
  const message = document.querySelector("#rsvpMessage");

  if (!form || !message) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const selectedEvents = formData.getAll("event[]");
    const eventSummary = selectedEvents.length ? selectedEvents.join(", ") : "No events selected";

    form.classList.add("hidden");
    message.classList.remove("hidden");
    message.textContent = `Thank you ${formData.get("name")}. Your RSVP for ${formData.get("guests")} guest(s) has been recorded for: ${eventSummary}.`;
  });
}
