import { openViewPhotoPopup } from './utils.js';


// Создание карточки
export class Card {
  constructor(image, title, cardTemplateSelector) {
    this._image = image;
    this._title = title;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  // Получение шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Создание карточки
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.element__image').src = this._image;
    this._card.querySelector('.element__image').alt = this._title;
    this._card.querySelector('.element__title').textContent = this._title;

    return this._card;
  }

   // Обработка кнопки like 
  _handlePhotoLike() {
    this._card.querySelector('.element__like').classList.toggle('button_type_like');
  }

  // Удаление карточки
  _handleCardDelete() {
   this._card.remove();
   this._card = null;
 }

  // Открытие окна просмотра полноразмерного фото
  _handleOpenPopup() {
    openViewPhotoPopup(this._image, this._title)
  }

  // Установка слушателей карточки
  _setEventListeners() {    
    this._card.querySelector('.element__like').addEventListener('click', () => {
      this._handlePhotoLike();
    });

    this._card.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete();
    });
      
    this._card.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
};