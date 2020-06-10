let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.button__edit-profile');
let popupClose = document.querySelector('.popup__close');


function togglePopup() {
  popup.classList.toggle('popup__opened');
}

popupOpen.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);


console.log(`${popup.classList}`);
































