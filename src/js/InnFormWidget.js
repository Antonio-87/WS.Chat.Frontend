export default class InnFormWidget {
  #element;
  constructor(element) {
    this.#element = element;
    this.ws = null;
    this.nicknames = null;
  }

  static get murkup() {
    return `
        <form name="nickname">
            <p class="title">Выберите псевдоним</p>
            <input type="text" class="input-nickname unvisisible" name="input-nickname" minlength="6" maxlength="30" placeholder="Введите псевдоним (Например: Alexandra-38)" required>
            <p class="validate">
              - состоит из букв латинского алфавита, символов, цифр
              - начинается с заглавной буквы
              - заканчивается цифрой
              - длинна 6-30 символов
            </p>
            <div class="button">Продолжить</div>
        </form>
        `;
  }

  bindToDom() {
    this.#element.insertAdjacentHTML("afterbegin", InnFormWidget.murkup);

    this.form = document.forms.nickname;
    this.input = this.form.elements["input-nickname"];
    this.button = document.querySelector(".button");
    this.validate = document.querySelector(".validate");

    this.form.addEventListener("click", this.onClick);
    this.input.addEventListener("focus", this.onFocus);
  }

  #validNickname(value) {
    const result = /^([A-Z]).+(\d)$/gm.test(value);
    return result && value;
  }

  onClick = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target == this.button) {
      const nickname = this.#validNickname(this.input.value).trim();
      if (nickname && this.nicknames.includes(nickname) === true)
        alert("nickname taken! Choose another!");
      if (nickname && this.nicknames.includes(nickname) === false) {
        this.ws.send(nickname);
        this.formVision();
      } else {
        this.validate.classList.remove("unvisible");
      }
    }
    this.input.value = "";
  };

  onFocus = () => {
    this.validate.classList.add("unvisible");
  };

  formVision() {
    this.form.classList.toggle("unvisible");
  }
}
