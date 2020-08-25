import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._cardId = '';
    this._card = '';
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

  /** Получения ID и карточки */
  getCardID(cardId, card) {
    this._cardId = cardId;
    this._card = card;
  }

  /**  */
  setCardId() {
    return {id: this._cardId, card: this._card};
  }
}