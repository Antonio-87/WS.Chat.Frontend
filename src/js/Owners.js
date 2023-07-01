/**Принимет на вход список nicknames */
export default class Owners {
  #nicknames;
  #localStorsgeNicnames;
  constructor(nicknames) {
    this.#nicknames = nicknames;
    this.#localStorsgeNicnames = [localStorage.getItem("nicknames")];
    this.you = null;
  }

  setOwner() {
    this.#nicknames.forEach((name) => {
      if (this.#localStorsgeNicnames.some((el) => el === name) === true) {
        alert("nickname taken! Choose another!");
      } else {
        this.#localStorsgeNicnames.push(name);
        localStorage.setItem("nicknames", this.#localStorsgeNicnames);
        this.you = name;
      }
    });
  }
}
