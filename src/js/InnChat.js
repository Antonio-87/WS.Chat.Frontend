export default class InnChat {
  #element;
  #owners;
  #ownersList;
  #chat;
  #messages;
  constructor(element) {
    this.#element = element;
    this.owners = null;
  }

  static get markup() {
    return `
      <aside class="owners unvisible">
        <ul class="owners-list">
        </ul>
      </aside>
      <div class="chat unvisible">
          <ul class="messages">
              <li class="message you-owner">
                  <p class="owner-message you">You, <span class="time">16:08 03.07.2023</span></p><br>
                  <p class="message-text">Thenks for this chat! It is very important for me!</p>
              </li>
          </ul>
          <textarea class="input-message" placeholder="Type to message here"></textarea>
      </div>
    `;
  }

  bindToDom() {
    this.#element.insertAdjacentHTML("beforeend", InnChat.markup);

    this.#owners = document.querySelector(".owners");
    this.#ownersList = document.querySelector(".owners-list");
    this.#chat = document.querySelector(".chat");
    this.#messages = document.querySelector(".messages");
    this.input = document.querySelector("input-message");
  }

  chatVision() {
    this.#owners.classList.toggle("unvisible");
    this.#chat.classList.toggle("unvisible");
  }

  #innOwnersHtml() {
    const ownersHtml = [];
    if (!this.owners) return;
    this.owners.forEach((owner) => {
      const html = `
        <li class="owner"><div class="check"></div><span>${owner}</span></li>
      `;
      ownersHtml.push(html);
    });
    return ownersHtml.join("");
  }

  innOwners() {
    this.removeOwners();
    const htmlOwners = this.#innOwnersHtml();
    this.#ownersList.insertAdjacentHTML("afterbegin", htmlOwners);
  }

  removeOwners() {
    [...this.#ownersList.querySelectorAll(".owner")].forEach((owner) => {
      owner.remove();
    });
  }

  addYou(nicknameYou) {
    if (this.owners) {
      [...this.#ownersList.querySelectorAll(".owner")]
        .filter((owner) => owner.textContent === nicknameYou)
        .forEach((owner) => {
          owner.classList.add("you");
          owner.querySelector("span").textContent = "You";
        });
    }
  }
}
