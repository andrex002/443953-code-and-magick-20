'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var makeRequestToServer = function (url, method, data) {
    var message = '';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    if (data) {
      xhr.send(data);
      message = 'Не удалось сохранить. ';
    } else {
      xhr.send();
    }

    return function (onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError(message + 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError(message + 'Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError(message + 'Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    };
  };

  var load = function (onLoad, onError) {
    var URL = 'https://javascript.pages.academy/code-and-magick/data';
    var processServerResponse = makeRequestToServer(URL, 'GET');
    processServerResponse(onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    var URL = 'https://javascript.pages.academy/code-and-magick';
    var processServerResponse = makeRequestToServer(URL, 'POST', data);
    processServerResponse(onLoad, onError);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
