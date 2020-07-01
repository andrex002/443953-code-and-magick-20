'use strict';

(function () {
  var load = window.backend.load;
  var save = window.backend.save;
  var closePopup = window.dialog.closePopup;

  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var form = document.querySelector('.setup-wizard-form');
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

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var nameWizardBlock = wizardElement.querySelector('.setup-similar-label');
    var coatWizardBlock = wizardElement.querySelector('.wizard-coat');
    var eyesWizardBlock = wizardElement.querySelector('.wizard-eyes');

    nameWizardBlock.textContent = wizard.name;
    coatWizardBlock.style.fill = wizard.colorCoat;
    eyesWizardBlock.style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderBlockWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      var randomWizard = getRandomData(wizards);
      fragment.appendChild(renderWizard(randomWizard));
    }
    similarListElement.appendChild(fragment);
  };

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
    renderBlockWizards(response);
  };

  form.addEventListener('submit', function (evt) {
    save(new FormData(form), onSaveSuccess, onError);
    evt.preventDefault();
  });

  load(onLoadSuccess, onError);

  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');

  window.colorize(wizardCoatElement, wizardCoatColorInput, window.util.COAT_COLORS);
  window.colorize(wizardEyesElement, wizardEyesColorInput, window.util.EYES_COLORS);
  window.colorize(fireballWizardElement, fireballWizardInput, window.util.FIREBALL_COLORS);
})();
