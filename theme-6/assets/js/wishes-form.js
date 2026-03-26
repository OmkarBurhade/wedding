const initialWishes = [
  {
    name: "Nilesh",
    address: "Jakarta",
    comment: "Congratulations on starting a new life together. May you always support each other and be filled with happiness."
  },

  {
    name: "Aditya",
    address: "Bandung",
    comment: "Happy wedding to both of you. May everything go smoothly until the wedding day and may you always stay happy."
  },

  {
    name: "Aditya",
    address: "Bandung",
    comment: "Happy wedding to both of you. May everything go smoothly until the wedding day and may you always stay happy."
  },

    {
    name: "Aditya",
    address: "Bandung",
    comment: "Happy wedding to both of you. May everything go smoothly until the wedding day and may you always stay happy."
  },


    {
    name: "Aditya",
    address: "Bandung",
    comment: "Happy wedding to both of you. May everything go smoothly until the wedding day and may you always stay happy."
  }

];

export function initWishesForm() {
  const form = document.querySelector("#wishesForm");
  const wrapper = document.querySelector("#wishesList");

  if (!form || !wrapper) {
    return;
  }

  const renderWish = ({ name, address, comment }, prepend = false) => {
    const card = document.createElement("article");
    const badgeLabel = address || "Blessings";
    const badgeClass = prepend
      ? "bg-[#f4ece5] text-[#b5835a]"
      : "bg-[#e9f3fa] text-action";

    card.className = "rounded-[24px] border border-white/80 bg-white/90 p-5 text-ink shadow-[0_18px_40px_rgba(24,52,107,0.08)]";
    card.innerHTML = `
      <div class="flex items-center justify-between gap-3">
        <strong class="text-base font-semibold text-ink">${name}</strong>
        <span class="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${badgeClass}">${badgeLabel}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-ink/75">${comment}</p>
    `;

    if (prepend && wrapper.firstChild) {
      wrapper.insertBefore(card, wrapper.firstChild);
      return;
    }

    wrapper.appendChild(card);
  };

  wrapper.innerHTML = "";
  initialWishes.forEach((wish) => renderWish(wish));

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameField = document.querySelector("#wishesName");
    const messageField = document.querySelector("#wishesText");

    if (!nameField || !messageField) {
      return;
    }

    const name = nameField.value.trim();
    const comment = messageField.value.trim();

    if (!name || comment.length < 20) {
      return;
    }

    renderWish(
      {
        name,
        address: "New Wish",
        comment
      },
      true
    );

    form.reset();
  });
}
