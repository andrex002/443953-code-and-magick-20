'use strict';

(function () {
  var getColor = function (colors, currentColor) {
    var currentColorIndex = colors.indexOf(currentColor);
    if (currentColorIndex === colors.length - 1) {
      currentColorIndex = 0;
    } else {
      currentColorIndex++;
    }
    return colors[currentColorIndex];
  };

  var setColor = function (element, input, color) {
    if (element.tagName.toLowerCase() === 'div') {
      element.setAttribute('style', 'background:' + color);
      input.setAttribute('value', color);
    } else {
      element.style.fill = color;
      input.value = color;
    }
  };

  window.colorize = {
    getColor: getColor,
    setColor: setColor
  };
})();
