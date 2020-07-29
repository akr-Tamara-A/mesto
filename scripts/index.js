import { Card } from './Card.js';
import { openPopup, closePopup, closePopupWithEscape, page, config, initialCards } from './utils.js';
import { FormValidator } from './FormValidator.js';


const popups = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('#popupEditProfile');
const addPhotoPopup = document.querySelector('#popupAddPhoto');

const editProfileOpenButton = document.querySelector('.button_type_edit-profile');
const addPhotoOpenButton = document.querySelector('.button_type_add-photo');

const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__user-job');

const formUserName = editProfilePopup.querySelector('.popup__input_type_username');
const formUserJob = editProfilePopup.querySelector('.popup__input_type_about');

const formPhotoTitle = addPhotoPopup.querySelector('.popup__input_type_photo-title');
const formPhotoLink = addPhotoPopup.querySelector('.popup__input_type_photo-link');

const elementContainer = document.querySelector('.elements__container');

const cardTemplateSelector = '#elementTemplate';


// Условия закрытия модального окна:
popups.forEach((popup) => {
  const popupCloseButton = popup.querySelector('.popup__close');

  //...при нажатии кнопки "закрыть"
  popupCloseButton.addEventListener('click', () => closePopup(popup));
  
  //...при клике на оверлей
  popup.addEventListener('mousedown', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  });
});


// Открытие окна редактирования профиля пользователя
function openEditProfilePopup() {
  formUserName.value = userName.textContent;
  formUserJob.value = userJob.textContent;

  formValidationEditProfile.resetForm();

  openPopup(editProfilePopup);
}


// Замена данных профиля пользователя
function addNewValueEditProfile() {
  userName.textContent = formUserName.value;
  userJob.textContent = formUserJob.value;
}


// Открытие окна добавления фото
function openAddPhotoPopup() {
  formPhotoTitle.value = '';
  formPhotoLink.value = '';

  formValidationAddPhoto.resetForm();

  openPopup(addPhotoPopup);
}


// Открытие окна редактирования профиля пользователя
editProfileOpenButton.addEventListener('click', openEditProfilePopup);


// Замена данных профиля пользователя
editProfilePopup.querySelector('.popup__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
  addNewValueEditProfile();
  closePopup(editProfilePopup);
});


// Открытие окна добавления фото
addPhotoOpenButton.addEventListener('click', openAddPhotoPopup);


// Добавление предустановленных карточек на страницу
initialCards.forEach((elem) => {
    const InitialCard = new Card(elem.link, elem.name, cardTemplateSelector);
    const cardElement = InitialCard.generateCard();
    elementContainer.prepend(cardElement);
  });


// Добавление карточки на страницу пользователем
addPhotoPopup.querySelector('.popup__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
  const NewCard = new Card(formPhotoLink.value, formPhotoTitle.value, cardTemplateSelector);
  const cardElement = NewCard.generateCard();
  elementContainer.prepend(cardElement);
  closePopup(addPhotoPopup);
});


const FormValidationEditProfile = new FormValidator(config, editProfilePopup)
FormValidationEditProfile.enableValidation();

const FormValidationAddPhoto = new FormValidator(config, addPhotoPopup)
FormValidationAddPhoto.enableValidation();


