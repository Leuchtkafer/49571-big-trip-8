import {Point} from './point.js';
import {PointEdit} from './point-edit.js';
import {Filter, filters} from './filter.js';
import {createMoneyChart, createTransportChart, createSpendChart} from './statistic.js';
import moment from 'moment';
import {API} from './api.js';

const tripFilter = document.querySelector(`.trip-filter`);
const tripPoints = document.querySelector(`.trip-day__items`);

const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

const statistic = document.querySelector(`.statistic`);
const main = document.querySelector(`.main`);
const statisticMoney = document.querySelector(`.statistic__money`);
const statisticTransport = document.querySelector(`.statistic__transport`);
const statisticSpend = document.querySelector(`.statistic__time-spend`);
const statisticButton = document.querySelector(`.view-switch__item--stats`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const showStatistic = () => {
  main.classList.add(`visually-hidden`);
  statistic.classList.remove(`visually-hidden`);
  createMoneyChart(statisticMoney);
  createTransportChart(statisticTransport);
  createSpendChart(statisticSpend);
};

const commonFilteredTasks = {};

const BAR_HEIGHT = 55;
moneyCtx.height = BAR_HEIGHT * 6;
transportCtx.height = BAR_HEIGHT * 4;
timeSpendCtx.height = BAR_HEIGHT * 4;

statisticButton.addEventListener(`click`, showStatistic);

const filterTasks = (filter, filteredTasks) => {
  switch (filter) {
    case `past`:
      filteredTasks = filteredTasks.filter((it) => moment(it.date).format(`DD MMMM h:mm`) < moment(Date.now()).format(`DD MMMM h:mm`));
      break;
    case `future`:
      filteredTasks = filteredTasks.filter((it) => moment(it.date).format(`DD MMMM h:mm`) > moment(Date.now()).format(`DD MMMM h:mm`));
      break;
  }
  commonFilteredTasks[filter] = filteredTasks;
};

const renderFilters = (points) => {
  tripFilter.innerHTML = ``;
  let filteredTasks = points.slice();
  filters.forEach((filter, index) => {
    filterTasks(filter, filteredTasks);
    const filterComponent = new Filter({
      type: filter,
      isChecked: index === 0,
      isDisabled: commonFilteredTasks[filter].length === 0
    });
    tripFilter.appendChild(filterComponent.render());
    filterComponent.onFilter = () => {
      if (commonFilteredTasks[filter].length > 0) {
        renderPoints(commonFilteredTasks[filterComponent._type]);
      }
    };
  });

  renderPoints(commonFilteredTasks.everything);
};

const renderPoints = (data, destinations, offers) => {
  tripPoints.innerHTML = ``;
  data.forEach((point) => {
    const pointComponent = new Point(point);
    const pointEditComponent = new PointEdit(point);
    pointComponent.render();
    tripPoints.appendChild(pointComponent.element);
    pointEditComponent.allDestinations = destinations;
    pointEditComponent.allOffers = offers;

    pointComponent.onEdit = () => {
      pointEditComponent.render();
      tripPoints.replaceChild(pointEditComponent.element, pointComponent.element);
      pointComponent.unrender();
    };

    pointEditComponent.onSubmit = (newObject) => {
      pointEditComponent.block(`save`);

      load(true)
        .then(() => {
          pointEditComponent.unblock(`save`);
          pointComponent.update(point);
          pointComponent.render();
          tripPoints.replaceChild(pointComponent.element, pointEditComponent.element);
          pointEditComponent.unrender();
        })
        .catch(() => {
          pointEditComponent.shake();
          pointEditComponent.unblock(`save`);
        });

      point.type = newObject.type;
      point.time = newObject.time;
      point.date = newObject.date;
      point.destination = newObject.destination;
      point.price = newObject.price;
      point.offers = newObject.offers;
      point.isFavorite = newObject.isFavorite;

      api.updateTask({id: point.id, data: point.toRAW()})
        .then((newTask) => {
          pointComponent.update(newTask);
          pointComponent.render();
          tripPoints.replaceChild(pointComponent.element, pointEditComponent.element);
          pointEditComponent.unrender();
          renderFilters(data);
        });
    };

    pointEditComponent.onDelete = (({id}) => {
      pointEditComponent.block(`delete`);
      api.deleteTask({id})
        .then(() => api.getPoints())
        .then(getServerData)
        .then(renderPoints)
        .then(renderFilters)
        .catch(() => {
          pointEditComponent.shake();
          pointEditComponent.unblock(`delete`);
        });
    });
  });

  return data;
};

const load = (isSuccess) => {
  return new Promise((res, rej) => {
    setTimeout(isSuccess ? res : rej, 2000);
  });
};

const getServerData = () => {
  let destinations = [];
  let offers = [];
  api.getDestinations()
    .then((data) => {
      destinations = data;
      return destinations;
    });

  api.getOffers()
    .then((data) => {
      offers = data;
      return offers;
    });

  api.getPoints()
    .then((points) => {
      renderFilters(points);
      renderPoints(points, destinations, offers);
    })
    .catch(() => {
      tripPoints.innerText = `Something went wrong while loading your tasks. Check your connection or try again later`;
    });
};

getServerData();
