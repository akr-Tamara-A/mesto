
export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /** 
   * Метод очистки секции
   * @method 
   */
  clear() {
    this._container.innerHTML = '';
  }

  /** 
   * Метод отрисовки элементов
   * @method 
   */
  renderItems() {
    this.clear();

    this._renderedItems.forEach((elem) => {
      this._renderer(elem);
    });
  }

  /** 
   * Добавление элемента в контейнер
   * @method 
   */
  setItem(cardElement) {
    this._container.prepend(cardElement);
  }
}