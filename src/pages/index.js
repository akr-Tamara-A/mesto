import './index.css';


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
  addPhotoOpenButton,
  
  viewPhotoPopupSelector,
  editProfilePopupSelector,
  addPhotoPopupSelector,

  userInfoSelectors,
  popupViewSelectors,
  popupProfileSelectors
  } from '../utils/constants.js';


// Валидация формы редактирования профиля
const formValidationEditProfile = new FormValidator(config, editProfilePopupSelector)
formValidationEditProfile.enableValidation();


// Валидация формы добавления новой карточки
const formValidationAddPhoto = new FormValidator(config, addPhotoPopupSelector)
formValidationAddPhoto.enableValidation();


// Инициализация обработчика профиля 
const profileInfo = new UserInfo(userInfoSelectors);


// Инициализация попапа просмотра полноразмерного фото
const popupViewPhoto = new PopupWithImage(viewPhotoPopupSelector, popupViewSelectors);
popupViewPhoto.setEventListeners();


// Инициализация попапа редактирования профиля
const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const userName = formData.editProfileUserName;
    const userJob = formData.editProfileUserJob;
    
    profileInfo.setUserInfo({userName, userJob});
  }
}, editProfilePopupSelector);

popupEditProfile.setEventListeners();


// Инициализация попапа добавления новой карточки
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
  addPhotoPopupSelector);

popupAddCard.setEventListeners();


// Открытие окна редактирования профиля пользователя
editProfileOpenButton.addEventListener('click', () => {
  popupEditProfile.setInitialInputValues(profileInfo.getUserInfo(), popupProfileSelectors);
  formValidationEditProfile.resetForm();
  popupEditProfile.openPopup();
});


// Открытие окна добавления фото
addPhotoOpenButton.addEventListener('click', () => {
  formValidationAddPhoto.resetForm();
  popupAddCard.openPopup();
});


// Добавление предустановленных карточек на страницу
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
