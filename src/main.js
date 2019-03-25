import {getPoint, filters} from './data.js';
import {Point} from './point.js';
import {PointEdit} from './point-edit.js';
import {renderHtmlString, getRandom} from './utils.js';
import {Filter} from './filter.js';
import {createMoneyChart, createTransportChart, createSpendChart} from './statistic.js';
import moment from 'moment';
// import flatpickr from 'flatpickr';

const tripFilter = document.querySelector(`.trip-filter`);
const tripPoints = document.querySelector(`.trip-day__items`);

const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

const statistic = document.querySelector(`.statistic`);
const main = document.querySelector(`.main`);
// const statisticMoneyWrap = document.querySelector(`.statistic__item--money`);
// const statisticTransportWrap = document.querySelector(`.statistic__item--transport`);
// const statisticSpendWrap = document.querySelector(`.statistic__item--time-spend`);
const statisticMoney = document.querySelector(`.statistic__money`);
const statisticTransport = document.querySelector(`.statistic__transport`);
const statisticSpend = document.querySelector(`.statistic__time-spend`);
const statisticButton = document.querySelector(`.view-switch__item--stats`);

const showStatistic = () => {
  main.classList.add(`visually-hidden`);
  statistic.classList.remove(`visually-hidden`);
  createMoneyChart(statisticMoney);
  createTransportChart(statisticTransport);
  createSpendChart(statisticSpend);
};

const BAR_HEIGHT = 55;
moneyCtx.height = BAR_HEIGHT * 6;
transportCtx.height = BAR_HEIGHT * 4;
timeSpendCtx.height = BAR_HEIGHT * 4;

statisticButton.addEventListener(`click`, showStatistic);

const renderFilters = (data, points) => {
  tripFilter.innerHTML = ``;
  data.forEach((filter) => {
    const filterComponent = new Filter(filter);
    tripFilter.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      switch (filterComponent._type) {
        case `everything`:
          return renderPoints(points);

        case `future`:
          return renderPoints(points.filter((it) => it.date > moment(Date.now()).format(`DD MMMM`)));

        case `past`:
          return renderPoints(points.filter((it) => it.date < moment(Date.now()).format(`DD MMMM`)));
      }
      return renderPoints(points);
    };
    return renderPoints(points);
  });
};

const deletePoint = (points, i) => {
  points.splice(i, 1);
  return renderPoints(points);
};

const addPoints = (number) => {
  let points = [];
  for (let i = 0; i < number; i++) {
    points.push(getPoint(i));
  }
  return points;
};

const renderPoints = (points) => {
  tripPoints.innerHTML = ``;
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const pointComponent = new Point(point);
    const pointEditComponent = new PointEdit(point);
    pointComponent.render();
    tripPoints.appendChild(pointComponent.element);

    pointComponent.onEdit = () => {
      pointEditComponent.render();
      tripPoints.replaceChild(pointEditComponent.element, pointComponent.element);
      pointComponent.unrender();
    };

    pointEditComponent.onSubmit = (newObject) => {
      point.type = newObject.type;
      point.time = newObject.time;
      point.date = newObject.date;
      point.price = newObject.price;
      point.offers = newObject.offers;
      pointComponent.update(point);
      pointComponent.render();
      tripPoints.replaceChild(pointComponent.element, pointEditComponent.element);
      pointEditComponent.unrender();
    };

    pointEditComponent.onDelete = () => {
      deletePoint(points, i);
      pointEditComponent.unrender();
    };
  }
};

let points = addPoints(getRandom());
renderHtmlString(tripFilter, renderFilters(filters, points));
