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
const elementEmpty = document.querySelector('.element__empty');

toggleEmptyCardElement();

// Открытие модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.classList.add('popup_fade_in');
  setTimeout(function() {popup.classList.remove('popup_fade_in')}, 400);
}


// Закрытие модального окна
function closePopup(popup) {
  popup.classList.add('popup_fade_out');

  setTimeout(function() {popup.classList.remove('popup_opened')}, 400);
  setTimeout(function() {popup.classList.remove('popup_fade_out')}, 400);
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


// Замена данных профиля пользователя
editProfilePopup.querySelector('.popup__submit').addEventListener('click', newValueEditProfile);

editProfilePopup.querySelector('.popup__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
});

function newValueEditProfile() {

  userName.textContent = formUserName.value;
  userJob.textContent = formUserJob.value;
  closeEditProfilePopup();
}


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
]

// Открытие окна просмотра полноразмерного фото
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
function buttonLikeToggle(elem) {
  elem.querySelector('.element__like').addEventListener('click', function(evt) {
    buttonLike = evt.target;
    if (buttonLike.classList.contains('button_type_like')) {
      buttonLike.title = 'Добавь лайк'
    } else {
      buttonLike.title = 'Убрать лайк'
    }
    buttonLike.classList.toggle('button_type_like');
    console.log(buttonLike.title);
  })
}


// Удаление карточки
function deleteElement(elem) {
  elem.querySelector('.button_type_delete').addEventListener('click', function(evt) {
    const deleteButton = evt.target;
    const element = deleteButton.closest('.element');
    element.remove();
    toggleEmptyCardElement();
  })
}


// Открытие окна добавления фото
addFotoOpenButton.addEventListener('click', openAddFotoPopup);
elementEmpty.addEventListener('click', openAddFotoPopup);

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
  addFotoOpenButton.focus();
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
  
  buttonLikeToggle(cardElement);

  deleteElement(cardElement);

  toggleEmptyCardElement();
  elementContainer.append(cardElement);

})

// Обработка заглушки 
function toggleEmptyCardElement() {
  const cards = elementContainer.children;
  const arrayCards = Array.from(cards);

  if (arrayCards.length < 2) {
    elementEmpty.classList.remove('element_hidden');
  } else {
    elementEmpty.classList.add('element_hidden');
  }
}


// Добавление карточки на страницу пользователем
addFotoPopup.querySelector('.popup__submit').addEventListener('click', function() {
  addFoto(formFotoTitle.value, formFotoLink.value)
});

addFotoPopup.querySelector('.popup__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
});

function addFoto (fotoTitleValue, fotoLinkValue) {
  const cardTemplate = document.querySelector('#elementTemplate').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').src = fotoLinkValue;
  cardElement.querySelector('.element__image').alt = fotoTitleValue;

  cardElement.querySelector('.element__title').title = fotoTitleValue;
  cardElement.querySelector('.element__title').textContent = fotoTitleValue;

  openViewFoto(cardElement);
  buttonLikeToggle(cardElement);
  deleteElement(cardElement);

  elementContainer.prepend(cardElement);

  toggleEmptyCardElement();

  closeAddFotoPopup();
}


