import Property from '../services/property';

export default class PropertyController {
  /* eslint camelcase: 0 */
  static async getAllProperties(req, res) {
    try {
      let allProperties;
      const isQueryExist = Object.keys(req.query).length;
      if (isQueryExist) allProperties = await Property.fetchByType(req.query);
      else allProperties = await Property.fetchAll();
      if (!allProperties)
        return res.status(404).json({
          status: '404 Not Found',
          error: "The property adverts you request aren't available"
        });
      return res.status(200).json({
        status: 'Success',
        data: allProperties
      });
    } catch (e) {
      return res.status(500).json({
        status: '500 Server Interval Error',
        error: 'Something went wrong while processing your request, Do try again'
      });
    }
  }

  static async getProperty(req, res) {
    const {
      params: { propertyId }
    } = req;
    try {
      const property = await Property.fetchById(propertyId);
      if (!property)
        return res.status(404).json({
          status: '404 Not Found',
          error: 'The property advert you have requested is not available'
        });
      return res.status(200).json({
        status: 'Success',
        data: property
      });
    } catch (e) {
      return res.status(500).json({
        status: '500 Server Interval Error',
        error: 'Something went wrong while processing your request, Do try again'
      });
    }
  }

  static async postProperty(req, res) {
    try {
      const {
        body: {
          price,
          status = 'available',
          city,
          address,
          type,
          other_type = null,
          image_url,
          image_id = null,
          image_name = null,
          purpose,
          state,
          description = null
        },
        auth: { id: owner }
      } = req;
      let reason = !purpose ? 'for sale' : purpose;
      reason = status === 'rented' ? 'for rent' : reason;
      const newPrice = parseFloat(price);
      const property = new Property(
        owner,
        newPrice,
        state,
        city,
        address,
        type,
        image_name,
        image_id,
        image_url,
        reason,
        status,
        other_type,
        null,
        description
      );
      const { created_on, id } = await property.save();
      return res.status(201).json({
        status: 'success',
        data: {
          id,
          status,
          type,
          state,
          city,
          address,
          price: newPrice,
          created_on,
          image_url,
          purpose: reason,
          image_name,
          other_type,
          description
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: '500 Server Interval Error',
        error: 'Something went wrong while processing your request, Do try again'
      });
    }
  }

  static async updateProperty(req, res) {
    try {
      const { prop } = req;
      const { price, state, city, address, type, status, purpose, otherType } = req.body;
      prop.purpose = prop.purpose === purpose || !purpose ? prop.purpose : purpose;
      prop.price =
        prop.price === parseFloat(price) || !parseFloat(price)
          ? prop.price
          : parseFloat(price);
      prop.state = prop.state === state || !state ? prop.state : state;
      prop.status = prop.status === status || !status ? prop.status : status;
      prop.city = prop.city === city || !city ? prop.city : city;
      prop.address = prop.address === address || !address ? prop.address : address;
      const { newOtherType, newType } = Property.updateType(prop, type, otherType);
      prop.type = newType;
      prop.otherType = newOtherType;
      await Property.updateAndSave(prop);
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
        error: 'Something went wrong while processing your request, Do try again'
      });
    }
  }

  static async markProperty(req, res) {
    try {
      const { prop: property } = req;
      const { available } = req.query;
      if (available === 'true') property.status = 'Available';
      if (!available)
        property.status = property.purpose === 'For Rent' ? 'Rented' : 'Sold';
      await Property.updateAndSave(property);
      return res.status(200).json({
        status: 'Success',
        data: {
          id: property.id,
          status: property.status,
          type: property.type,
          state: property.state,
          city: property.city,
          address: property.address,
          price: property.price,
          created_on: property.created_on,
          image_url: property.image_url,
          imageName: property.imageName,
          purpose: property.purpose,
          otherType: property.otherType
        }
      });
    } catch (e) {
      return res.status(500).json({
        status: '500 Server Interval Error',
        error: 'Something went wrong while processing your request, Do try again'
      });
    }
  }

  static async deleteProperty(req, res) {
    const {
      prop: { id: propertyId }
    } = req;
    try {
      await Property.deleteById(propertyId);
      return res.status(200).json({
        status: 'Success',
        data: {
          message: `Successfully deleted property of id : ${propertyId}`
        }
      });
    } catch (e) {
      return res.status(500).json({
        status: '500 Server Interval Error',
        error: 'Something went wrong while processing your request, Do try again'
      });
    }
  }
}
