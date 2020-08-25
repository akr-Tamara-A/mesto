import { ESC_CODE } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close");
    this._page = document.querySelector(".page");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  /** Метод открытия попапа */
  openPopup() {
    this._popup.classList.add("popup_opened");
    this._page.classList.add("page_overflow");
    window.addEventListener("keydown", this._handleEscClose);
  }

  /** Метод закрытия попапа */
  closePopup() {
    this._popup.classList.remove("popup_opened");
    this._page.classList.remove("page_overflow");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  /** Навешивание слушателей закрытия попапа */
  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.closePopup());
    this._popup.addEventListener("mousedown", (evt) =>
      this._handleOverlayClose(evt)
    );
  }

  /** Метод закрытия попапа при нажатии ESC */
  _handleEscClose(evt) {
    if (evt.key === ESC_CODE) {
      this.closePopup();
    }
  }

  /** Метод закрытия попапа при клике на овелей */
  _handleOverlayClose(evt) {
    if (evt.currentTarget === evt.target) {
      this.closePopup();
    }
  }
}
