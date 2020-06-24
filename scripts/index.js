let editProfilePopup = document.querySelector('#popupEditProfile');
let addFotoPopup = document.querySelector('#popupAddFoto');

let editProfileOpenButton = document.querySelector('.button_type_edit-profile');
let addFotoOpenButton = document.querySelector('.button_type_add-foto');

let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-job');

let formUserName = document.querySelector('.popup__input_type_username');
let formUserJob = document.querySelector('.popup__input_type_about');
let formFotoTitle = document.querySelector('.popup__input_type_foto-title');
let formFotoLink = document.querySelector('.popup__input_type_foto-link');


// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.classList.add('popup_fade_in');
}


// Закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_fade_in');
  popup.classList.add('popup_fade_out');
  popup.classList.remove('popup_opened');
}


// Открытие окна редактирования профиля пользователя
editProfileOpenButton.addEventListener('click', openEditProfilePopup);

function openEditProfilePopup() {
  openPopup(editProfilePopup);
  formUserName.focus();
  formUserName.value = userName.textContent;
  formUserJob.value = userJob.textContent;
}


// Закрытие окна редактирования профиля пользователя
editProfilePopup.querySelector('.popup__close').addEventListener('click', closeEditProfilePopup);

function closeEditProfilePopup() {
  closePopup(editProfilePopup);
  editProfileOpenButton.focus();
}


// Отмена стандартной отправки формы и замена данных профиля пользователя
editProfilePopup.querySelector('.popup__submit').addEventListener('click', newValueEditProfile);

function newValueEditProfile(evt) {
  evt.preventDefault(); 
  userName.textContent = formUserName.value;
  userJob.textContent = formUserJob.value;
  closePopup();
}


// Открытие окна добавления фото
addFotoOpenButton.addEventListener('click', openAddFotoPopup);

function openAddFotoPopup() {
  openPopup(addFotoPopup);
  formFotoTitle.focus();
}


// Закрытие окна добавления фото
addFotoPopup.querySelector('.popup__close').addEventListener('click', closeAddFotoPopup);

function closeAddFotoPopup() {
  closePopup(addFotoPopup);
  editProfileOpenButton.focus();
}

