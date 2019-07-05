import Helpers from '../utils/helpers';
import properties from '../data/data-structure/properties';
import Property from '../services/property';

export default class PropertyController {
  /* eslint camelcase: 0 */
  static async postProperty(req, res) {
    try {
      const { price, state, city, address, type, purpose } = req.body;
      const owner = req.auth.id;
      const { url, originalname } = req.file;
      const id = await Helpers.createId(properties);
      let { status } = req.body;
      let { otherType } = req.body;
      otherType = !otherType ? null : otherType;
      status = !status ? 'Available' : status;
      const property = new Property(
        id,
        owner,
        price,
        state,
        city,
        address,
        type,
        originalname,
        url,
        purpose,
        status,
        otherType
      );
      const { created_on } = property;
      await property.save();
      return res.status(201).json({
        status: 'Success',
        data: {
          id,
          status,
          type,
          state,
          city,
          address,
          price,
          created_on,
          image_url: url,
          imageName: originalname,
          purpose,
          otherType
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: '500 Server Interval Error',
        error:
          'Something went wrong while processing your request, Do try again'
      });
    }
  }
}
