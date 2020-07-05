'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

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
      similarListElement.innerHTML = '';
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.renderWizards = {
    renderBlockWizards: renderBlockWizards,
    similarListElement: similarListElement
  };
})();
