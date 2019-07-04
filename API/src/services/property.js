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
    imageUrl,
    purpose,
    status
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
      imageUrl,
      purpose,
      status
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
      image_url,
      purpose,
      status,
      created_on
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
      image_url,
      purpose,
      status,
      created_on
    });
    const isSaved =
      newLength > oldLength ? true : new Error('Property was not saved');
    if (isSaved) return isSaved;
    throw isSaved;
  }
}
