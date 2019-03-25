import {Component} from './component.js';
import {Type} from './data.js';

export class Point extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._offers = data.offers;
    this._description = data.description;
    this._date = data.date;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);

    this._onEdit = null;
  }
  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }
  set onEdit(fn) {
    this._onEdit = fn;
  }
  get template() {
    return `<article class="trip-point">
          <i class="trip-icon">${Type[this._type]}</i>
          <h3 class="trip-point__title">${this._type}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${this._time}</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
          <ul class="trip-point__offers">
                ${[...this._offers].map((it) => `<li>
              <button class="trip-point__offer">${it} +&euro;&nbsp;20</button>
            </li>`).join(``)}
          </ul>
        </article>`;
  }
  bind() {
    this._element.addEventListener(`click`, this._onEditButtonClick);
  }
  unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick);
  }
  update(data) {
    this._type = data.type;
    this._date = data.date;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
  }
}
