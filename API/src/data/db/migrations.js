import db from './index';
import seeders from './seeders';

const migrations = async () => {
  const tables = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS properties CASCADE;
    DROP TABLE IF EXISTS types CASCADE;
    DROP TABLE IF EXISTS status CASCADE;
    DROP TABLE IF EXISTS states CASCADE;
    DROP TABLE IF EXISTS purposes CASCADE;

    CREATE TABLE
    users(
        id serial PRIMARY KEY,
        email VARCHAR(60) NOT NULL UNIQUE,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        password VARCHAR(65) NOT NULL,
        phone_number VARCHAR NOT NULL,
        gender VARCHAR(7) NOT NULL,
        address VARCHAR NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT (false),
        created_on TIMESTAMP NOT NULL DEFAULT NOW()
    );
     
    CREATE TABLE
        status(
            id serial PRIMARY KEY,
            name VARCHAR NOT NULL
        );
    CREATE TABLE
        states(
            id serial PRIMARY KEY,
            name VARCHAR NOT NULL
        );
    CREATE TABLE
        types(
            id serial PRIMARY KEY,
            name VARCHAR NOT NULL
        ); 
    CREATE TABLE
        purposes(
            id serial PRIMARY KEY,
            name VARCHAR NOT NULL
        ); 
    CREATE TABLE
        properties(
            id serial PRIMARY KEY,
            owner INT NOT NULL,
            status INT NOT NULL DEFAULT (1),
            price float(2) NOT NULL,
            state INT NOT NULL,
            city VARCHAR NOT NULL,
            address VARCHAR NOT NULL,
            type INT NOT NULL,
            created_on TIMESTAMP NOT NULL DEFAULT NOW(),
            image_url VARCHAR NOT NULL,
            other_type VARCHAR NULL,
            image_name varchar NULL,
            image_id varchar NULL,
            description varchar NULL,
            updated_on TIMESTAMP NULL,
            purpose INT NULL DEFAULT (1),
            FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (status) REFERENCES status (id) ON DELETE CASCADE,
            FOREIGN KEY (state) REFERENCES states (id) ON DELETE CASCADE,
            FOREIGN KEY (type) REFERENCES types (id) ON DELETE CASCADE,
            FOREIGN KEY (purpose) REFERENCES purposes (id) ON DELETE CASCADE
        );`;
  /* eslint no-console : 0 */
  try {
    await db.query(tables);
    await db.query(seeders);
  } catch (err) {
    console.log(err.stack);
  }
};

(async () => {
  await migrations();
})();
