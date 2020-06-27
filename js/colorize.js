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

  window.colorize = function (element, input, colors) {
    element.addEventListener('click', function () {
      var color = getColor(colors, input.value);
      if (element.tagName.toLowerCase() === 'div') {
        element.setAttribute('style', 'background:' + color);
        input.setAttribute('value', color);
      } else {
        element.style.fill = color;
        input.value = color;
      }
    });
  };
})();
