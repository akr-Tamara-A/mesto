import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._photoLinkSelector = data.photoLink;
    this._photoTitleSelector = data.photoTitle;
    this._photoLink = this._popup.querySelector(this._photoLinkSelector);
    this._photoTitle = this._popup.querySelector(this._photoTitleSelector);
  }

  /** Метод открытия попапа с полноразмерным фото */
  openPopup(photoLink, photoTitle) {
    super.openPopup();
    this._photoLink.src = photoLink;
    this._photoLink.alt = photoTitle;
    this._photoTitle.textContent = photoTitle;
  }
}