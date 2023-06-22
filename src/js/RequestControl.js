import createRequest from "./createRequest";

export default class RequestControl {
  static HOST = "http://localhost:8080";

  /**
   * создание задачи (объектов Task и TaskFull)
   */
  static createTask(name, description, status = false) {
    const task = {
      name: name,
      description: description,
      status: status,
    };
    try {
      createRequest(`${this.HOST}/createTask/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(task),
      });
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }

  /**
   * получение всех задач (массив объектов Task)
   */
  static getAllTasks(callback) {
    try {
      createRequest(
        `${this.HOST}/allTasks/`,
        {
          method: "GET",
        },
        callback
      );
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }

  /**
   * получение задачи по id
   */
  static getTask(id, callback) {
    try {
      createRequest(
        `${this.HOST}/tasks/${id}`,
        {
          method: "GET",
        },
        callback
      );
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }

  /**
   * обновление задачи (объектов Task и TaskFull)
   */
  static updateTask(id, name = null, description = null, status = null) {
    const task = {
      name: name,
      description: description,
      status: status,
    };
    try {
      createRequest(`${this.HOST}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(task),
      });
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }

  /**
   * Метод удаления задачи
   */
  static deleteTask(id) {
    try {
      createRequest(`${this.HOST}/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      alert("Ошибка" + e.name + ":" + e.message);
    }
  }
}
