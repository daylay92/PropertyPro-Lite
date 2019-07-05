import Helpers from '../utils/helpers';
import properties from '../data/data-structure/properties';
import Property from '../services/property';

export default class PropertyController {
  /* eslint camelcase: 0 */
  static async postProperty(req, res) {
    try {
      const { price, state, city, address, type, purpose } = req.body;
      const owner = req.auth.id;
      const { url, originalname, public_id } = req.file;
      const id = await Helpers.createId(properties);
      let { status } = req.body;
      let { otherType } = req.body;
      otherType = !otherType ? null : otherType;
      status = !status ? 'Available' : status;
      const newPrice = parseFloat(price);
      const property = new Property(
        id,
        owner,
        newPrice,
        state,
        city,
        address,
        type,
        originalname,
        public_id,
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
          price: newPrice,
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

  static async updateProperty(req, res) {
    try {
      const { prop } = req;
      const { price, state, city, address, type, purpose } = req.body;
      prop.purpose =
        prop.purpose === purpose || !purpose ? prop.purpose : purpose;
      prop.price =
        prop.price === parseFloat(price) || !parseFloat(price)
          ? prop.price
          : parseFloat(price);
      prop.state = prop.state === state || !state ? prop.state : state;
      prop.city = prop.city === city || !city ? prop.city : city;
      prop.address =
        prop.address === address || !address ? prop.address : address;
      prop.type = prop.type === type || !type ? prop.type : type;
      const propIndex = properties.findIndex(({ id }) => id === prop.id);
      properties.splice(propIndex, 1, prop);
      return res.status(200).json({
        status: 'Success',
        data: {
          id: prop.id,
          status: prop.status,
          type: prop.type,
          state: prop.state,
          city: prop.city,
          address: prop.address,
          price: prop.price,
          created_on: prop.created_on,
          image_url: prop.image_url,
          imageName: prop.imageName,
          purpose: prop.purpose,
          otherType: prop.otherType
        }
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
