import faker from 'faker';

const properties = [
  {
    id: 1,
    owner: 1,
    price: 600000.0,
    state: 'Lagos',
    city: 'Ojota',
    address: '20, Ojuka Street',
    type: 'Studio Flat',
    image_url: faker.image.imageUrl(),
    purpose: 'For Rent',
    status: 'Available',
    created_on: new Date().toLocaleString()
  },
  {
    id: 2,
    owner: 2,
    price: 700000.0,
    state: 'Ondo',
    city: 'Akure',
    address: '20, Donga Street',
    type: 'Mini Flat',
    image_url: faker.image.imageUrl(),
    purpose: 'For Rent',
    status: 'Available',
    created_on: new Date().toLocaleString()
  }
];
export default properties;
