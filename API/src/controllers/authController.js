import User from '../services/user';
import Helpers from '../utils/helpers';
import users from '../data/data-structure/users';

class Auth {
  /* eslint camelcase: 0 */
  static async signUp(req, res) {
    const {
      first_name,
      last_name,
      address,
      gender,
      email,
      password,
      phoneNumber
    } = req.body;
    try {
      const id = await Helpers.createId(users);
      const pass = await User.hashPassword(password);
      const user = new User(
        id,
        first_name,
        last_name,
        gender,
        email,
        address,
        pass,
        phoneNumber
      );
      const isSaved = user.save();
      if (isSaved) {
        const token = user.generateToken();
        return res.status(201).json({
          status: 'Success',
          data: {
            token,
            id,
            first_name,
            last_name,
            email
          }
        });
      }
      return res.status(500).json({
        status: '500 Server Interval Error',
        error:
          'Something went wrong while processing your request, Do try again'
      });
    } catch (e) {
      return res.status(500).json({
        status: '500 Server Interval Error',
        error:
          'Something went wrong while processing your request, Do try again'
      });
    }
  }
}
export default Auth;
