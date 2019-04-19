import moment from 'moment';

class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.time = {
      start: moment(data[`date_to`]).format(`h:mm`),
      end: moment(data[`date_from`]).format(`h:mm`),
    };
    this.duration = moment(data[`date_from`] - data[`date_to`]).format(`h:mm`);
    this.price = data[`base_price`];
    this.destination = data.destination.name;
    this.pictures = data.destination.pictures;
    this.description = data.destination.description;
    this.offers = data.offers.map((offer) => {
      return {
        name: offer.title,
        price: offer.price,
        checked: offer.accepted
      };
    });
    this.isFavorite = data[`is_favorite`];
  }
  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.time.start,
      'date_to': this.time.end,
      'offers': this.offers.map((offer) => {
        return {
          title: offer.name,
          price: offer.price,
          accepted: offer.checked
        };
      }),
      'price': this.price,
      'is_favorite': this.isFavorite,
      'destination': {
        name: this.destination,
        description: this.description,
        pictures: this.pictures
      },
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}

const Type = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳️`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sightseeing': `🏛️`,
  'restaurant': `🍴`,
};

export {ModelPoint, Type};
