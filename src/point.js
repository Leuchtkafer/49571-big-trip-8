import {Component} from './component.js';
import {Type} from './data.js';
import moment from 'moment';

export class Point extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._offers = data.offers;
    this._picture = data.picture;
    this._description = data.description;
    this._date = data.date;
    this._time = data.time;
    this._price = data.price;
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
          <h3 class="trip-point__title">${Object.keys(this._type)[Math.floor(Math.random() * Object.keys(this._type).length)]}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${moment(this._date).format(`hh:mm`)}</span>
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
    this._element.addEventListener(`click`, this._onEditButtonClick);
  }
  unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick);
  }
  update(data) {
    this._type = data.type;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
  }
}
