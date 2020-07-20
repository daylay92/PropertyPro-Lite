# PropertyPro-Lite
[![Website daylay92.github.io/PropertyPro-Lite/UI](https://img.shields.io/website-up-down-green-red/https/daylay92.github.io/PropertyPro-Lite/UI.svg)](https://daylay92.github.io/PropertyPro-Lite/UI/)
[![Build Status](https://travis-ci.org/daylay92/PropertyPro-Lite.svg?branch=develop)](https://travis-ci.org/daylay92/PropertyPro-Lite)
[![Coverage Status](https://coveralls.io/repos/github/daylay92/PropertyPro-Lite/badge.svg)](https://coveralls.io/github/daylay92/PropertyPro-Lite)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b0434f953d7534ab7c6d/test_coverage)](https://codeclimate.com/github/daylay92/PropertyPro-Lite/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/b0434f953d7534ab7c6d/maintainability)](https://codeclimate.com/github/daylay92/PropertyPro-Lite/maintainability)


Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

## Required Features

- Users can sign up
- User can sign in
- User (agent) can post a property advert
- User (agent) can update the details of a property advert
- User (agent) can mark his/her posted advert as sold
- User (agent) can delete a property advert
- User can view all properties adverts
- User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc
- User can view a specific property advert

## Getting Started

To get a copy of this project up and running on your local machine for testing and development, you would need to have a minimum of the underlisted prerequisities installed on your local machine

### Prerequisites

You must have

1. [Node.js](https://nodejs.org/) (_v8.12.0 or higher_) and npm (_6.4.1 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

2. GIT bash

### Installing

To get started, clone this repository on your local machine using the following steps:

Open your terminal and navigate to the folder you want the project to be and enter the the following commands:

```
$ git clone -b develop https://github.com/daylay92/PropertyPro-Lite.git
$ cd PropertyPro-Lite
$ npm install
```

Create a `.env` file and enter values for the `SIGN_SECRET`,`CLOUDINARY_CLOUD_NAME`,`CLOUDINARY_API_KEY`,  `CLOUDINARY_API_SECRET` environment variables, this variables infers the following: 

- `SIGN_SECRET` -  JWT secret for signing access token
- `CLOUDINARY_CLOUD_NAME` & `CLOUDINARY_API_SECRET` & `CLOUDINARY_API_KEY` -  Cloudinary credentials for storing uploaded images

## Starting the dev server

```bash
npm run dev
```

## Running the tests

```bash
npm test
```
## Test the endpoints

The application can be tested locally through localhost on port 3000 or through the live [url](https://propertypro-l-ite.herokuapp.com/) using postman

1. Run the application while postman is open
2. Go to postman and test against the endpoints below with the required property:-

### Endpoints to test

Method        | Endpoint      | Enable a user to: |
------------- | ------------- | ---------------
POST  | api/v1/auth/signup  | Create user account  |
POST  | api/v1/auth/signin  | Login a user |
POST  | api/v1/property  | Create a property advert |
PATCH  | api/v1/property/<:property-id>  | Update property data |
PATCH  | api/v1/property/<:property-id>/sold  | Mark a property as sold so users know it’s no longer available |
DELETE  | api/v1/property/<:property-id>  | Delete a property advert |
GET  | api/v1/property/ | Get all property adverts |
GET  | api/v1/property?type =​ propertyType  | Get all property advertisement offering a specific type of property (e,g 2 Bedroom, Mini Flat, etc) |
GET  | api/v1/property/<:property-id>  | View a specific property advert |


## Technologies

- Node JS
- Express
- Mocha & Chai
- ESLint
- Babel
- Travis CI
- Code Climate & Coveralls

## Pivotal Tracker board
You can find the stories that comprises all the features of the Project at [Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2354238)


## Template UI

You can see a hosted version of the template at [GitHub Pages](http://daylay92.github.io/PropertyPro-Lite/UI/)

## API

The API is currently in version 1 (v1) and it is hosted on heroku at [Base URL](https://propertypro-l-ite.herokuapp.com/api/v1/)

## API Documentation
You can find the documentation here [API DOCS](https://propertypro-l-ite.herokuapp.com/api/v1/api-docs)

## Author

- **Ayodele Akinbohun** - _Initial work_ - [Andela](https://andela.com/)


## Acknowledgements

* [Andela](https://andela.com/)

* [Google](https://google.com/)

