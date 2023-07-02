/**
 * Entry point of app: don't change this
 */

import Controller from "./Controller";

const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller(container);
  controller.connectHandler();

  window.addEventListener("unload", controller.onUnload);
});
