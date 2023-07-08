export default class InnChat {
  #element;
  #owners;
  #ownersList;
  #chat;
  #messages;
  constructor(element) {
    this.#element = element;
    this.owners = null;
    this.messages = null;
    this.you = null;
  }

  static get markup() {
    return `
      <aside class="owners unvisible">
        <ul class="owners-list">
        </ul>
      </aside>
      <div class="chat unvisible">
          <ul class="messages">
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
    this.input = document.querySelector(".input-message");
  }

  chatVision() {
    this.#owners.classList.toggle("unvisible");
    this.#chat.classList.toggle("unvisible");
  }

  #innOwnersHtml() {
    const ownersHtml = [];
    if (!this.owners) return;
    this.owners.forEach((owner) => {
      const classOwner = owner === this.you ? "owner you" : "owner";
      const textOwner = owner === this.you ? "You" : owner;
      const html = `
        <li class="${classOwner}"><div class="check"></div><span>${textOwner}</span></li>
      `;
      ownersHtml.push(html);
    });
    return ownersHtml.join("");
  }

  innOwners() {
    this.#removeOwners();
    const htmlOwners = this.#innOwnersHtml();
    this.#ownersList.insertAdjacentHTML("afterbegin", htmlOwners);
  }

  #removeOwners() {
    [...this.#ownersList.querySelectorAll(".owner")].forEach((owner) => {
      owner.remove();
    });
  }

  #innMessagesHtml() {
    const ownersHtml = [];
    if (!this.messages) return;
    this.messages.forEach((message) => {
      const classOwnerLi =
        message.nickname === this.you ? "message you-owner" : "message";
      const classOwnerP =
        message.nickname === this.you ? "owner-message you" : "owner-message";
      const textOwner =
        message.nickname === this.you ? "You" : message.nickname;
      const messageStr = decodeURIComponent(message.message);
      const html = `
        <li class="${classOwnerLi}">
          <p class="${classOwnerP}">${textOwner}, <span class="time">${message.time}</span></p><br>
          <p class="message-text">${messageStr}</p>
        </li>
      `;
      ownersHtml.push(html);
    });
    return ownersHtml.join("");
  }

  innMessages() {
    this.#removeMessages();
    const messagesHtml = this.#innMessagesHtml();
    this.#messages.insertAdjacentHTML("afterbegin", messagesHtml);
  }

  #removeMessages() {
    [...this.#messages.querySelectorAll(".message")].forEach((message) => {
      message.remove();
    });
  }
}
