'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomData = function (arr) {
  var randomIndex = Math.round(Math.random() * (arr.length - 1));
  var randomData = arr[randomIndex];
  return randomData;
};

var creatingArrayWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards[i] = {
      name: getRandomData(names) + ' ' + getRandomData(surnames),
      coatColor: getRandomData(coatColors),
      eyesColor: getRandomData(eyesColors)
    };
  }
  return wizards;
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

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

renderBlockWizards(creatingArrayWizards(4));

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && !setupUserName.matches(':focus')) {
    evt.preventDefault();
    closePopup();
  }
};
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});
setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var setupWizardImage = document.querySelector('.setup-wizard-appearance');
var wizardCoatElement = setupWizardImage.querySelector('.wizard-coat');
var wizardCoatColorInput = setupWizardImage.querySelector('input[name="coat-color"]');
var wizardEyesElement = setupWizardImage.querySelector('.wizard-eyes');
var wizardEyesColorInput = setupWizardImage.querySelector('input[name="eyes-color"]');
var fireballWizardElement = document.querySelector('.setup-fireball-wrap');
var fireballWizardInput = fireballWizardElement.querySelector('input[name="fireball-color"]');

var getColor = function (colors, currentColor) {
  var currentColorIndex = colors.indexOf(currentColor);
  if (currentColorIndex === colors.length - 1) {
    currentColorIndex = 0;
  } else {
    currentColorIndex++;
  }
  return colors[currentColorIndex];
};

var onWizardCoatClick = function () {
  wizardCoatElement.style.fill = getColor(coatColors, wizardCoatColorInput.value);
  wizardCoatColorInput.value = wizardCoatElement.style.fill;
};

var onWizardEyesClick = function () {
  wizardEyesElement.style.fill = getColor(eyesColors, wizardEyesColorInput.value);
  wizardEyesColorInput.value = wizardEyesElement.style.fill;
};

var onFireballWizardClick = function () {
  fireballWizardElement.setAttribute('style', 'background:' + getColor(fireballColors, fireballWizardInput.value));
  fireballWizardInput.setAttribute('value', getColor(fireballColors, fireballWizardInput.value));
};
wizardCoatElement.addEventListener('click', onWizardCoatClick);
wizardEyesElement.addEventListener('click', onWizardEyesClick);
fireballWizardElement.addEventListener('click', onFireballWizardClick);
