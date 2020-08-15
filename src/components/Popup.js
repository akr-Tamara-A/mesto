import { ESC_CODE} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close')
    this._page = document.querySelector('.page');
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  openPopup() {
    this._popup.classList.add('popup_opened');
    this._page.classList.add('page_overflow');
    window.addEventListener('keydown', this._handleEscClose);
  }
  
  closePopup() {
    this._popup.classList.remove('popup_opened');
    this._page.classList.remove('page_overflow');
    window.removeEventListener('keydown', this._handleEscClose);
  }
  
  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.closePopup());
    this._popup.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === ESC_CODE) {
      this.closePopup();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.currentTarget === evt.target) {
      this.closePopup();
    }
  }
}