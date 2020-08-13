import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._photoLinkSelector = data.photoLink;
    this._photoTitleSelector = data.photoTitle;
  }

  openPopup(photoLink, photoTitle) {
    super.openPopup();
    this._popup.querySelector(this._photoLinkSelector).src = photoLink;
    this._popup.querySelector(this._photoLinkSelector).alt = photoTitle;
    this._popup.querySelector(this._photoTitleSelector).textContent = photoTitle;
  }
}