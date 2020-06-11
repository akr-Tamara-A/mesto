const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.button__edit-profile');
const popupClose = document.querySelector('.popup__close');

function togglePopup() {
  popup.classList.toggle('popup__opened');
}

popupOpen.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);



let formSubmit = document.querySelector('.popup__submit');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  
  let nameInput = document.querySelector('.popup__username')
  let jobInput = document.querySelector('.popup__about')

  let newUserName = nameInput.value;
  let newUserJob = jobInput.value;

  let userName = document.querySelector('.profile__user-name');
  let userJob = document.querySelector('.profile__user-job');

  console.log(nameInput, jobInput);
  console.log(userName, userJob);
  console.log(newUserName, newUserJob);

  userName.textContent = newUserName;
  userJob.textContent = newUserJob;
}

formSubmit.addEventListener('click', formSubmitHandler);


























