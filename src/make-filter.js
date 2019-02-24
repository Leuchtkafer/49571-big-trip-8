export default (filter, amount = Math.floor(Math.random() * 10), isChecked = false, isDisabled = false) => `
        <input
          type="radio"
          id="filter__${filter}"
          name="filter"
          value="${filter}"
          ${isChecked ? ` checked` : ``} 
          ${isDisabled || amount <= 0 ? ` disabled` : ``} 
        />
        <label class="trip-filter__item" for="filter-${filter}">${filter}</label>`;
