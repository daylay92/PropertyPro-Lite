import moment from 'moment';
import PropertyModel from '../models/propertyModel';
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
    const [stateId, statusId, typeId, purposeId] = await Property.generateAllRelationId(
      state,
      status,
      type,
      purpose
    );
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

  static async generateAllRelationId(state, status, type, purpose) {
    const stateID = Property.getRelationId('states', state);
    const statusID = Property.getRelationId('status', status);
    const typeID = Property.getRelationId('types', type);
    const purposeID = Property.getRelationId('purposes', purpose);
    const result = await Promise.all([stateID, statusID, typeID, purposeID]);
    return result;
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

  static async updatePrice(price, id) {
    const newPrice = parseFloat(price);
    const text = `UPDATE properties SET price = $1, updated_on = $3 WHERE id = $2
      RETURNING updated_on;
    `;
    const {
      rows: [{ updated_on }]
    } = await db.queryWithParams(text, [newPrice, id, moment()]);
    return updated_on;
  }

  static async markSoldOrRented(id, purpose, status) {
    const purposeId = Property.getRelationId('purposes', purpose);
    const statusId = Property.getRelationId('status', status);
    const [statusID, purposeID] = await Promise.all([statusId, purposeId]);
    const text = `UPDATE properties SET status = $1, purpose = $2, updated_on = $3
    WHERE id = $4 RETURNING updated_on
    `;
    const {
      rows: [{ updated_on }]
    } = await db.queryWithParams(text, [statusID, purposeID, moment(), id]);
    return updated_on;
  }

  static async update(valueArr, id) {
    const [purpose, state, status, type, ...others] = valueArr;
    const relationsId = await Property.generateAllRelationId(
      state,
      status,
      type,
      purpose
    );
    const text = `UPDATE  
    properties SET state = $1 , status = $2, type = $3, purpose = $4, price = $5, 
    city = $6, address = $7, other_type = $8, image_url = $9, image_id = $10, 
    image_name = $11, description = $12, updated_on = $13
   WHERE id = $14 RETURNING updated_on
    `;
    const values = [...relationsId, ...others, moment(), id];

    const {
      rows: [{ updated_on }]
    } = await db.queryWithParams(text, values);
    return updated_on;
  }

  static async findById(propId) {
    const text = `SELECT
    properties.id,
    properties.owner,
    status.name status,
    states.name state,
    properties.price,
    properties.city,
    properties.address,
    types.name "type",
    properties.created_on,
    properties.image_url,
    properties.other_type,
    properties.image_name,
    properties.image_id,
    properties.description,
    purposes.name purpose
 FROM
    properties
 INNER JOIN status ON status.id = properties.status
 INNER JOIN states ON states.id = properties.state
 INNER JOIN types ON types.id = properties.type
 INNER JOIN purposes ON purposes.id = properties.purpose
 WHERE properties.id = $1
 `;
    const {
      rows: [property]
    } = await db.queryWithParams(text, [propId]);
    return property;
  }

  static async fetchById(propertyId) {
    const text = `
    SELECT
    properties.id,
    status.name status,
	  types.name "type",
    states.name state,
    properties.city,
    properties.address,
	  properties.price,
    properties.created_on,
    properties.image_url,
    users.email owner_email,
	  users.phone_number owner_phone_number,
	  purposes.name purpose,
    properties.other_type,
    properties.description
 FROM
    properties
 INNER JOIN status ON status.id = properties.status
 INNER JOIN states ON states.id = properties.state
 INNER JOIN types ON types.id = properties.type
 INNER JOIN purposes ON purposes.id = properties.purpose
 INNER JOIN users ON users.id = properties.owner
 WHERE properties.id = $1
 `;
    const {
      rows: [property]
    } = await db.queryWithParams(text, [parseInt(propertyId, 10)]);
    return property;
  }

  static async deleteById(propertyId) {
    const text = `DELETE FROM properties WHERE id = $1 RETURNING id`;
    const {
      rows: [{ id }]
    } = await db.queryWithParams(text, [propertyId]);
    return id;
  }

  static async fetchByType(type) {
    const queryType = `SELECT id FROM types WHERE name = $1`;
    const { rows: row } = await db.queryWithParams(queryType, [type.toLowerCase()]);
    if (!row.length) return [];
    const [{ id }] = row;
    const text = `
    SELECT
    properties.id,
    status.name status,
	  types.name "type",
    states.name state,
    properties.city,
    properties.address,
	  properties.price,
    properties.created_on,
    properties.image_url,
    users.email owner_email,
	  users.phone_number owner_phone_number,
	  purposes.name purpose,
    properties.other_type,
    properties.description
 FROM
    properties
 INNER JOIN status ON status.id = properties.status
 INNER JOIN states ON states.id = properties.state
 INNER JOIN types ON types.id = properties.type
 INNER JOIN purposes ON purposes.id = properties.purpose
 INNER JOIN users ON users.id = properties.owner
 WHERE properties.type = $1
    `;
    const { rows } = await db.queryWithParams(text, [id]);
    return rows;
  }

  static async fetchAll() {
    const text = `
    SELECT
    properties.id,
    status.name status,
	  types.name "type",
    states.name state,
    properties.city,
    properties.address,
	  properties.price,
    properties.created_on,
    properties.image_url,
    users.email owner_email,
	  users.phone_number owner_phone_number,
	  purposes.name purpose,
    properties.other_type,
    properties.description
 FROM
    properties
 INNER JOIN status ON status.id = properties.status
 INNER JOIN states ON states.id = properties.state
 INNER JOIN types ON types.id = properties.type
 INNER JOIN purposes ON purposes.id = properties.purpose
 INNER JOIN users ON users.id = properties.owner
    `;
    const { rows } = await db.query(text);
    return rows;
  }
}
