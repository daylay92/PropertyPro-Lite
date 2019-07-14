import bcrypt from 'bcrypt';

const seeders = `
    INSERT INTO users (first_name, last_name, email, password, phone_number, address)
    VALUES ('John', 'Doe', 'john.doe@gmail.com', '${bcrypt.hashSync(
      'johnny',
      8
    )}', '08064789498', '20, Church Street, Ikoyi, Lagos State');

    INSERT INTO users (first_name, last_name, email, password, phone_number, address)
    VALUES ('mary', 'Doe', 'mary.doe@gmail.com', '${bcrypt.hashSync(
      'marydoe',
      8
    )}', '08064789498', '20, Daniel Street, Ogudu, Lagos State');

    INSERT INTO users (first_name, last_name, email, password, phone_number, address, is_admin)
    VALUES ('Ayodele', 'Akinbohun', 'daylay92@yahoo.com', '${bcrypt.hashSync(
      'ayodele123',
      8
    )}', '08063805598', '90, Ania Street, Ojoka, Lagos State', true);
   

    INSERT INTO status (name)
    VALUES ('available'),
    ('sold'),
    ('rented');

    INSERT INTO purposes (name)
    VALUES ('for sale'),
    ('for rent');

    INSERT INTO types (name)
    VALUES ('duplex'),
    ('2 bedroom'),
    ('3 bedroom'),
    ('land'),
    ('studio flat'),
    ('mini flat'),
    ('twin duplex'),
    ('office apartment'),
    ('others');
   
    INSERT INTO states (name)
    VALUES ('Abia'),
  ('Adamawa'),
  ('Anambra'),
  ('Akwa Ibom'),
  ('Bauchi'),
  ('Bayelsa'),
  ('Benue'),
  ('Borno'),
  ('Cross River'),
  ('Delta'),
  ('Ebonyi'),
  ('Enugu'),
  ('Edo'),
  ('Ekiti'),
  ('Abuja'),
  ('Gombe'),
  ('Imo'),
  ('Jigawa'),
  ('Kaduna'),
  ('Kano'),
  ('Katsina'),
  ('Kebbi'),
  ('Kogi'),
  ('Kwara'),
  ('Lagos'),
  ('Nasarawa'),
  ('Niger'),
  ('Ogun'),
  ('Ondo'),
  ('Osun'),
  ('Oyo'),
  ('Plateau'),
  ('Rivers'),
  ('Sokoto'),
  ('Taraba'),
  ('Yobe'),
  ('Zamfara');


  INSERT INTO properties (owner, price, state, city, address, type, image_name, image_id, image_url, purpose, status)
    VALUES (1, 600000.0, 25, 'Ikoyi', '30, School Street', 5, 'o4yjhkbrmluwdzicmhih', 'o4yjhkbrmluwdzicmhih',
    'https://res.cloudinary.com/propertypro/image/upload/v1562334792/samples/test/mp0ba2f8izg3eefiehbl.jpg',
    2, 1),
    (2, 700000.0, 13, 'Ikeri', '10, Donga Street', 6, 'o4yjhkbrmluwdzicmhih', 'o4yjhkbrmluwdzicmhih',
    'https://res.cloudinary.com/propertypro/image/upload/v1562334790/samples/test/iifzizmkrle6coaswlap.jpg',
    2, 1),
    (1, 723000.0, 29, 'Aroje', '5, Donga Street', 4, 'o4yjhkbrmluwdzicmhih', 'o4yjhkbrmluwdzicmhih',
    'https://res.cloudinary.com/propertypro/image/upload/v1562334792/samples/test/mp0ba2f8izg3eefiehbl.jpg',
    2, 1),
    (1, 723000.0, 30, 'Iro', '5, Danke Street', 6, 'o4yjhkbrmluwdzicmhih', 'o4yjhkbrmluwdzicmhih',
    'https://res.cloudinary.com/propertypro/image/upload/v1562334792/samples/test/mp0ba2f8izg3eefiehbl.jpg',
    2, 1),
    (2, 776400.0, 30, 'yolab', '5, yejuh Street', 5, 'o4yjhkbrmluwdzicmhih', 'o4yjhkbrmluwdzicmhih',
    'https://res.cloudinary.com/propertypro/image/upload/v1562334792/samples/test/mp0ba2f8izg3eefiehbl.jpg',
    2, 1),
    (2, 723000.0, 30, 'yolab', '5, Ania Street', 2, 'o4yjhkbrmluwdzicmhih', 'o4yjhkbrmluwdzicmhih',
    'https://res.cloudinary.com/propertypro/image/upload/v1562334792/samples/test/mp0ba2f8izg3eefiehbl.jpg',
    2, 1),
    (1, 123000.0, 6, 'Delop', '5, Olatunji Street', 2, 'o4yjhkbrmluwdzicmhih', 'o4yjhkbrmluwdzicmhih',
    'https://res.cloudinary.com/propertypro/image/upload/v1562334792/samples/test/mp0ba2f8izg3eefiehbl.jpg',
    2, 1);
`;

export default seeders;
