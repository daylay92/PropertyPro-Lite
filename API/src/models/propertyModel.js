export default class Property {
  constructor(
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
    otherType,
    description,
    updatedOn,
    createdOn
  ) {
    this.id = id;
    this.owner = owner;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type = type;
    this.image_name = imageName;
    this.image_id = imageId;
    this.image_url = imageUrl;
    this.purpose = purpose;
    this.created_on = createdOn;
    this.other_type = otherType;
    this.description = description;
    this.updated_on = updatedOn;
  }
}
