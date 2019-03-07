import {createElement} from './utils.js';

export class Point {
  constructor(data) {
    this._type = data.type;
    this._city = data.city;
    this._offers = data.offers;
    this._picture = data.picture;
    this._description = data.description;
    this._date = data.date;
    this._time = data.time;
    this._price = data.price;
    this._element = null;
    this._onEdit = null;
  }
  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }
  get element() {
    return this._element;
  }
  set onEdit(fn) {
    this._onEdit = fn;
  }
  get template() {
    return `<article class="trip-point">
          <i class="trip-icon">${this._type[Object.keys(this._type)[Math.floor(Math.random() * Object.keys(this._type).length)]]}</i>
          <h3 class="trip-point__title">${Object.keys(this._type)[Math.floor(Math.random() * Object.keys(this._type).length)]}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${this._time}</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
          <ul class="trip-point__offers">
                ${[...this._offers].splice(Math.floor(Math.random() * 5), 2).map((it) => `<li>
              <button class="trip-point__offer">${it} +&euro;&nbsp;20</button>
            </li>`).join(``)}
          </ul>
        </article>`;
  }
  bind() {
    this._element.querySelector(`.trip-point`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    this._element.querySelector(`.trip-point`)
      .removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
