/** Импорт файла стилей */
import './index.css';

/** Импорт констант */
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


import { 
  config, 
  initialCards,

  elementContainer,
  cardTemplateSelector,

  editProfileOpenButton,
  editAvatarOpenButton,
  addPhotoOpenButton,
  
  popupSelectors,

  userInfoSelectors,
  popupViewSelectors,
  popupProfileSelectors,
  popupAvatarSelectors
  } from '../utils/constants.js';


  import { renderLoading } from '../utils/utils.js';



  /** Связь с сервером */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'f7fbd0be-598d-4bc2-8963-24bc80b8013a',
    'Content-Type': 'application/json'
    }
});


let userID = '';

/** Валидация формы редактирования профиля */
const formValidationEditProfile = new FormValidator(config, popupSelectors.editProfile)
formValidationEditProfile.enableValidation();

/** Валидация формы редактирования аватара */
const formValidationEditAvatar = new FormValidator(config, popupSelectors.editAvatar)
formValidationEditAvatar.enableValidation();


/** Валидация формы добавления новой карточки */
const formValidationAddPhoto = new FormValidator(config, popupSelectors.addPhoto)
formValidationAddPhoto.enableValidation();


/** Инициализация обработчика профиля  */
api.getUserInfo()
  .then((data) => {
    const profileInfo = new UserInfo(userInfoSelectors, {data: data});
    profileInfo.setUserInfo(data.name, data.about);
    profileInfo.setUserAvatar(data.avatar);
    userID = data._id;
    
  /** Инициализация попапа редактирования профиля */
  const popupEditProfile = new PopupWithForm({
    handleFormSubmit: (formData, submitButton) => {
      const userName = formData.editProfileUserName;
      const userJob = formData.editProfileUserJob;
      
      renderLoading(true, submitButton);

      api.patchUserInfo(userName, userJob)
      .then(() => {
        profileInfo.setUserInfo(userName, userJob);
      })
      .catch((err) => {
        console.log('Ошибка. Не удалось установить новые данные: ', err);
      })
      .finally(() => {
        renderLoading(false, submitButton);
      });
    }
  }, popupSelectors.editProfile);

  popupEditProfile.setEventListeners();

  /** Инициализация попапа редактирования аватара */
  const popupEditAvatar = new PopupWithForm({
    handleFormSubmit: (formData, submitButton) => {
      const userAvatar = formData.editUserAvatar;

      renderLoading(true, submitButton);

      api.patchUserAvatar(userAvatar)
        .then(() => {
          profileInfo.setUserAvatar(userAvatar);
        })
        .catch((err) => {
          console.log('Ошибка. Не удалось установить новый аватар: ', err);
        })
        .finally(() => {
          renderLoading(false, submitButton);
        });
    }
  }, popupSelectors.editAvatar);

  popupEditAvatar.setEventListeners();

  /** Открытие окна редактирования профиля пользователя */
  editProfileOpenButton.addEventListener('click', () => {
    popupEditProfile.setInitialInputValues(
      profileInfo.getUserInfo(), 
      popupProfileSelectors);
    formValidationEditProfile.resetForm();
    popupEditProfile.openPopup();
  });

  /** Открытие окна редактирования аватара пользователя */
  editAvatarOpenButton.addEventListener('click', () => {
    formValidationEditAvatar.resetForm();
    popupEditAvatar.openPopup();
  });
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  })


/** Добавление предустановленных карточек на страницу */
api.getInitialCards()
  .then(data => {
    return data.reverse()})
  .then(data => {
    const cardList = new Section({
      data: data,
      renderer: (elem) => {
        const initialCard = new Card(
          elem,
          userID,
          {handleCardClick: (photoLink, photoTitle) => {
            popupViewPhoto.openPopup(photoLink, photoTitle);
          },
          handleCardLike: (id, isLiked) => {
            if (isLiked) {
              api.unlikeCard(id)
              .then((data) => {
                initialCard.setLikes(data.likes.length);
                initialCard.handlePhotoLike();
              })
              .catch((err) => {
                console.log('Ошибка. Не получилось убрать лайк: ', err);
              });
            } else {
              api.likeCard(id)
                .then((data) => {
                  initialCard.setLikes(data.likes.length);
                  initialCard.handlePhotoLike();
                })
                .catch((err) => {
                  console.log('Ошибка. Не получилось добавить лайк: ', err);
                });
            }
          },
          handleCardDelete: (id, card) => {
            popupDeleteCard.openPopup();
            popupDeleteCard.getCardID(id, card);
          }}, 
          cardTemplateSelector.cardTemplate);
        const cardElement = initialCard.generateCard();
        cardList.setItem(cardElement);
      }
    }, elementContainer);
    
    cardList.renderItems();

    /** Инициализация попапа добавления новой карточки */
    const popupAddCard = new PopupWithForm({
      handleFormSubmit: (formData, submitButton) => {
        const cardName = formData.addPhotoTitle;
        const cardLink = formData.addPhotoLink;

        renderLoading(true, submitButton);

        api.postNewCard(cardName, cardLink)
          .then((data) => {
            const newCard = new Card(
              data,
              userID,
              {handleCardClick: (photoLink, photoTitle) => {
                popupViewPhoto.openPopup(photoLink, photoTitle);
              },
              handleCardLike: (id, isLiked) => {
                if (isLiked) {
                  api.unlikeCard(id)
                  .then((data) => {
                    newCard.setLikes(data.likes.length);
                    newCard.handlePhotoLike();
                  })
                  .catch((err) => {
                    console.log('Ошибка. Не получилось убрать лайк: ', err);
                  });
                } else {
                  api.likeCard(id)
                    .then((data) => {
                      newCard.setLikes(data.likes.length);
                      newCard.handlePhotoLike();
                    })
                    .catch((err) => {
                      console.log('Ошибка. Не получилось добавить лайк: ', err);
                    })
                }
              },
              handleCardDelete: (id,card) => {
                popupDeleteCard.openPopup();
                popupDeleteCard.getCardID(id, card);
              }}, 
              cardTemplateSelector.cardTemplate);
            const cardElement = newCard.generateCard();
            cardList.setItem(cardElement); 
          })
          .catch((err) => {
            console.log('Ошибка. Не получилось добавить карточку: ', err);
          })
          .finally(() => {
            renderLoading(false, submitButton);
          });
      }
    },
    popupSelectors.addPhoto);

    popupAddCard.setEventListeners();

    /** Открытие окна добавления фото */
    addPhotoOpenButton.addEventListener('click', () => {
      formValidationAddPhoto.resetForm();
      popupAddCard.openPopup();
    });

    /** Инициализация попапа просмотра полноразмерного фото */
    const popupViewPhoto = new PopupWithImage(popupSelectors.viewPhoto, popupViewSelectors);
    popupViewPhoto.setEventListeners();


    /** Инициализация попапа подтверждения удаления карточки */
    const popupDeleteCard = new PopupWithSubmit({
      handleFormSubmit: () => {
        const card = popupDeleteCard.setCardId().card;
        const cardId = popupDeleteCard.setCardId().id;
        api.deleteCard(cardId)
          .then(() => {
            card.remove();
          })
          .catch((err) => {
            console.log('Ошибка. Запрос на удаление не выполнен: ', err);
          });
      }
      }, popupSelectors.deleteCard);

    popupDeleteCard.setEventListeners();



  })

