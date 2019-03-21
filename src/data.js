import moment from 'moment';

const getPoint = () => ({
  type: getRandomType(),
  city: [
    `Amsterdam`,
    `Geneva`,
    `Chamonix`,
    `Geneva`,
    `Barcelona`,
    `Turin`,
    `Tampere`,
  ],
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  offers: new Set([
    `Add luggage`,
    `Switch to comfort class`,
    `Add meal`,
    `Choose seats`,
    `keks`,
  ]),
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`,
  date: moment(Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).format(`DD MMMM`),
  time: moment(Math.floor(Math.random() * 24)).format(`hh:mm`),
  price: Math.floor(Math.random() * 20),
});

const Type = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳️`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sight-seeing': `🏛️`,
  'restaurant': `🍴`,
};

const getRandomType = () => {
  return Object.keys(Type)[Math.floor(Math.random() * Object.keys(Type).length)];
};

export {getPoint, Type};
