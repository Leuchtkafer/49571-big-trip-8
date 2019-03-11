import makeFilter from './make-filter.js';
import {getPoint} from './data.js';
import {Point} from './point.js';
import {PointEdit} from './point-edit.js';
import {renderHtmlString, getRandom} from './utils.js';

const tripFilter = document.querySelector(`.trip-filter`);
const tripPoints = document.querySelector(`.trip-day__items`);
const filtersArray = [`everything`, `future`, `past`];

const renderFilters = filtersArray.map((item) => makeFilter(item)).join(``);

const createPoint = (data) => {
  const point = new Point(getPoint(data));
  const pointEdit = new PointEdit(getPoint(data));

  tripPoints.appendChild(point.render());

  point.onEdit = () => {
    pointEdit.render();
    tripPoints.replaceChild(pointEdit.element, point.element);
    point.unrender();
  };
  pointEdit.onSubmit = () => {
    point.render();
    tripPoints.replaceChild(point.element, pointEdit.element);
    pointEdit.unrender();
  };
};

const addPoints = (number) => {
  for (let i = 0; i < number; i++) {
    createPoint(getPoint());
  }
};

tripFilter.onclick = (event) => {
  if (event.target.className === `trip-filter__item`) {
    tripPoints.innerHTML = ``;
    addPoints(getRandom());
  }
};

renderHtmlString(tripFilter, renderFilters);
addPoints(getRandom());
