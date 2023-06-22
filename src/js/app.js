/**
 * Entry point of app: don't change this
 */

import InnFormWidget from "./InnFormWidget";

const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  const formWidget = new InnFormWidget(container);
  formWidget.bindToDom();
});
