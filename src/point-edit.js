import {Component} from './component.js';
import {Type} from './data.js';
import flatpickr from 'flatpickr';

export class PointEdit extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._offers = data.offers;
    this._description = data.description;
    this._picture = data.picture;
    this._date = data.date;
    this._time = data.time;
    this._price = data.price;
    this._onSubmit = null;
    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._state = {
      isDate: false,
    };
  }
  _processForm(formData) {
    const entry = {
      type: ``,
      time: ``,
      date: ``,
      price: null,
      offers: new Set(),
    };

    const pointEditMapper = PointEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }
    return entry;
  }
  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this.bind();
  }
  _onChangeType(evt) {
    const travelTypeChecked = document.querySelector(`.travel-way__label`);
    if (evt.target.className === `travel-way__select-label`) {
      let inputChecked = evt.target.previousElementSibling.value;
      travelTypeChecked.innerHTML = Type[inputChecked];
    }
  }
  _onSubmitButtonClick(evt) {
    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }
  set onSubmit(fn) {
    this._onSubmit = fn;
  }
  get template() {
    return `<article class="point">
        <form method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${this._date}">
            </label>
      
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${Type[this._type]}</label>
      
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
      
              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi" 
                  ${this._type === `taxi` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus" 
                  ${this._type === `bus` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train" ${this._type === `train` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>
                  
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-ship" name="travel-way" value="ship" ${this._type === `ship` ? `checked` : ``}}>
                  <label class="travel-way__select-label" for="travel-way-ship">🛳 ship</label>
                  
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-transport" name="travel-way" value="transport" ${this._type === `transport` ? `checked` : ``}}>
                  <label class="travel-way__select-label" for="travel-way-transport">🚊 transport</label>
                  
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-drive" name="travel-way" value="drive" ${this._type === `drive` ? `checked` : ``}}>
                  <label class="travel-way__select-label" for="travel-way-drive">🚗 drive</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="flight" ${this._type === `flight` ? `checked` : ``}}>
                  <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
                </div>
      
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in" ${this._type === `check-in` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing" ${this._type === `sight-seeing` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                  
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-restaurant" name="travel-way" value="restaurant" ${this._type === `restaurant` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-restaurant">🍴 restaurant</label>
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">Flight to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
              <datalist id="destination-select">
                <option value="airport"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
                <option value="hotel"></option>
              </datalist>
            </div>
      
            <label class="point__time">
              choose time
              <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
            </label>
      
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>
      
            <div class="point__buttons">
              <button class="point__button point__button--save">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
      
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
              <div class="point__offers-wrap">
                <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage">
                <label for="add-luggage" class="point__offers-label">
                  <span class="point__offer-service">Add luggage</span> + €<span class="point__offer-price">30</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="switch-to-comfort-class" name="offer" value="switch-to-comfort-class">
                <label for="switch-to-comfort-class" class="point__offers-label">
                  <span class="point__offer-service">Switch to comfort class</span> + €<span class="point__offer-price">100</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="add-meal" name="offer" value="add-meal">
                <label for="add-meal" class="point__offers-label">
                  <span class="point__offer-service">Add meal </span> + €<span class="point__offer-price">15</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="choose-seats" name="offer" value="choose-seats">
                <label for="choose-seats" class="point__offers-label">
                  <span class="point__offer-service">Choose seats</span> + €<span class="point__offer-price">5</span>
                </label>
              </div>
            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._description}</p>
              <div class="point__destination-images">
                <img src="${this._picture}" alt="picture from place" class="point__destination-image">
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>`;
  }
  bind() {
    this._element.querySelector(`.point__button.point__button--save`).addEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__date`).firstElementChild.addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.point__time`).firstElementChild.addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.travel-way__select`).addEventListener(`click`, this._onChangeType);

    if (this._state.isDate) {
      flatpickr(this._element.querySelector(`.point__date`).firstElementChild, {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(this._element.querySelector(`.point__time`).firstElementChild, {enableTime: true, noCalendar: true, altInput: true, altFormat: `H:i`, dateFormat: `H:i`});
    }
  }
  unbind() {
    this._element.querySelector(`.point__button.point__button--save`).removeEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__date`).firstElementChild.removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.point__time`).firstElementChild.removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.travel-way__select`).removeEventListener(`click`, this._onChangeType);
  }
  update(data) {
    this._type = data.type;
    this._date = data.date;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
  }
  static createMapper(target) {
    return {
      'travel-way': (value) => {
        target.type = value;
      },
      'time': (value) => {
        target.time = value;
      },
      'day': (value) => {
        target.date = value;
      },
      'price': (value) => {
        target.price = value;
      },
      'offer': (value) => target.offers.add(value),
    };
  }
}
