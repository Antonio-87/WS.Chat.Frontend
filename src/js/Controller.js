import InnFormWidget from "./InnFormWidget";
import InnChat from "./InnChat";

export default class Controller {
  #element;
  #innFormWidget;
  #ws;
  #innChat;
  #you;
  #nicknames;
  constructor(element) {
    this.#element = element;
    this.#you = null;
    this.#nicknames;
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
        this.#nicknames = nicknames;
        this.#innChat.owners = nicknames;
        this.#innChat.innOwners();
      }

      if (data.chat) {
        this.#innChat.messages = data.chat;
        this.#innChat.innMessages();
      }

      console.log("ws message");
    });

    this.#innFormWidget.form.addEventListener("click", this.onClickForm);
    this.#innChat.input.addEventListener("keydown", this.onKeydownChat);
  }

  onUnload = () => {
    this.#ws.send(
      JSON.stringify({
        nickname: this.#you,
        status: false,
      })
    );
  };

  onClickForm = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target == this.#innFormWidget.button) {
      const value = this.#innFormWidget.input.value.trim();
      const nickname = this.#innFormWidget.validNickname(value);
      if (nickname && this.#nicknames.includes(nickname) === true)
        alert("nickname taken! Choose another!");
      if (nickname && this.#nicknames.includes(nickname) === false) {
        this.#ws.send(JSON.stringify({ nickname: nickname }));
        this.#innFormWidget.formVision();
        this.#innChat.chatVision();
        this.#you = nickname;
        this.#innChat.you = nickname;
      } else {
        this.#innFormWidget.validate.classList.remove("unvisible");
      }
    }
    this.#innFormWidget.input.value = "";
  };

  onKeydownChat = (e) => {
    const target = e.target;

    if (e.keyCode === 13) {
      if (e.ctrlKey) {
        if (target.value === "") return;
        e.preventDefault();
        const start = target.selectionStart;
        const end = target.selectionEnd;
        target.value =
          target.value.substring(0, start) + "\n" + target.value.substring(end);
        target.selectionStart = target.selectionEnd = start + 1;
      } else {
        e.preventDefault();
        const value = target.value;
        this.#ws.send(
          JSON.stringify({
            nickname: this.#you,
            message: encodeURIComponent(value),
          })
        );
      }
      target.value = "";
    }
  };
}
