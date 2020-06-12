let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.button_type_edit-profile');
let popupCloseButton = document.querySelector('.popup__close');

let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-job');

let formPopup = document.querySelector('.popup__container');
let formUserName = document.querySelector('.popup__input_type_username');
let formUserJob = document.querySelector('.popup__input_type_about');
let formSubmit = document.querySelector('.popup__submit');


// Открытие редактирования профиля пользователя
function openPopup() {
  popup.classList.add('popup_opened');
  formUserName.focus();
  formUserName.value = userName.textContent;
  formUserJob.value = userJob.textContent;
}

popupOpenButton.addEventListener('click', openPopup);


// Закрытие редактирования профиля пользователя
function closePopup() {
  popup.classList.remove('popup_opened');
  popupOpenButton.focus();
}

popupCloseButton.addEventListener('click', closePopup);


// Отмена стандартной отправки формы и замена данных профиля пользователя
function newValuePopup(evt) {
  evt.preventDefault(); 
  userName.textContent = formUserName.value;
  userJob.textContent = formUserJob.value;
  closePopup();
}

formSubmit.addEventListener('click', newValuePopup);

