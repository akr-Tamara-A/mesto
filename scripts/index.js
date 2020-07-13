// Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Северный Ледовитый океан',
    link: 'https://cdn.pixabay.com/photo/2019/03/27/18/53/arctic-ocean-4085638_960_720.jpg'
  },
  {
    name: 'Волга',
    link: 'https://cdn.pixabay.com/photo/2020/05/28/17/20/russia-5231942_960_720.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://cdn.pixabay.com/photo/2018/11/16/10/10/baikal-3819068_960_720.jpg'
  },
  {
    name: 'Ольхон',
    link: 'https://cdn.pixabay.com/photo/2018/12/18/16/47/olkhon-3882674_960_720.jpg'
  },
  {
    name: 'Каспийское море',
    link: 'https://cdn.pixabay.com/photo/2017/12/21/23/14/caspian-sea-3032750_960_720.jpg'
  },
  {
    name: 'Енисей',
    link: 'https://cdn.pixabay.com/photo/2012/12/21/10/06/clouds-71498_960_720.jpg'
  }
];


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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};


// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  if (popup.classList.contains('popup_style_form')) {
    enableValidation(config);
  }

  document.body.style.overflowY = 'hidden';
  window.addEventListener('keydown', closePopupWithEscape);
}


// Закрытие модального окна
function closePopup(popup) {
  if (popup.classList.contains('popup_style_form')) {
    clearPopupForm(popup, config);
  }
  
  popup.classList.remove('popup_opened');
  document.body.style.overflowY = '';
  
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
  formUserName.value = userName.textContent;
  formUserJob.value = userJob.textContent;

  openPopup(editProfilePopup);
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
  openPopup(addPhotoPopup);
  formPhotoTitle.focus();
}


// Создание новой карточки
const createNewCard = (photoTitleValue, photoLinkValue) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementBox = cardElement.querySelector('.element');
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementTitle = cardElement.querySelector('.element__title');
  const cardElementLike = cardElement.querySelector('.element__like');
  const cardElementDelete = cardElement.querySelector('.element__delete');
  
  cardElementImage.src = photoLinkValue;
  cardElementImage.alt = photoTitleValue;
  cardElementTitle.textContent = photoTitleValue;
  
  // Открытие окна просмотра полноразмерного фото
  cardElementImage.addEventListener('click', function() {
    popupPhotoLink.src = photoLinkValue;
    popupPhotoLink.alt = photoTitleValue;
    popupPhotoTitle.textContent = photoTitleValue;
    openPopup(viewPhotoPopup);
  });
  
  // Обработка кнопки like
  cardElementLike.addEventListener('click', function() {
    cardElementLike.classList.toggle('button_type_like');
  });

  // Удаление карточки
  cardElementDelete.addEventListener('click', function() {
    cardElementBox.remove();
  });
  return cardElement;
};


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


// Добавление карточки на страницу пользователем
addPhotoPopup.querySelector('.popup__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
  elementContainer.prepend(createNewCard(formPhotoTitle.value, formPhotoLink.value));
  closePopup(addPhotoPopup);
});


// Добавление предустановленных карточек на страницу
initialCards.forEach((elem) => {
    elementContainer.prepend(createNewCard(elem.name, elem.link));
});

