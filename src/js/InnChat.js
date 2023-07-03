export default class InnChat {
  #element;
  constructor(element) {
    this.#element = element;
  }

  markup() {
    return `
      <aside class="owners">
        <ul class="owners-list">
            <li class="owner you"><div class="check"></div>You</li>
            <li class="owner"><div class="check"></div>Sara</li>
            <li class="owner"><div class="check"></div>Mira</li>
            <li class="owner"><div class="check"></div>Jon</li>
        </ul>
      </aside>
      <div class="chat">
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
}
