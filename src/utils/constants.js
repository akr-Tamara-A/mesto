
export const editProfileOpenButton = document.querySelector('.button_type_edit-profile');
export const editAvatarOpenButton = document.querySelector('.profile__edit');
export const addPhotoOpenButton = document.querySelector('.button_type_add-photo');

export const elementContainer = '.elements__container';

export const cardTemplateSelector = {
  userCardTemplate: '#userElementTemplate',
  othersCardTemplate: '#elementTemplate',
};

export const ESC_CODE = 'Escape';

export const popupSelectors = {
  viewPhoto: '#popupViewPhoto',
  editProfile: '#popupEditProfile',
  addPhoto: '#popupAddPhoto',
  editAvatar: '#popupEditAvatar',
  deleteCard: '#popupDeleteCard',
}

export const userInfoSelectors = {
  userName: '.profile__user-name',
  userJob: '.profile__user-job',
  userAvatar: '.profile__image'
}

export const popupViewSelectors = {
  photoLink: '.popup__photo',
  photoTitle: '.popup__photo-title'
}

export const popupProfileSelectors = {
  userName: '.popup__input_type_username',
  userJob: '.popup__input_type_about'
}

export const popupAvatarSelectors = {
  userAvatar: '.popup__input_type_avatar',
}

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





