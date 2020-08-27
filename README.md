# ShoesMarket

## Project setup
```
npm install
```

## The application

## The technologies

1. [ExpressJs] (https://expressjs.com/), a JavaScript web framework for Node.js;

2. [Handlebars] (https://handlebarsjs.com/), Minimal templating on steroids;


### Idea

Shoes market helps everyone to buy and sell shoes.

### Design

The app is fully responsible built with Handlebars. Layout looks good on laptops / desktops. The app has good ui and great ux!

### Endpoints

#### Users

* GET

   * `/profile`

   * `/register`
    
   * `/login`

* POST

    * `/register`
    
    * `/login`

    * `/logout`

#### Market

* GET

    * `/create`

    * `/details/:id`

* POST

    * `/edit/:id`

    * `/delete/:id`


### Functionalities

#### Guests (not logged in) are allowed to 

* home

* register

* login

#### Users (logged in) are allowed to 

* logout

* create Shoe

* details Shoe

* delete Shoe / those which they created

* edit Shoe / those which they created

* profile page with bought shoes

* buy Shoe / those which they are not created
