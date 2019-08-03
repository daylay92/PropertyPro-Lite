import User from '../services/user';
import Helpers from '../utils/helpers';

class Auth {
  /* eslint camelcase: 0 */
  static async signUp(req, res) {
    const { first_name, last_name, address, email, password, phone_number } = req.body;
    try {
      const pass = await User.hashPassword(password);
      const user = new User(first_name, last_name, email, address, pass, phone_number);
      const { id, is_admin } = await user.save();
      const token = User.generateToken(id, is_admin);
      res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
      return res.status(201).json({
        status: 'success',
        data: {
          token,
          id,
          first_name,
          last_name,
          email
        }
      });
    } catch (e) {
      return Helpers.serverInternalError(res);
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      let isMatch;
      if (user) isMatch = await User.verifyPassword(password, user.password);
      if (isMatch) {
        const { id, first_name, last_name, is_admin } = user;
        const token = User.generateToken(id, is_admin);
        res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
        return res.status(200).json({
          status: 'success',
          data: {
            token,
            id,
            first_name,
            last_name,
            email
          }
        });
      }
      return res.status(401).json({
        status: '401 Unauthorized',
        error: 'Invalid login credentials'
      });
    } catch (e) {
      return Helpers.serverInternalError(res);
    }
  }
}
export default Auth;
