# ArtMarket

## Overview

ArtMarket is a prototype fullstack ecommerce application designed to enable independent artists to feature, sell, and distribute their work online.

However, I do not intend to use the website for this stated purpose.  Instead, the real goal is to build a portfolio project that I can continuously add features to indefinitely.  That way I will always be building my skills as a developer while also having a well-documented code base showing my development over time.

## Deployment

Version 2.24 of the application is currently deployed at [artvolia.com](artvolia.com).

## Developer Environment Installation

Follow these steps to setup up the project on your local machine:

1. In your terminal, clone the repo.
   ```sh
   git clone git@github.com:roryemagee1/artmarket.git
   ```
2. Change the directory to the root directory.
   ```sh
   cd artmarket
   ```
3. Install NPM packages for the backend in the root directory.
   ```sh
   npm install
   ```
4. Change the directory to the frontend directory.
   ```sh
   cd frontend
   ```
5. Install NPM packages for the frontend in the frontend directory.
   ```sh
   npm install
   ```
6. In the frontend folder, start the vite development server on localhost:5173.
   ```sh
   npm run dev
   ```
7. Open a new tab in your terminal.
8. Return to the project's root directory and start the express development server on localhost:3000.
   ```sh
   cd ..
   npm start
   ```
9. Open [localhost:5173](localhost:5173) in a modern internet browser to view the project.

# Project Details

ArtMarket is based off of a project called [Myseum](https://github.com/roryemagee1/myseum), which I made while attending the Turing School of Software Design & Development.  Originally I worked on another version of the project titled [Artvolia](https://github.com/roryemagee1/artvolia-fe).  

But after realizing the project used too many new technologies at once and was too large to complete as designed within a year, I decided to start over with a much more streamlined "Minimum Viable Product" version, which became ArtMarket.  However, the longterm goal is still to incrementally add features to ArtMarket until it evolves into Artvolia.

## Design Concept

Here is the original design prototype for Artvolia, a social media ecommerce application for independent artists:

![Artvolia Design](frontend/src/assets/artvolia-artmarket-design.png)
![Artvolia Design Zoomed In](frontend/src/assets/artvolia-artmarket-zoomed-in.png)

## ArtMarket Minimum Viable Product (MVP)

### Frontend Architecture

The frontend has the following folder structure:

<pre>
frontend
├── public
│   └── images
│     
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── slices
│   ├── types
│   ├── utils
│   ├── App.tsx
│   ├── index.css
│   ├── store.ts
│   ├── main.tsx
│   └── ... configuration files
├── README.md
└── ... configuration files
</pre>

1. ***public/images:*** contains the publicly available stock images used for the products in the project.
2. ***src/assets:*** contains the images used as functional assets within the project and the README.md file.
3. ***src/components:*** contains all of the non-page-speicific React components with each component in a folder bearing the same name if the component also has CSS file associated with it.
4. ***src/pages:*** contains the individual page components which each have their own route in main.tsx.
5. ***src/slices:*** contains the individual slice files for Redux Toolkit functionality.
6. ***src/types:*** contains the type files for Typescript.
7. ***src/utils:*** contains miscellaneous helper functions used throughout the project.
8. ***App.tsx:*** contains the styling for the vieport, including the Header, body, and Footer.
9. ***index.css:*** contains global style classes and CSS variables.
10. ***store.ts:*** contains the code for configuring the Redux Toolkit store.
11. ***main.tsx:*** the main output file containing the React Router DOM routes used in the project.

### Frontend Technology

- React and Vite
- Redux Toolkit
- TypeScript
- PayPal

### React Component Libraries

- React Router
- React Loading
- React Awesome Slider
- React Helmet
- React Icons
- React Toastify

# Frontend Features by User Story

## Backend Architecture

The backend has a standard Model View Controller (MVC) structure.  Here is the full folder structure:

<pre>
backend
├── config
├── controllers
├── data
├── middleware
├── models
├── routes
├── utils
├── seeder.js
├── server.js
└── ... configuration files
</pre>

1. ****config:**** contains the file for connecting to the mongoDB database with mongoose.
2. ****controllers:**** contains the controller functions for all Order, Product, and User REST API requests.
3. ****data:**** contains the JSON data for all stock products and users.
4. ****middleware:**** contains all of the middleware used throughout the backend.
5. ****models:**** contains the model Schemas for Orders, Products, Product Reviews, and Users.
6. ****routes:**** contains the route files for REST API requests involing Orders, Products, Image Uploads, and Users.
7. ****utils:**** contains miscellaneous helper functions used throughout the project.
8. ****seeder.js:**** the file for programmatically seeding the database with the default data using the command line.
9. ****server.js:**** the main server output file that initializes the server and brings everything together.

### Backend Technology

- Node and Express
- Bcrypt
- Mongoose
- Multer
- JSON Web Tokens

# Backend Features by REST API Routes

## Order Routes

### api/orders

#### Default Route ('/')
- ***POST:*** this protected route allows users to submit an array of product items to create an Order.
- ***GET:*** this administrator route allows the administrator to view a list of all orders in the system.

#### /myorders
- ***GET:*** this protected route allows a user to view all of their own orders they've submitted.

#### /:id
- ***GET:*** this protected route allows a user to get the detailed information for a specific order by ID.

#### /:id/pay
- ***PUT:*** this protected route updates the order status of an order with a specific ID to paid once it has been paid through the PayPal test API.

#### /:id/deliver
- ***PUT:*** this administrator route allows an administrator to set the order status of an order with a specific ID to delivered.

### api/products

#### Default Route ('/')
- ***GET:*** this public route allows for anyone to get a list of products from the database.  It accepts "pageNumber" as a query and returns 24 products at a time.  It also accepts "keyword" as a query parameter used for filtering search results.
- ***POST:*** this administrator route allows for an administrator to create a new product.

#### /top/:num
- ***GET:*** this public route returns the specified number of products according to their rating.

#### /:id
- ***GET:*** this public route returns the product with the specified ID.
- ***PUT:*** this administrator route allows an administrator to update a product in the database.
- ***DELETE:*** this administrator route allows an administrator to delete a product in the database.

#### /:id/reviews
- ***POST:*** this protected route allows a user to submit a review for an individual product or to replace their review if they already submitted one.

### api/users

#### Default Route ('/')
- ***POST:*** this public route registers a new user in the database.
- ***GET:*** this administrator route returns a list of all users in the system.

#### /logout
- ***POST:*** this public route logs out the current user.

#### /login
- ***POST:*** this public route logs a user in and authorizes a user to interact with protected routes and authorizes an administrator to use administrator routes.

#### /profile
- ***GET:*** this protected route returns the user's profile settings.
- ***POST:*** this protected route allows a user to update the credentials found in their user profile.

#### /:id
- ***GET:*** this administrator route allows an administrator to get a specific user's profile.
- ***DELETE:*** this administrator route allows an administrator to delete a specific user.
- ***PUT:*** this administrator route allows an administrator to update a specific user's profile.

### api/uploads

#### Default Route ('/')
- ***POST:*** this route is a special route used for submitting images to the server.  I opted to use a 3rd party package called [Multer](https://www.npmjs.com/package/multer) for uploading images.  Multer works by adding a files object to the request object so that images can be easily submitted in their own format, rather than the format expected by html form submissions.

### api/config

#### /paypal
- ***GET:*** gets the client ID for use with the PayPal API.

## Artvolia Features Left to Implement

- ***Messaging:*** Messaging chat functionality implemented with Websockets.
- ***Testing:*** Unit Testing, End to End Testing with Mocha, Chai, and Cypress.
- ***Continuous Integration:*** Continuous Integration testing with GitHub Actions.
- ***User Stores:*** Individual user store functionality and administration.
- ***Public Profiles:*** Individual public user profile pages for featuring art.
- ***Social Media:*** Social Media functionality, including liking, commenting, and subscribing.
- ***Notifications:*** Notification functionality for all user site interactions.
- ***Email:*** Email integration for account information and password reset functionality.
- ***Privacy & Customization Settings:*** Comprehensive Settings functionality including profile customization and privacy.
- ***SEO:*** Search engine optimization.
- ***New Homepage:*** New homepage mortar grid layout and scroll system.
- ***Even More:*** Even more things not currently listed will be added in the future as well.

## Credits

<img src="https://avatars.githubusercontent.com/u/92283709?v=4" alt="Rory Magee GitHub"
 width="150" height="auto" />
 <h3>Project Creator: Rory Magee<h3>

 [LinkedIn](https://www.linkedin.com/in/roryemagee/)
 [GitHub](https://github.com/roryemagee1)

 ### Pexel Artists

 All art in this project was created by artists hosting their works as stock images for free on [Pexels.com](https://www.pexels.com/search/painting/).  Here are the names of all the artists whose art was featured:

 - Paul Blenkhorn
 - Rasmindo Sitepu
 - Angela Hutchinson
 - Giovanni Varden
 - Jung Hua Liu
 - Refar Gotohp
 - Suzy Hazelwood
 - Zak Sheuskaya
 - Steve Johnson
 - Scott Webb
 - Jot Singh
 - Elina Araja
 - Craig Adderley
 - Trace Hudson
 - Sharon Snider
 - Jon Bagnato
 - Kseniya Lapteva
 - Anni Roenkae

 ### Special Thanks

Special thanks to the work of the following Youtube coders:

- Wesley at ByteGrad
- Brad Traversy at Traversy Media
- Maximilian Schwarzmüller

Special thanks to my friend [Ron Pascual Jr.](https://www.linkedin.com/in/ronpascualjr/) for helping with Quality Assurance testing.


