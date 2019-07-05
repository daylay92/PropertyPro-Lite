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
    imageUrl,
    purpose,
    status,
    otherType
  ) {
    this.id = id;
    this.owner = owner;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type = type;
    this.imageName = imageName;
    this.image_url = imageUrl;
    this.purpose = purpose;
    this.created_on = new Date().toLocaleString();
    this.otherType = otherType;
  }
}
