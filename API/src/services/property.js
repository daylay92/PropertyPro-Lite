import PropertyModel from '../models/propertyModel';
import properties from '../data/data-structure/properties';
import UserServices from './user';

export default class Property extends PropertyModel {
  constructor(
    id = null,
    owner,
    price,
    state,
    city,
    address,
    type,
    imageName,
    imageId,
    imageUrl,
    purpose,
    status = 'Available',
    otherType = null
  ) {
    super(
      id,
      owner,
      price,
      state,
      city,
      address,
      type,
      imageName,
      imageId,
      imageUrl,
      purpose,
      status,
      otherType
    );
  }

  /* eslint camelcase : 0 */
  async save() {
    const oldLength = properties.length;
    const {
      id,
      owner,
      price,
      state,
      city,
      address,
      type,
      imageName,
      imageId,
      image_url,
      purpose,
      status,
      created_on,
      otherType
    } = this;
    const newLength = properties.push({
      id,
      owner,
      price,
      state,
      city,
      address,
      type,
      imageName,
      imageId,
      image_url,
      purpose,
      status,
      created_on,
      otherType
    });
    const isSaved =
      newLength > oldLength ? true : new Error('Property was not saved');
    if (isSaved) return isSaved;
    throw isSaved;
  }

  static async findById(propId) {
    const property = properties.find(({ id }) => id === parseInt(propId, 10));
    return property;
  }

  static async fetchById(propertyId) {
    const property = await Property.findById(propertyId);
    if (!property) return property;
    const {
      id,
      status,
      type,
      state,
      city,
      address,
      price,
      created_on,
      image_url,
      purpose,
      otherType,
      owner
    } = property;
    const {
      email: ownerEmail,
      phoneNumber: ownerPhoneNumber
    } = await UserServices.findById(owner);
    return {
      id,
      status,
      type,
      state,
      city,
      address,
      price,
      created_on,
      image_url,
      ownerEmail,
      ownerPhoneNumber,
      purpose,
      otherType
    };
  }

  static updateType(
    { otherType: savedOthers, type: savedType },
    type,
    otherType
  ) {
    let newOtherType;
    let newType;
    switch (type) {
      case undefined:
        newOtherType = !otherType ? savedOthers : otherType;
        newType = savedType;
        break;
      case 'Others':
        newType = type;
        newOtherType = otherType;
        break;
      default:
        newType = type;
        newOtherType = null;
        break;
    }
    return {
      newOtherType,
      newType
    };
  }

  static async updateAndSave(property) {
    const propIndex = properties.findIndex(({ id }) => id === property.id);
    properties.splice(propIndex, 1, property);
  }

  static async deleteById(propertyId) {
    const propIndex = properties.findIndex(({ id }) => id === propertyId);
    const removed = properties.splice(propIndex, 1);
    const isDeleted = removed.length === 1 ? true : new Error('not deleted');
    if (isDeleted) return isDeleted;
    throw isDeleted;
  }

  static async fetchByType(queryObj) {
    const { type: mainType } = queryObj;
    const filteredProperties = properties.filter(
      ({ type }) => type.toLowerCase() === mainType.toLowerCase()
    );
    if (!filteredProperties.length) return false;
    const allProperties = filteredProperties.map(async property => {
      const {
        id,
        status,
        type,
        state,
        city,
        address,
        price,
        created_on,
        image_url,
        purpose,
        otherType,
        owner
      } = property;
      const {
        email: ownerEmail,
        phoneNumber: ownerPhoneNumber
      } = await UserServices.findById(owner);
      return {
        id,
        status,
        type,
        state,
        city,
        address,
        price,
        created_on,
        image_url,
        ownerEmail,
        ownerPhoneNumber,
        purpose,
        otherType
      };
    });
    const result = await Promise.all(allProperties);
    return result;
  }

  static async fetchAll() {
    const allProperties = properties.map(
      async ({
        id,
        status,
        type,
        state,
        city,
        address,
        price,
        created_on,
        image_url,
        purpose,
        otherType,
        owner
      }) => {
        const {
          email: ownerEmail,
          phoneNumber: ownerPhoneNumber
        } = await UserServices.findById(owner);
        return {
          id,
          status,
          type,
          state,
          city,
          address,
          price,
          created_on,
          image_url,
          ownerEmail,
          ownerPhoneNumber,
          purpose,
          otherType
        };
      }
    );
    const result = await Promise.all(allProperties);
    return result;
  }
}
