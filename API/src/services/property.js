import PropertyModel from '../models/propertyModel';
import properties from '../data/data-structure/properties';
import UserServices from './user';
import db from '../data/db/index';

export default class Property extends PropertyModel {
  constructor(
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
    otherType,
    updatedOn,
    description
  ) {
    super(
      null,
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
      otherType,
      description,
      updatedOn,
      null
    );
  }

  /* eslint camelcase : 0 */
  async save() {
    const {
      owner,
      price,
      state,
      city,
      address,
      type,
      image_name,
      image_id,
      image_url,
      purpose,
      status,
      other_type,
      description
    } = this;
    const stateID = Property.getRelationId('states', state);
    const statusID = Property.getRelationId('status', status);
    const typeID = Property.getRelationId('types', type);
    const purposeID = Property.getRelationId('purposes', purpose);
    const [stateId, statusId, typeId, purposeId] = await Promise.all([
      stateID,
      statusID,
      typeID,
      purposeID
    ]);
    const text = `INSERT INTO 
    properties(owner, status, price, state, city, address, type, image_name, image_url
    , image_id, other_type, description,purpose)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning id, created_on;
    `;
    const values = [
      owner,
      statusId,
      parseFloat(price),
      stateId,
      city,
      address,
      typeId,
      image_name,
      image_url,
      image_id,
      other_type,
      description,
      purposeId
    ];
    const {
      rows: [user]
    } = await db.queryWithParams(text, values);
    return user;
  }

  static async getRelationId(Table, name) {
    const text = `SELECT * FROM ${Table} WHERE name = $1`;
    const value = [name];
    const { rows } = await db.queryWithParams(text, value);
    if (rows[0]) return rows[0].id;
    const query = `
        INSERT INTO ${Table}
        (name)
        VALUES($1) returning *;
      `;
    const param = [name];
    const {
      rows: [{ id }]
    } = await db.queryWithParams(query, param);
    return id;
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

  static updateType({ otherType: savedOthers, type: savedType }, type, otherType) {
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
