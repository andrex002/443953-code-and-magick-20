'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
  var setupWizardImage = document.querySelector('.setup-wizard-appearance');
  var wizardCoatElement = setupWizardImage.querySelector('.wizard-coat');
  var wizardCoatColorInput = setupWizardImage.querySelector('input[name="coat-color"]');
  var wizardEyesElement = setupWizardImage.querySelector('.wizard-eyes');
  var wizardEyesColorInput = setupWizardImage.querySelector('input[name="eyes-color"]');
  var fireballWizardElement = document.querySelector('.setup-fireball-wrap');
  var fireballWizardInput = fireballWizardElement.querySelector('input[name="fireball-color"]');

  var getRandomData = function (arr) {
    var randomIndex = Math.round(Math.random() * (arr.length - 1));
    var randomData = arr[randomIndex];
    return randomData;
  };

  var creatingArrayWizards = function (count) {
    var wizards = [];
    for (var i = 0; i < count; i++) {
      wizards[i] = {
        name: getRandomData(NAMES) + ' ' + getRandomData(SURNAMES),
        coatColor: getRandomData(window.util.COAT_COLORS),
        eyesColor: getRandomData(window.util.EYES_COLORS)
      };
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var nameWizardBlock = wizardElement.querySelector('.setup-similar-label');
    var coatWizardBlock = wizardElement.querySelector('.wizard-coat');
    var eyesWizardBlock = wizardElement.querySelector('.wizard-eyes');

    nameWizardBlock.textContent = wizard.name;
    coatWizardBlock.style.fill = wizard.coatColor;
    eyesWizardBlock.style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderBlockWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.util.setup.classList.remove('hidden');
  renderBlockWizards(creatingArrayWizards(4));
  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');

  window.colorize(wizardCoatElement, wizardCoatColorInput, window.util.COAT_COLORS);
  window.colorize(wizardEyesElement, wizardEyesColorInput, window.util.EYES_COLORS);
  window.colorize(fireballWizardElement, fireballWizardInput, window.util.FIREBALL_COLORS);
})();
