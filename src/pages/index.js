/** Импорт файла стилей */
import './index.css';

/** Импорт констант */
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserCard from '../components/UserCard.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


import { 
  config, 
  initialCards,

  elementContainer,
  cardTemplateSelector,

  editProfileOpenButton,
  editAvatarOpenButton,
  addPhotoOpenButton,
  
  popupSelectors,

  userInfoSelectors,
  popupViewSelectors,
  popupProfileSelectors,
  popupAvatarSelectors
  } from '../utils/constants.js';


  /** Связь с сервером */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'f7fbd0be-598d-4bc2-8963-24bc80b8013a',
    'Content-Type': 'application/json'
    }
});

//api.getUserInfo();
/* api.getInitialCards()
.then((data) => {
  console.log(data)
});
 */



/** Валидация формы редактирования профиля */
const formValidationEditProfile = new FormValidator(config, popupSelectors.editProfile)
formValidationEditProfile.enableValidation();

/** Валидация формы редактирования аватара */
const formValidationEditAvatar = new FormValidator(config, popupSelectors.editAvatar)
formValidationEditAvatar.enableValidation();


/** Валидация формы добавления новой карточки */
const formValidationAddPhoto = new FormValidator(config, popupSelectors.addPhoto)
formValidationAddPhoto.enableValidation();


/** Инициализация обработчика профиля  */
const profileInfo = new UserInfo(userInfoSelectors);


/** Инициализация попапа просмотра полноразмерного фото */
const popupViewPhoto = new PopupWithImage(popupSelectors.viewPhoto, popupViewSelectors);
popupViewPhoto.setEventListeners();


/** Инициализация попапа редактирования профиля */
const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const userName = formData.editProfileUserName;
    const userJob = formData.editProfileUserJob;
    
    profileInfo.setUserInfo({userName, userJob});
  }
}, popupSelectors.editProfile);

popupEditProfile.setEventListeners();


/** Инициализация попапа редактирования аватара */
const popupEditAvatar = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const userAvatar = formData.editUserAvatar;
    profileInfo.setUserAvatar({userAvatar});
  }
}, popupSelectors.editAvatar);

popupEditAvatar.setEventListeners();


/** Инициализация попапа подтверждения удаления карточки */
const popupDeleteCard = new PopupWithSubmit({
  handleFormSubmit: () => {
    console.log('Delete you!');
  }
  }, popupSelectors.deleteCard);

popupDeleteCard.setEventListeners();

/** Инициализация попапа добавления новой карточки */
const popupAddCard = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const initialNewCard = new UserCard(
      formData.addPhotoLink, 
      formData.addPhotoTitle, 
      {handleCardClick: (photoLink, photoTitle) => {
        popupViewPhoto.openPopup(photoLink, photoTitle);
      },
      handleCardDelete: () => {
        popupDeleteCard.openPopup();
      }}, 
      cardTemplateSelector.userCardTemplate);
    const cardElement = initialNewCard.generateCard();
    cardList.setItem(cardElement); 
  }
},
popupSelectors.addPhoto);

popupAddCard.setEventListeners();


/** Открытие окна редактирования профиля пользователя */
editProfileOpenButton.addEventListener('click', () => {
  popupEditProfile.setInitialInputValues(profileInfo.getUserInfo(), popupProfileSelectors);
  formValidationEditProfile.resetForm();
  popupEditProfile.openPopup();
});

/** Открытие окна редактирования аватара пользователя */
editAvatarOpenButton.addEventListener('click', () => {
  formValidationEditAvatar.resetForm();
  popupEditAvatar.openPopup();
});


/** Открытие окна добавления фото */
addPhotoOpenButton.addEventListener('click', () => {
  formValidationAddPhoto.resetForm();
  popupAddCard.openPopup();
});


/** Добавление предустановленных карточек на страницу */
const cardList = new Section({
  data: () => {
    return api.getInitialCards()
  },
  renderer: (elem) => {
    const initialCard = new Card(
      elem.link, 
      elem.name, 
      {handleCardClick: (photoLink, photoTitle) => {
        popupViewPhoto.openPopup(photoLink, photoTitle);
      }}, 
      cardTemplateSelector.othersCardTemplate);
    const cardElement = initialCard.generateCard();
    cardList.setItem(cardElement);
  }
}, elementContainer);

cardList.renderItems();
