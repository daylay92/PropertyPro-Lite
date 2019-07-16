import { Pool } from 'pg';
import { config } from 'dotenv';

config();

class DB {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }

  async query(rawQuery) {
    const res = await this.pool.query(rawQuery);
    return res;
  }

  async queryWithParams(text, params) {
    const res = await this.pool.query(text, params);
    return res;
  }
}

const db = new DB();

/* eslint no-console : 0 */
db.pool.on('error', () => {
  console.log('some database error have occurred');
  process.exit(-1);
});

export default db;
