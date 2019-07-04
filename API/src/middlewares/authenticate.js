import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default class Authenticate {
  static async verify(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(401).json({
        status: '401 Unauthorized',
        error: 'Access token is Required'
      });
      return;
    }

    jwt.verify(token, process.env.SIGN_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({
          status: '401 Unauthorized',
          error: 'Access token is Invalid'
        });
      const { data } = decoded;
      req.auth = { ...data };
      return next();
    });
  }
}
