import {createElement} from './utils.js';
import {Component} from './component.js';

const sorts = [
  `event`,
  `time`,
  `price`,
];

class Sort extends Component {
  constructor(data) {
    super();
    this._type = data.type || `noname`;
    this._isChecked = data.isChecked || false;
    this._onSort = this._onSort.bind(this);
  }

  set onSort(fn) {
    this._onSort = fn;
  }

  _onSort(evt) {
    if (typeof this._onSort === `function`) {
      this._onSort(evt);
    }
  }

  get template() {
    return `
      <span>
        <input 
          type="radio" 
          name="trip-${this._type}" 
          id="sorting-${this._type}" 
          value="${this._type}" 
          ${this._isChecked ? ` checked` : ``} 
        >
        <label class="trip-sorting__item trip-sorting__item--${this._type}" for="sorting-${this._type}">${this._type}</label>
      </span>`.trim();
  }

  render(checked) {
    if (checked) {
      this._isChecked = checked;
    }
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    this._element.querySelector(`.trip-sorting__item`).addEventListener(`click`, this._onSort);
  }

  unbind() {
    this._element.querySelector(`.trip-sorting__item`).removeEventListener(`click`, this._onSort);
  }
}


export {Sort, sorts};
