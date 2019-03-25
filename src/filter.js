import {createElement} from './utils.js';
import {Component} from './component.js';

export class Filter extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._amount = data.amount;
    this._isChecked = data.checked;
    this._isDisabled = data.disabled;

    this._onFilter = this._onFilter.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilter() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
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
          ${this._isDisabled || this._amount <= 0 ? ` disabled` : ``} 
        />
        <label class="trip-filter__item" for="filter-${this._type}">${this._type}</label>
        </span>`.trim();
  }

  render() {
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
