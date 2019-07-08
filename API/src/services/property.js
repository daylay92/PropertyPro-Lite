import PropertyModel from '../models/propertyModel';
import properties from '../data/data-structure/properties';

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
    const property = properties.find(prop => prop.id === parseInt(propId, 10));
    return property;
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
    try {
      const propIndex = properties.findIndex(({ id }) => id === property.id);
      properties.splice(propIndex, 1, property);
    } catch (e) {
      throw e;
    }
  }
}
