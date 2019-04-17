import {Component} from './component.js';
import {Type} from './model-point.js';

export class Point extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._date = data.date;
    this._time = {
      start: data.dateFrom,
      end: data.dateTo,
      duration: data.duration,
    };
    this._price = data.price;
    this._offers = data.offers;
    this._id = data.id;
    this._destination = data.destination;
    this._isFavorite = data.isFavorite;
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
            <span class="trip-point__timetable">${this._time.start} - ${this._time.end}</span>
            <span class="trip-point__duration">${this._time.duration}</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
          <ul class="trip-point__offers">
                ${this._offers ? [...this._offers].map((it) => `<li>
              <button class="trip-point__offer">${it.name} &euro;&nbsp;${it.price}</button>
            </li>`).join(``) : []}
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
    this._time.start = data.dateFrom;
    this._time.end = data.dateTo;
    this._price = data.price;
    this._offers = data.offers;
    this._isFavorite = data.isFavorite;
    this._id = data.id;
    this._destination = data.destination;
  }
}
