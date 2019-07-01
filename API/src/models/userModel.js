export default class User {
  constructor(
    id,
    firstName,
    lastName,
    gender,
    email,
    address,
    password,
    phone,
    isAdmin = false
  ) {
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.gender = gender;
    this.email = email;
    this.address = address;
    this.phoneNumber = phone;
    this.password = password;
    this.is_admin = isAdmin;
  }
}
