const createRequest = (url, options = {}, callback = null) => {
  fetch(url, options).then((response) => {
    if (response.ok) {
      response.text().then((text) => {
        if (callback) callback(JSON.parse(text));
      });
    } else {
      alert("Ошибка в HTTP:" + response.status + "\n" + response.statusText);
    }
  });
};

export default createRequest;
