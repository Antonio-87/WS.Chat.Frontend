/**
 * Entry point of app: don't change this
 */

import InnFormWidget from "./InnFormWidget";
import ArrayBufferConverter from "./ArrayBufferConverter";
// import Owners from "./Owners";

const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  const formWidget = new InnFormWidget(container);
  formWidget.bindToDom();
  const ws = new WebSocket("ws://localhost:7070/ws");
  formWidget.ws = ws;

  ws.addEventListener("open", (e) => {
    console.log(e);

    console.log("ws open");
  });

  ws.addEventListener("close", (e) => {
    console.log(e);

    console.log("ws close");
  });

  ws.addEventListener("error", (e) => {
    console.log(e);

    console.log("ws error");
  });

  ws.addEventListener("message", (e) => {
    console.log(e);

    const data = JSON.parse(e.data);
    console.log(data);
    const stringNicknames = [];
    if (data.nicknames) {
      const { nicknames } = data;
      nicknames.forEach((nickname) => {
        const name = new ArrayBufferConverter(nickname.data);
        stringNicknames.push(name.toString());
        // console.log(name.toString());
      });
      // const owner = new Owners(stringNicknames);
      // owner.setOwner();
      console.log(stringNicknames);
      formWidget.nicknames = stringNicknames;
    }

    if (data.chat) {
      const { chat: massages } = data;

      massages.forEach((massage) => {
        console.log(massage);
      });
    }

    console.log("ws message");
  });

  window.addEventListener("unload", () => {
    ws.send({
      nickname: formWidget.you,
      status: false,
    });
  });
});
