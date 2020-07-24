
import { openPopup } from './index.js';


// Создание карточки
export class Card {
  constructor(image, title) {
    this._image = image;
    this._title = title;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#elementTemplate')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

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
  }

  // Открытие окна просмотра полноразмерного фото
  _handleOpenPopup() {
    
     document.querySelector('#popupViewPhoto').querySelector('.popup__photo').src = this._image;
     document.querySelector('#popupViewPhoto').querySelector('.popup__photo').alt = this._title;
     document.querySelector('#popupViewPhoto').querySelector('.popup__photo-title').textContent = this._title;
    
     openPopup(document.querySelector('#popupViewPhoto'));
  }

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