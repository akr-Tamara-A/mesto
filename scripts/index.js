const editProfilePopup = document.querySelector('#popupEditProfile');
const addFotoPopup = document.querySelector('#popupAddFoto');
const viewFotoPopup = document.querySelector('#popupViewFoto');

const editProfileOpenButton = document.querySelector('.button_type_edit-profile');
const addFotoOpenButton = document.querySelector('.button_type_add-foto');

const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__user-job');

const formUserName = editProfilePopup.querySelector('.popup__input_type_username');
const formUserJob = editProfilePopup.querySelector('.popup__input_type_about');

const formFotoTitle = addFotoPopup.querySelector('.popup__input_type_foto-title');
const formFotoLink = addFotoPopup.querySelector('.popup__input_type_foto-link');

const popupFotoLink = viewFotoPopup.querySelector('.popup__foto');
const popupFotoTitle = viewFotoPopup.querySelector('.popup__foto-title');

const elementContainer = document.querySelector('.elements__container');

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
  closeEditProfilePopup();
}


// Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

// Открытие модального окна просмотра полноразмерного фото
function openViewFoto(elem) {
  elem.querySelector('.element__image').addEventListener('click', function(evt) {
    const elementFoto = evt.target;
    const element = elementFoto.closest('.element');
    
    const elementTitle = element.querySelector('.element__title');
    const elementLink = element.querySelector('.element__image');

    openPopup(viewFotoPopup);

    popupFotoLink.src = elementLink.src;
    popupFotoTitle.textContent = elementTitle.textContent;
  })
}


// Закрытие окна просмотра полноразмерного фото
viewFotoPopup.querySelector('.popup__close').addEventListener('click', closeViewFotoPopup);
function closeViewFotoPopup() {
  closePopup(viewFotoPopup);
}


// Обработка кнопки like
function buttonLike(elem) {
  elem.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_type_like');
  })
}


// Удаление карточки
function deleteElement(elem) {
  elem.querySelector('.button_type_delete').addEventListener('click', function(evt) {
    const deleteButton = evt.target;
    const element = deleteButton.closest('.element');
    element.remove();
  })
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
  formFotoTitle.value = "";
  formFotoLink.value = "";
  editProfileOpenButton.focus();
}


// Добавление карточек на страницу
initialCards.forEach(function(elem) {
  const cardTemplate = document.querySelector('#elementTemplate').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').src = elem.link;
  cardElement.querySelector('.element__image').alt = elem.name;

  cardElement.querySelector('.element__title').title = elem.name;
  cardElement.querySelector('.element__title').textContent = elem.name;

  openViewFoto(cardElement);
  
  buttonLike(cardElement);

  deleteElement(cardElement);
  
  elementContainer.append(cardElement);
})


// Добавление карточки на страницу пользователем
addFotoPopup.querySelector('.popup__submit').addEventListener('click', function(evt) {
  evt.preventDefault(); 
  addFoto(formFotoTitle.value, formFotoLink.value)
});

function addFoto (fotoTitleValue, fotoLinkValue) {
  const cardTemplate = document.querySelector('#elementTemplate').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').src = fotoLinkValue;
  cardElement.querySelector('.element__image').alt = fotoTitleValue;

  cardElement.querySelector('.element__title').title = fotoTitleValue;
  cardElement.querySelector('.element__title').textContent = fotoTitleValue;

  openViewFoto(cardElement);

  buttonLike(cardElement);

  deleteElement(cardElement);

  elementContainer.prepend(cardElement);

  closeAddFotoPopup();
}



