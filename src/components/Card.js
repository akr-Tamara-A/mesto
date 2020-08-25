
export default class Card {
  constructor(data, userID, {handleCardClick,handleCardLike, handleCardDelete}, cardTemplateSelector) {
    this._image = data.link;
    this._title = data.name;
    this._id = data._id;
    this._ownerID = data.owner._id;
    this._likes = data.likes;
    this._userID = userID;

    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;

    this._cardTemplateSelector = cardTemplateSelector;
  }

  /** Получение шаблона карточки */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  /** Создание карточки */
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.setAttribute('id', this._id);

    this._elementImage = this._card.querySelector('.element__image');
    this._elementTitle = this._card.querySelector('.element__title');
    this._elementDelete = this._card.querySelector('.element__delete');
    this._elementLike = this._card.querySelector('.element__like-button');
    this._elementCounter = this._card.querySelector('.element__like-counter');

    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;
    this._elementCounter.textContent = this._likes.length;
    
    if (this._checkIsLiked()) {
      this._elementLike.classList.add('button_type_like');
    }

    if (this._isOwner()) {
      this._elementDelete.classList.remove('element__delete_hidden');
    }
    return this._card;
  }

  /** Обработка клика кнопки like с проверкой состояния кнопки */
  _handleLikeClick(id) {
    if (this._checkIsLiked()) {
      this._handleCardLike(id, true);
    } else {
      this._handleCardLike(id, false);
    }
  }

  /**Обработка кнопки like */
  handlePhotoLike() {
    this._elementLike = this._card.querySelector('.element__like-button');
    this._elementLike.classList.toggle('button_type_like');
  }

  /** Открытие окна просмотра полноразмерного фото */
  _handleOpenPopup() {
    this._handleCardClick(this._image, this._title);
  }

  /**Установка слушателей карточки */
  _setEventListeners() {    
    this._card.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    this._card.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete(this._id, this._card);
    }); 
      
    this._card.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }

  /** Проверка если воздатель карточки - этот пользователь */
  _isOwner() {
    return this._userID === this._ownerID;
  }

  /** Проверка лайкнута ли карточка */
  _checkIsLiked() {
    return this._likes.some((user) => {
      if (user._id === this._userID) {
        return true;
      }
    })
  }

  /** Получение количества лайков */
  setLikes(data) {
    this._elementCounter.textContent = data;
  }
};