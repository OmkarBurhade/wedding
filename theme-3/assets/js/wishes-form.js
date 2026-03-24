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
  const form = document.querySelector("#wishForm");
  const wrapper = document.querySelector("#wishes_wrapper");

  if (!form || !wrapper) {
    return;
  }

  const renderWish = ({ name, address, comment }, prepend = false) => {
    const card = document.createElement("article");
    card.className = "wish-card";
    card.innerHTML = `<strong>${name}</strong><span>${address || "Guest"}</span><p>${comment}</p>`;

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

    const formData = new FormData(form);
    renderWish(
      {
        name: formData.get("name"),
        address: formData.get("address"),
        comment: formData.get("comment")
      },
      true
    );

    form.reset();
  });
}
