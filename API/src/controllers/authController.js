import User from '../services/user';

class Auth {
  /* eslint camelcase: 0 */
  static async signUp(req, res) {
    const { first_name, last_name, address, email, password, phone_number } = req.body;
    try {
      const pass = await User.hashPassword(password);
      const user = new User(first_name, last_name, email, address, pass, phone_number);
      const { id, is_admin } = await user.save();
      const token = User.generateToken(id, is_admin);
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
      return res.status(500).json({
        status: '500 Server Interval Error',
        error: 'Something went wrong while processing your request, Do try again'
      });
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
      return res.status(500).json({
        status: '500 Server Interval Error',
        error: 'Something went wrong while processing your request, Do try again'
      });
    }
  }
}
export default Auth;
