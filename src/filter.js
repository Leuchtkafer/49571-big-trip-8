import {createElement} from './utils.js';
import {Component} from './component.js';

const filters = [
  `everything`,
  `future`,
  `past`,
];

class Filter extends Component {
  constructor(data) {
    super();
    this._type = data.type || `noname`;
    this._amount = data.amount || 0;
    this._isChecked = data.isChecked || false;
    this._isDisabled = data.isDisabled || false;

    this._onFilter = this._onFilter.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilter(evt) {
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt);
    }
  }

  get template() {
    return `
      <span>
        <input
          type="radio"
          id="filter__${this._type}"
          name="filter"
          value="${this._type}"
          ${this._isChecked ? ` checked` : ``} 
          ${this._isDisabled ? `disabled` : ``}
        />
        <label class="trip-filter__item" for="filter-${this._type}">${this._type}</label>
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
    this._element.querySelector(`.trip-filter__item`).addEventListener(`click`, this._onFilter);
  }

  unbind() {
    this._element.querySelector(`.trip-filter__item`).removeEventListener(`click`, this._onFilter);
  }
}


export {Filter, filters};
