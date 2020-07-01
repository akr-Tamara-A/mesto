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


// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}


// Закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// Открытие окна редактирования профиля пользователя
function openEditProfilePopup() {
  openPopup(editProfilePopup);
  formUserName.focus();

  formUserName.value = userName.textContent;
  formUserJob.value = userJob.textContent;
}


// Закрытие окна редактирования профиля пользователя
function closeEditProfilePopup() {
  closePopup(editProfilePopup);
}


// Замена данных профиля пользователя
function addNewValueEditProfile() {
  userName.textContent = formUserName.value;
  userJob.textContent = formUserJob.value;

  closeEditProfilePopup();
}


// Закрытие окна просмотра полноразмерного фото
function closeViewPhotoPopup() {
  closePopup(viewPhotoPopup);
}


// Открытие окна добавления фото
function openAddPhotoPopup() {
  openPopup(addPhotoPopup);
  formPhotoTitle.focus();
}


// Закрытие окна добавления фото
function closeAddPhotoPopup() {
  closePopup(addPhotoPopup);

  formPhotoTitle.value = "";
  formPhotoLink.value = "";
}


// Создание новой карточки
const createNewCard = (photoTitleValue, photoLinkValue) => {
  const cardTemplate = document.querySelector('#elementTemplate').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementBox = cardElement.querySelector('.element');
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementTitle = cardElement.querySelector('.element__title');
  const cardElementLike = cardElement.querySelector('.element__like');
  const cardElementClose = cardElement.querySelector('.element__delete');
  
  cardElementImage.src = photoLinkValue;
  cardElementImage.alt = photoTitleValue;
  cardElementTitle.textContent = photoTitleValue;
  
  // Открытие окна просмотра полноразмерного фото
  cardElementImage.addEventListener('click', function() {
    openPopup(viewPhotoPopup);
    popupPhotoLink.src = photoLinkValue;
    popupPhotoLink.alt = photoTitleValue;
    popupPhotoTitle.textContent = photoTitleValue;
  });
  
  // Обработка кнопки like
  cardElementLike.addEventListener('click', function() {
    cardElementLike.classList.toggle('button_type_like');
  });

  // Удаление карточки
  cardElementClose.addEventListener('click', function() {
    cardElementBox.remove();
  });
  return cardElement;
};


// Открытие окна редактирования профиля пользователя
editProfileOpenButton.addEventListener('click', openEditProfilePopup);


// Закрытие окна редактирования профиля пользователя
editProfilePopup.querySelector('.popup__close').addEventListener('click', closeEditProfilePopup);


// Замена данных профиля пользователя
editProfilePopup.querySelector('.popup__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
  addNewValueEditProfile();
});


// Закрытие окна просмотра полноразмерного фото
viewPhotoPopup.querySelector('.popup__close').addEventListener('click', closeViewPhotoPopup);


// Открытие окна добавления фото
addPhotoOpenButton.addEventListener('click', openAddPhotoPopup);


// Закрытие окна добавления фото
addPhotoPopup.querySelector('.popup__close').addEventListener('click', closeAddPhotoPopup);


// Добавление карточки на страницу пользователем
addPhotoPopup.querySelector('.popup__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
  elementContainer.prepend(createNewCard(formPhotoTitle.value, formPhotoLink.value));
  closeAddPhotoPopup();
});


// Добавление предустановленных карточек на страницу
initialCards.forEach((elem) => {
    elementContainer.prepend(createNewCard(elem.name, elem.link));
});
