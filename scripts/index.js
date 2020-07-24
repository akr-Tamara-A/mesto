import { clearPopupForm } from './validate.js';
import { Card } from './card.js';
import { initialCards } from './utils.js'

const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('#popupEditProfile');
const addPhotoPopup = document.querySelector('#popupAddPhoto');
const viewPhotoPopup = document.querySelector('#popupViewPhoto');

const editProfileOpenButton = document.querySelector('.button_type_edit-profile');
const addPhotoOpenButton = document.querySelector('.button_type_add-photo');

const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__user-job');

const formUserName = editProfilePopup.querySelector('.popup__input_type_username');
const formUserJob = editProfilePopup.querySelector('.popup__input_type_about');

const formPhotoTitle = addPhotoPopup.querySelector('.popup__input_type_photo-title');
const formPhotoLink = addPhotoPopup.querySelector('.popup__input_type_photo-link');

const popupPhotoLink = viewPhotoPopup.querySelector('.popup__photo');
const popupPhotoTitle = viewPhotoPopup.querySelector('.popup__photo-title');

const elementContainer = document.querySelector('.elements__container');

const cardTemplate = document.querySelector('#elementTemplate').content;

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Открытие модального окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.classList.add('page_overflow');

  window.addEventListener('keydown', closePopupWithEscape);
}


// Закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.classList.remove('page_overflow');

  
  window.removeEventListener('keydown', closePopupWithEscape);
}


//Закрытие попапа с помощью "Esc"
function closePopupWithEscape(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}


// Условия закрытия модального окна:
popups.forEach((popup) => {
  //...при нажатии кнопки "закрыть"
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => closePopup(popup));
  
  //...при клике на оверлей
  popup.addEventListener('mousedown', (evt) => {
    const e = evt || window.event;
    if (e.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});


// Открытие окна редактирования профиля пользователя
function openEditProfilePopup() {
  const submitButton = editProfilePopup.querySelector('.popup__submit');

  clearPopupForm(editProfilePopup, config);

  formUserName.value = userName.textContent;
  formUserJob.value = userJob.textContent;

  openPopup(editProfilePopup);

  submitButton.removeAttribute('disabled', true);

  formUserName.focus();
}


// Замена данных профиля пользователя
function addNewValueEditProfile() {
  userName.textContent = formUserName.value;
  userJob.textContent = formUserJob.value;

  closePopup(editProfilePopup);
}


// Открытие окна добавления фото
function openAddPhotoPopup() {
  const submitButton = addPhotoPopup.querySelector('.popup__submit');

  clearPopupForm(addPhotoPopup, config);

  openPopup(addPhotoPopup);

  submitButton.setAttribute('disabled', true);

  formPhotoTitle.focus();
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
  const card = new Card(elem.link, elem.name);
  const cardElement = card.generateCard();
  elementContainer.prepend(cardElement);
});


/* 
// Добавление карточки на страницу пользователем
addPhotoPopup.querySelector('.popup__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
  elementContainer.prepend(createNewCard(formPhotoTitle.value, formPhotoLink.value));
  closePopup(addPhotoPopup);
});
*/