export default class User {
  constructor(id, firstName, lastName, email, address, password, phone, isAdmin) {
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.address = address;
    this.phone_number = phone;
    this.password = password;
    this.is_admin = isAdmin;
  }
}
