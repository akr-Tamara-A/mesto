/** Импорт файла стилей */
import './index.css';

/** Импорт констант */
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

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
    console.log(formData)
    profileInfo.setUserAvatar({userAvatar});
  }
}, popupSelectors.editAvatar);

popupEditAvatar.setEventListeners();


/** Инициализация попапа добавления новой карточки */
const popupAddCard = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const initialNewCard = new Card(
      formData.addPhotoLink, 
      formData.addPhotoTitle, 
      {handleCardClick: (photoLink, photoTitle) => {
        popupViewPhoto.openPopup(photoLink, photoTitle);
      }}, 
      cardTemplateSelector);
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
  data: initialCards,
  renderer: (elem) => {
    const initialCard = new Card(
      elem.link, 
      elem.name, 
      {handleCardClick: (photoLink, photoTitle) => {
        popupViewPhoto.openPopup(photoLink, photoTitle);
      }}, 
      cardTemplateSelector);
    const cardElement = initialCard.generateCard();
    cardList.setItem(cardElement);
  }
}, elementContainer);

cardList.renderItems();
