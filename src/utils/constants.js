export const editProfileOpenButton = document.querySelector(
  ".button_type_edit-profile"
);
export const editAvatarOpenButton = document.querySelector(".profile__edit");
export const addPhotoOpenButton = document.querySelector(
  ".button_type_add-photo"
);

export const elementContainer = ".elements__container";

export const cardTemplateSelector = {
  cardTemplate: "#elementTemplate",
};

export const ESC_CODE = "Escape";

export const popupSelectors = {
  viewPhoto: "#popupViewPhoto",
  editProfile: "#popupEditProfile",
  addPhoto: "#popupAddPhoto",
  editAvatar: "#popupEditAvatar",
  deleteCard: "#popupDeleteCard",
};

export const userInfoSelectors = {
  userName: ".profile__user-name",
  userJob: ".profile__user-job",
  userAvatar: ".profile__image",
};

export const popupViewSelectors = {
  photoLink: ".popup__photo",
  photoTitle: ".popup__photo-title",
};

export const popupProfileSelectors = {
  userName: ".popup__input_type_username",
  userJob: ".popup__input_type_about",
};

export const popupAvatarSelectors = {
  userAvatar: ".popup__input_type_avatar",
};

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};
