import Popup from './Popup.js';
import { initialCards } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._initData = {};
  }
  
  /** Получение значений инпутов формы */
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  /** Навешивание слушателя отправления формы */
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._submitButton);
      //this.closePopup();
    });
  }

  /** Перезаписывание родительского метода закрытия попапа */
  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  /** Установка изначальных значений инпутов формы */
  setInitialInputValues(initialData, selectors) {
    this._form.querySelector(selectors.userName).value = initialData.name;
    this._form.querySelector(selectors.userJob).value = initialData.about;
  }
}