
export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /** Метод очистки секции */
  clear() {
    this._container.innerHTML = '';
  }

  /** Метод отрисовки элементов */
  renderItems() {
    this.clear();

    this._renderedItems()
    .then((data) => {
      data.forEach((elem) => {
        this._renderer(elem);
    })
    });
  }

  /** Добавление элемента в контейнер */

  setItem(cardElement) {
    this._container.prepend(cardElement);
  }
}