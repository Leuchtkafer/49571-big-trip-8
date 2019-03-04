export default (point) => `<article class="trip-point">
          <i class="trip-icon">${point.type[Object.keys(point.type)[Math.floor(Math.random() * Object.keys(point.type).length)]]}</i>
          <h3 class="trip-point__title">${Object.keys(point.type)[Math.floor(Math.random() * Object.keys(point.type).length)]}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${point.time}</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
          <ul class="trip-point__offers">
                ${[...point.offers].splice(Math.floor(Math.random() * 5), 2).map((it) => `<li>
              <button class="trip-point__offer">${it} +&euro;&nbsp;20</button>
            </li>`).join(``)}
          </ul>
        </article>`;
