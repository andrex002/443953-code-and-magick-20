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

var getRandomData = function (arr) {
  var randomData;
  var randomIndex;
  randomIndex = Math.round(Math.random() * arr.length);
  randomData = arr[randomIndex];
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
