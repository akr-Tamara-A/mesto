
export const page = document.querySelector('.page');
export const viewPhotoPopup = document.querySelector('#popupViewPhoto');
export const popupPhotoLink = viewPhotoPopup.querySelector('.popup__photo');
export const popupPhotoTitle = viewPhotoPopup.querySelector('.popup__photo-title');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};


export const initialCards = [
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


// Открытие модального окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.classList.add('page_overflow');

  window.addEventListener('keydown', closePopupWithEscape);
};


// Закрытие модального окна
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.classList.remove('page_overflow');
  
  window.removeEventListener('keydown', closePopupWithEscape);
};


//Закрытие попапа с помощью "Esc"
export function closePopupWithEscape(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
};


//Открытие окна просмотра полноразмерного фото
export function openViewPhotoPopup(photoLink, photoTitle) {
  popupPhotoLink.src = photoLink;
  popupPhotoTitle.alt = photoTitle;
  popupPhotoTitle.textContent = photoTitle;

  openPopup(viewPhotoPopup);
};
