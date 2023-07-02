import InnFormWidget from "./InnFormWidget";

export default class Controller {
  #element;
  #innFormWidget;
  #ws;
  constructor(element) {
    this.#element = element;
    this.#innFormWidget = new InnFormWidget(this.#element);
    this.#innFormWidget.bindToDom();
    this.#ws = new WebSocket("ws://localhost:7070/ws");
    this.#innFormWidget.ws = this.#ws;
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
      }

      if (data.chat) {
        const { chat: massages } = data;

        massages.forEach((massage) => {
          console.log(massage);
        });
      }

      console.log("ws message");
    });
  }

  onUnload = () => {
    this.#ws.send(
      JSON.stringify({
        nickname: this.#innFormWidget.you,
        status: false,
      })
    );
  };
}
