import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import UserModel from '../models/userModel';
import users from '../data/data-structure/users';

config();

class User extends UserModel {
  constructor(
    id,
    firstName,
    lastName,
    gender,
    email,
    address,
    password,
    phone,
    isAdmin = false
  ) {
    super(
      id,
      firstName,
      lastName,
      gender,
      email,
      address,
      password,
      phone,
      isAdmin
    );
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
  save() {
    const currentNoOfUsers = users.length;
    const {
      id,
      email,
      first_name,
      last_name,
      password,
      phoneNumber,
      address,
      gender,
      is_admin
    } = this;
    const newNoOfUsers = users.push({
      id,
      email,
      first_name,
      last_name,
      password,
      phoneNumber,
      address,
      gender,
      is_admin
    });
    return newNoOfUsers > currentNoOfUsers;
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
}

export default User;
