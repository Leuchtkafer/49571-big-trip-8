import makeFilter from './make-filter.js';
import makePoint from './make-point.js';
import {getPoint} from './point.js';

const tripFilter = document.querySelector(`.trip-filter`);
const tripPoints = document.querySelector(`.trip-day__items`);
const pointNumber = 7;
const filtersArray = [`everything`, `future`, `past`];

const renderFilters = filtersArray.map((item) => makeFilter(item)).join(``);

const renderHtmlString = (parentNode, htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, `text/html`);
  const fragment = document.createDocumentFragment();
  html.body.childNodes.forEach((node) => {
    fragment.appendChild(node);
  });
  parentNode.appendChild(fragment);
};

const renderPoint = (number = Math.floor(Math.random() * 10)) => {
  const randomPointsArray = [];
  while (randomPointsArray.length < number) {
    randomPointsArray.push(makePoint(getPoint()));
  }
  return randomPointsArray;
};

const uploadPoints = () => {
  tripPoints.innerHTML = ` `;
  renderHtmlString(tripPoints, renderPoint().join(``));
};

tripFilter.onclick = (event) => {
  if (event.target.className === `trip-filter__item`) {
    uploadPoints();
  }
};

renderHtmlString(tripFilter, renderFilters);
renderHtmlString(tripPoints, renderPoint(pointNumber).join(` `));
