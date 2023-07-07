import InnFormWidget from "./InnFormWidget";
import InnChat from "./InnChat";

export default class Controller {
  #element;
  #innFormWidget;
  #ws;
  #innChat;
  constructor(element) {
    this.#element = element;
    this.#innFormWidget = new InnFormWidget(this.#element);
    this.#innFormWidget.bindToDom();
    this.#ws = new WebSocket("ws://localhost:7070/ws");
    this.#innFormWidget.ws = this.#ws;
    this.#innChat = new InnChat(this.#element);
    this.#innChat.bindToDom();
  }

  connectHandler() {
    this.#ws.addEventListener("open", (e) => {
      console.log(e);

      console.log("ws open");
    });

    this.#ws.addEventListener("close", (e) => {
      console.log(e);

      console.log("ws close");
    });

    this.#ws.addEventListener("error", (e) => {
      console.log(e);

      console.log("ws error");
    });

    this.#ws.addEventListener("message", (e) => {
      console.log(e);

      const data = JSON.parse(e.data);
      console.log(data);
      if (data.nicknames) {
        const { nicknames } = data;
        this.#innFormWidget.nicknames = nicknames;
        this.#innChat.owners = nicknames;
        this.#innChat.innOwners();
        this.#innChat.addYou(this.#innFormWidget.you);
      }

      if (data.chat) {
        const { chat: massages } = data;

        massages.forEach((massage) => {
          console.log(massage);
        });
      }

      console.log("ws message");
    });

    this.#innFormWidget.form.addEventListener("click", this.onClickForm);
    this.#innChat.input.addEventListener("submit", this.onSubmitChat);
  }

  onUnload = () => {
    this.#ws.send(
      JSON.stringify({
        nickname: this.#innFormWidget.you,
        status: false,
      })
    );
  };

  onClickForm = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target == this.#innFormWidget.button) {
      const nickname = this.#innFormWidget
        .validNickname(this.#innFormWidget.input.value)
        .trim();
      if (nickname && this.#innFormWidget.nicknames.includes(nickname) === true)
        alert("nickname taken! Choose another!");
      if (
        nickname &&
        this.#innFormWidget.nicknames.includes(nickname) === false
      ) {
        this.#ws.send(JSON.stringify({ nickname: nickname }));
        this.#innFormWidget.formVision();
        this.#innChat.chatVision();
        this.#innFormWidget.you = nickname;
      } else {
        this.#innFormWidget.validate.classList.remove("unvisible");
      }
    }
    this.#innFormWidget.input.value = "";
  };

  onSubmitChat = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.value === "") return;
  };
}
