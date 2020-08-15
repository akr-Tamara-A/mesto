import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }
  
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setInitialInputValues(initialData, selectors) {
    this._form.querySelector(selectors.userName).value = initialData.userName;
    this._form.querySelector(selectors.userJob).value = initialData.userJob;
    
  }
}