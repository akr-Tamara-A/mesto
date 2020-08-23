import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._cardId = '';
  }

  /** Навешивание слушателя отправления формы */
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit();
      this.closePopup();
    });
  }

  getCardID(cardId) {
    this._cardId = cardId;
  }

  setCardId() {
    return this._cardId;
  }
}