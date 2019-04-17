import {Component} from './component.js';
import {Type} from './model-point.js';
import flatpickr from 'flatpickr';

export class PointEdit extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._offers = data.offers;
    this._destination = data.destination;
    this._pictures = data.pictures;
    this._description = data.description;
    this._date = data.date;
    this._time = {
      start: data.dateFrom,
      end: data.dateTo,
    };
    this._isFavorite = data.isFavorite;
    this._price = data.price;
    this._onSubmit = null;
    this._onDelete = null;
    this._id = data.id;
    this._allDestinations = null;
    this._allOffers = null;
    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._state = {
      isDate: false,
    };
  }
  _resetOffers(offers) {
    for (const offer of offers) {
      offer.checked = false;
    }

    return offers;
  }
  _processForm(formData) {
    const entry = {
      type: ``,
      time: {
        start: ``,
        end: ``,
      },
      destination: ``,
      date: ``,
      price: null,
      offers: this._resetOffers(this._offers),
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
  _partialUpdate() {
    this._element.innerHTML = this.template;
  }
  _onDeleteButtonClick() {
    if (typeof this._onSubmit === `function`) {
      this._onDelete({id: this._id});
    }
  }
  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this.bind();
  }
  _onChangeType(evt) {
    const value = evt.target.value;
    const currentOffers = this._allOffers.filter((offer) => offer.type === value)[0];

    this._type = value;
    this._offers = currentOffers.offers;
    this.unbind();
    this._partialUpdate();
    this.bind();
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
  _splitString(str) {
    const strArray = str.split(` `);
    return strArray.map((word) => word.toLowerCase()).join(`-`);
  }
  _getOffersElement(offers) {
    return offers.map((offer) => `<input class="point__offers-input visually-hidden" type="checkbox" id="${this._splitString(`${offer.name}`)}" name="offer" value="${this._splitString(`${offer.name}`)}" ${offer.checked ? `checked` : ``}>
			<label for="${this._splitString(`${offer.name}`)}" class="point__offers-label">
				<span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
          </label>`).join(``);
  }
  set onSubmit(fn) {
    this._onSubmit = fn;
  }
  set onDelete(fn) {
    this._onDelete = fn;
  }
  set allDestinations(data) {
    this._allDestinations = data;
  }
  set allOffers(data) {
    this._allOffers = data;
  }
  block(className) {
    if (className === `save`) {
      this._element.querySelector(`.point__button--${className}`).innerText = `Saving..`;
    } else if (className === `delete`) {
      this._element.querySelector(`.point__button--${className}`).innerText = `Deleting...`;
    }
    this._element.querySelector(`.point__button--${className}`).disabled = true;
    this._element.querySelector(`.point__form`).disabled = true;
  }
  unblock(className) {
    if (className === `save`) {
      this._element.querySelector(`.point__button--${className}`).innerText = `Save`;
    } else if (className === `delete`) {
      this._element.querySelector(`.point__button--${className}`).innerText = `Delete`;
    }
    this._element.querySelector(`.point__button--${className}`).disabled = false;
    this._element.querySelector(`.point__form`).disabled = false;
  }
  get template() {
    return `<article class="point">
        <form method="get" class="point__form">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${this._date ? this._date : ``}">
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
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sightseeing" ${this._type === `sightseeing` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                  
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-restaurant" name="travel-way" value="restaurant" ${this._type === `restaurant` ? `checked` : ``}>
                  <label class="travel-way__select-label" for="travel-way-restaurant">🍴 restaurant</label>
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._type[0].toUpperCase() + this._type.slice(1)} to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
              <datalist id="destination-select">
                ${this._allDestinations ? this._allDestinations.map((destination) => `<option class="destination-option" value="${destination.name}"></option>`).join(``) : []}
              </datalist>
            </div>
      
            <div class="point__time">
              choose time
              <input class="point__input" type="text" value="${this._time.start}" name="date-start" placeholder="19:00"> - 
              <input class="point__input" type="text" value="${this._time.end}" name="date-end" placeholder="21:00">
            </div>
            <!--label class="point__time">
              choose time
              <input class="point__input" type="text" value="${this._time}" name="time" placeholder="00:00 — 00:00">
            </label-->
      
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>
      
            <div class="point__buttons">
              <button class="point__button point__button--save">Save</button>
              <button class="point__button point__button--delete" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
      
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
           <div class="point__offers-wrap">
           ${this._getOffersElement(this._offers)}
           </div>
            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._description}</p>
              <div class="point__destination-images">
                  ${this._pictures ? this._pictures.map((picture) => `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`).join(``) : []}
               
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>`;
  }
  bind() {
    this._element.querySelector(`.point__button--save`).addEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__date`).firstElementChild.addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.point__time`).firstElementChild.addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.point__button--delete`).addEventListener(`click`, () => {
      this._onDeleteButtonClick();
    });

    if (this._state.isDate) {
      flatpickr(this._element.querySelector(`.point__date`).firstElementChild, {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(this._element.querySelector(`.point__time`).firstElementChild, {enableTime: true, noCalendar: true, altInput: true, altFormat: `H:i`, dateFormat: `H:i`});
      flatpickr(this._element.querySelector(`.point__time`).lastElementChild, {enableTime: true, noCalendar: true, altInput: true, altFormat: `H:i`, dateFormat: `H:i`});
    }
    const options = this._element.querySelectorAll(`.travel-way__select-input`);

    for (const option of options) {
      option.addEventListener(`click`, this._onChangeType);
    }
  }
  unbind() {
    this._element.querySelector(`.point__button--save`).removeEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__date`).firstElementChild.removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.point__time`).firstElementChild.removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.point__button--delete`) .removeEventListener(`click`, () => {
      this._onDeleteButtonClick();
    });

    const options = this._element.querySelectorAll(`.travel-way__select-input`);

    for (const option of options) {
      option.removeEventListener(`click`, this._onChangeType);
    }
  }
  update(data) {
    this._type = data.type;
    this._date = data.date;
    this._time.start = data.dateFrom;
    this._time.end = data.dateTo;
    this._price = data.price;
    this._offers = data.offers;
    this._destination = data.destination;
  }
  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
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
      'offer': (value) => {
        target.offers = target.offers.map((offer) => {
          const val = value.replace(/-/g, ` `);
          if (val === offer.name.toLowerCase()) {
            offer.checked = true;
          }
          return offer;
        });
      },
      'date-start': (value) => {
        target.time.start = value;
      },
      'date-end': (value) => {
        target.time.end = value;
      },
      'destination': (value) => {
        target.destination = value;
      },
      'favorite': (value) => {
        target.isFavorite = value;
      },
    };
  }
}
