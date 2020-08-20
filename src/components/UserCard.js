import Card from './Card.js'

export default class UserCard extends Card {
  constructor(image, title, {handleCardClick, handleCardDelete}, cardTemplateSelector) {
    super(image, title, {handleCardClick}, cardTemplateSelector);
    this._handleCardDelete = handleCardDelete;
  }

  /**Установка слушателей карточки */
  _setEventListeners() {
    super._setEventListeners();

    this._card.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });
  }

  /** Удаление карточки */
  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _handleDeleteClick() {
    this._handleCardDelete();
  }
}