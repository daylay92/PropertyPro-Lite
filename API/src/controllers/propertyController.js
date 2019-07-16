import Property from '../services/property';
import Helpers from '../utils/helpers';

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
      return Helpers.serverInternalError(res);
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
      return Helpers.serverInternalError(res);
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
          other_type,
          description
        }
      });
    } catch (err) {
      return Helpers.serverInternalError(res);
    }
  }

  static async updatePrice(req, res) {
    const {
      params: { propertyId },
      body: { price },
      prop
    } = req;
    try {
      const updated_on = await Property.updatePrice(price, parseInt(propertyId, 10));
      if (!updated_on) return Helpers.serverInternalError(res);
      return res.status(200).json({
        status: 'success',
        data: {
          id: propertyId,
          status: prop.status,
          type: prop.type,
          state: prop.state,
          city: prop.city,
          address: prop.address,
          price: parseFloat(price),
          created_on: prop.created_on,
          image_url: prop.image_url,
          purpose: prop.purpose,
          other_type: prop.other_type,
          description: prop.description,
          updated_on
        }
      });
    } catch (err) {
      return Helpers.serverInternalError(res);
    }
  }

  static async updateProperty(req, res) {
    try {
      const { body, prop } = req;
      const propertyValues = [
        body.purpose || prop.purpose,
        body.state || prop.state,
        body.status || prop.status,
        body.type || prop.type,
        parseFloat(body.price) || prop.price,
        body.city || prop.city,
        body.address || prop.address,
        body.other_type || prop.other_type,
        body.image_url || prop.image_url,
        body.image_id || prop.image_id,
        body.image_name || prop.image_name,
        body.description || prop.description
      ];
      const updated_on = await Property.update(propertyValues, prop.id);
      if (!updated_on) return Helpers.serverInternalError(res);
      return res.status(200).json({
        status: 'success',
        data: {
          id: prop.id,
          status: propertyValues[2],
          type: propertyValues[3],
          state: propertyValues[1],
          city: propertyValues[5],
          address: propertyValues[6],
          price: propertyValues[4],
          created_on: prop.created_on,
          image_url: propertyValues[8],
          purpose: propertyValues[0],
          other_type: propertyValues[7],
          description: propertyValues[11],
          updated_on
        }
      });
    } catch (e) {
      return Helpers.serverInternalError(res);
    }
  }

  static async markProperty(req, res) {
    try {
      const { prop: property } = req;
      const { available } = req.query;
      if (available === 'true') property.status = 'available';
      if (!available)
        property.status = property.purpose === 'for rent' ? 'rented' : 'sold';
      const updated_on = await Property.markSoldOrRented(
        property.id,
        property.purpose,
        property.status
      );
      if (!updated_on) return Helpers.serverInternalError(res);
      return res.status(200).json({
        status: 'success',
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
          purpose: property.purpose,
          other_type: property.other_type,
          description: property.description,
          updated_on
        }
      });
    } catch (e) {
      return Helpers.serverInternalError(res);
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
