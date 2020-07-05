'use strict';

(function () {
  var load = window.backend.load;
  var save = window.backend.save;
  var closePopup = window.dialog.closePopup;
  var renderBlockWizards = window.renderWizards.renderBlockWizards;
  var getColor = window.colorize.getColor;
  var setColor = window.colorize.setColor;
  var similarListElement = window.renderWizards.similarListElement;

  var form = document.querySelector('.setup-wizard-form');
  var setupWizardImage = document.querySelector('.setup-wizard-appearance');
  var wizardCoatElement = setupWizardImage.querySelector('.wizard-coat');
  var wizardCoatColorInput = setupWizardImage.querySelector('input[name="coat-color"]');
  var wizardEyesElement = setupWizardImage.querySelector('.wizard-eyes');
  var wizardEyesColorInput = setupWizardImage.querySelector('input[name="eyes-color"]');
  var fireballWizardElement = document.querySelector('.setup-fireball-wrap');
  var fireballWizardInput = fireballWizardElement.querySelector('input[name="fireball-color"]');
  var wizards = [];
  var coatColor = wizardCoatElement.style.fill;
  var eyesColor = wizardEyesElement.style.fill;

  var onError = function (errorMessage) {
    var element = document.createElement('p');
    element.style = 'z-index: 100; text-align: center; margin: 0 auto; padding: 20px; color: white; background: red';
    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.fontSize = '20px';
    element.textContent = errorMessage;

    similarListElement.insertAdjacentElement('afterbegin', element);
  };

  var onSaveSuccess = function () {
    closePopup();
  };

  var onLoadSuccess = function (response) {
    wizards = response;
    updateWizards();
  };

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderBlockWizards(wizards.sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);
      if (rankDiff === 0) {
        rankDiff = namesComparator(a.name, b.name);
      }
      return rankDiff;
    }));
  };

  wizardCoatElement.addEventListener('click', function () {
    var color = getColor(window.util.COAT_COLORS, wizardCoatColorInput.value);
    setColor(wizardCoatElement, wizardCoatColorInput, color);
    coatColor = color;
    window.debounce(updateWizards);
  });

  wizardEyesElement.addEventListener('click', function () {
    var color = getColor(window.util.EYES_COLORS, wizardEyesColorInput.value);
    setColor(wizardEyesElement, wizardEyesColorInput, color);
    eyesColor = color;
    window.debounce(updateWizards);
  });

  fireballWizardElement.addEventListener('click', function () {
    var color = getColor(window.util.FIREBALL_COLORS, fireballWizardInput.value);
    setColor(fireballWizardElement, fireballWizardInput, color);
  });

  form.addEventListener('submit', function (evt) {
    save(new FormData(form), onSaveSuccess, onError);
    evt.preventDefault();
  });

  load(onLoadSuccess, onError);

  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');
})();
