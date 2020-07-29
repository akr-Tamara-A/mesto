
export const page = document.querySelector('.page');
export const viewPhotoPopup = document.querySelector('#popupViewPhoto');
export const popupPhotoLink = viewPhotoPopup.querySelector('.popup__photo');
export const popupPhotoTitle = viewPhotoPopup.querySelector('.popup__photo-title');
export const cardTemplate = document.querySelector('#elementTemplate').content;

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
