'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.setup.querySelector('.setup-close');
  var setupUserName = window.util.setup.querySelector('.setup-user-name');
  var dialogHandle = window.util.setup.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && !setupUserName.matches(':focus')) {
      closePopup();
    }
  };
  var openPopup = function () {
    window.util.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.util.setup.classList.add('hidden');
    window.util.setup.style.top = '';
    window.util.setup.style.left = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        if (shift.y !== 0 || shift.x !== 0) {
          dragged = true;

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          window.util.setup.style.top = (window.util.setup.offsetTop - shift.y) + 'px';
          window.util.setup.style.left = (window.util.setup.offsetLeft - shift.x) + 'px';
        }
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            dialogHandle.removeEventListener('click', onClickPreventDefault);
          };
          dialogHandle.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
