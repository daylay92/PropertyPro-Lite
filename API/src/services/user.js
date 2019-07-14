import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import UserModel from '../models/userModel';
import users from '../data/data-structure/users';
import db from '../data/db/index';

config();

class User extends UserModel {
  constructor(firstName, lastName, email, address, password, phone, isAdmin = false) {
    super(null, firstName, lastName, email, address, password, phone, isAdmin);
  }

  static async hashPassword(password) {
    try {
      const pass = await bcrypt.hash(password, 8);
      return pass;
    } catch (e) {
      throw e;
    }
  }

  static async verifyPassword(plain, hashed) {
    try {
      const isMatch = await bcrypt.compare(plain, hashed);
      return isMatch;
    } catch (e) {
      throw e;
    }
  }

  /* eslint camelcase: 0 */
  async save() {
    const {
      email,
      first_name,
      last_name,
      password,
      phone_number,
      address,
      is_admin
    } = this;
    const query = `INSERT INTO
            users(email, first_name, last_name, password, phone_number, address, is_admin)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            returning id`;
    const values = [
      email,
      first_name,
      last_name,
      password,
      phone_number,
      address,
      is_admin
    ];
    const {
      rows: [{ id }]
    } = await db.queryWithParams(query, values);
    if (!id) throw new Error('User was not Created');
    return { id, is_admin };
  }

  generateToken() {
    const { id, is_admin } = this;
    const token = jwt.sign(
      {
        data: { id, is_admin }
      },
      process.env.SIGN_SECRET,
      { expiresIn: '24h' }
    );
    return token;
  }

  static generateToken(id, is_admin) {
    const token = jwt.sign(
      {
        data: { id, is_admin }
      },
      process.env.SIGN_SECRET,
      { expiresIn: '24h' }
    );
    return token;
  }

  static async findByEmail(email) {
    const text = `SELECT * FROM users WHERE email= $1`;
    const value = [email];
    const {
      rows: [user]
    } = await db.queryWithParams(text, value);
    return user;
  }

  static async findById(userId) {
    const user = users.find(({ id }) => id === parseInt(userId, 10));
    return user;
  }
}

export default User;
