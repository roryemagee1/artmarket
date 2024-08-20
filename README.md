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

Anonymous Users are able to:
- View indie artists' paintings in an endless feed similar to the one used by Pinterest.
- View individual product pages and reviews for each piece of art.
- Add works of art to their shopping cart which is saved in local storage.
- Log in as an existing Account Users.
- Register as a new Account Users.

Account Users are able to:
- Complete all of the actions that Anonymous Users are able to complete.
- Submit and update their own ratings and reviews in the system.
- Save their shipping and payment order data to the system.
- Proceed through the checkout process simulating the purchase of a piece of art.
- Create an order in the MongoDB database.
- Simulate updating orders to "Paid" using a PayPal developer sandbox account.
- Update their account information.
- View their own past orders.

Administrators are able to:
- Complete all of the actions that Anonymous Users and Account Users are able to complete.
- View all past orders in the database.
- Update the statuses of orders to "Delivered".
- View, create, update, and delete all products and their information.
- View, update, and delete all Account Users and their information.

## Technology

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

### Backend Technology

- Node and Express
- Bcrypt
- MongoDB
- Mongoose
- Multer
- JSON Web Tokens

# Frontend Features by User Story

## 1. Landing Page

When the user arrives at the website, they are greeted by a product carousel made with React Awesome Slider and a beautiful collage of artwork inspired by Pinterest's landing page.

![](frontend/src/assets/artmarket-landingpage.gif)

From there, the user has the option to scroll down through the art feed as it procedurally loads 24 pieces of art at a time.  Once they find a piece of art that they like, they can click it to view it's Product Page.  

Each Product Page includes the work of art, details about it, a list of ratings and reviews by other users, and the option to leave a review or replace a previously submitted review.

If the user desires to purchase the piece, they may start the process by adding it to their cart.

## 2. User Authorization

Any user may add works of art to their cart and the application will save it to both local storage and the Redux store. However, if the user chooses to click the "Proceed to Checkout" button, the application redirects them to the Login Page where they have the option to either log in or register an account using a separate form.

<span style="display:flex;">
   <img src="frontend/src/assets/1-login-screenshot.png" alt="Login Page Screenshot"
   width="50%" height="auto" />
   <img src="frontend/src/assets/2-register-screenshot.png"" alt="Register Page Screenshot"
   width="50%" height="auto" />
</span>
<br />

As a developer, you may choose to create a new account or you can log in as johndoe@email.com with as password of 123456.  All passwords are saved to the database with Bcrypt and salted for added security. However, if you choose to make your own account, I recommend using a dummy email and 123456 as a default password rather than storing your own personal password or data in the database.

## 3. Checkout

Once the user has been authorized with a unique JSON Web Token (JWT) stored on the server, the application will redirect the user to the next steps in the checkout process: adding a shipping address and making a payment selection.  

In each section, input validation on both the frontend and the backend prevent the user from submitting invalid information.  If you put in invalid data, a Toastify message will indicate this to you in the uppder righthand corner of the screen.

As the user completes these steps, the breadcrumb at the top of the page will update to reflect their progress and allow navigation back to previous steps.

<span style="display:flex;">
   <img src="frontend/src/assets/3-shipping-screenshot.png" alt="Shipping Page Screenshot"
   width="50%" height="auto" />
   <img src="frontend/src/assets/4-payment-selection-screenshot.png"" alt="Payment Page Screesnhot"
   width="50%" height="auto" />
</span>
<br />

Once the user completes adding the information needed for the order, they arrive at the Place Order Page.  Here, they have the option to do one final look-over of the order before submitting it with the "Place Order" button.

<span style="display:flex;">
   <img src="frontend/src/assets/5-place-order-screenshot.png" alt="Place Order Page Screenshot"
   width="50%" height="auto" />
   <img src="frontend/src/assets/6-unpaid-order-screenshot.png"" alt="Unpaid Order Screenshot"
   width="50%" height="auto" />
</span>
<br />

Once the user submits the order, they are redirected to the Order Page where the unique Order ID is found in the URL.

## 4. Order Payment

On the Order Page, the user will see the option to pay with PayPal.  However, no actual transaction will occur if the user logs into PayPal because the PayPal API is currently set to sandbox mode.

<span style="display:flex;">
   <img src="frontend/src/assets/7-paypal-login-screenshot.png" alt="PayPal Login Screenshot"
   width="50%" height="auto" />
   <img src="frontend/src/assets/8-paypal-order-screenshot.png" alt="Paypal Payment Screenshot"
   width="50%" height="auto" />
</span>
<br />

As a developer, you may use the sanbox credentials in the screenshot above to simulate a payment.  Doing so will update the status of the order in the database to "Paid" and the frontend will update accordingly.

<span style="display:flex;">
   <img src="frontend/src/assets/9-paid-order-screenshot.png" alt="Paid Order Screenshot"
   width="50%" height="auto" />
   <img src="frontend/src/assets/10-user-profile-screenshot.png" alt="Profile Page Screenshot"
   width="50%" height="auto" />
</span>
<br />

If you would like to view any previous orders made by your active account or if you would like to update your account, you can click the dropdown next to your name in the navigation bar and select the Profile option. This will take you to your Profile Page as pictured above.

## 5. Administrator Order Functionality

In order to complete an order in the system, you must logout and login as an Administrator.  To do so, you may login as admin@email.com with the password 123456.

After logging in, click on the Admin dropdown in the navigation bar and select the "Orders" option. Then on the Order Page, find the order that you just put in and click the "Details" button.  This will navigate you to the Order Page again, but now you will have the option to complete delivery.

<span style="display:flex;">
   <img src="frontend/src/assets/11-order-list-screenshot.png" alt="Order List Page Screenshot"
   width="50%" height="auto" />
   <img src="frontend/src/assets/12-order-delivered-screenshot.png" alt="Order Delivered Screenshot"
   width="50%" height="auto" />
</span>
<br />

Once you click the delivery button, the application will update the delivery status in the system and update the frontend accordingly. Now if you log in as a user, the order will be marked as "Delivered" as if the user had received the product in real life.

## 6. Administrator Product Functionality

Adminstrator accounts also have the ability to add new products and edit existing products.
These options can be accessed by clicking on the Admin dropdown and selecting the "Products" option.  

The Product Page contains a table with each individual product and the option to edit each one or delete each one.  Additionally, a template product can be added by clicking the "Create Product" button at the top of the page.

<span style="display:flex;">
   <img src="frontend/src/assets/13-product-list-screenshot.png" alt="Product List Page Screenshot"
   width="50%" height="auto" />
   <img src="frontend/src/assets/14-edit-product-screenshot.png" alt="Product Edit Page Screenshot"
   width="50%" height="auto" />
</span>
<br />

If you click the edit product icon, it will take you to the Product Edit Page.  The form on this page allows the administrator to change all of the product's fields in the database, except for the database ID used in MongoDB.

It is worth noting here that there is an option to upload a new image for the selected product. This option is unique because it uses a 3rd party package called Multer to save the uploaded image directly to the Express server, instead of sending it to the MongoDB database.  

Due to the way form data is normally handled by HTML forms when doing API requests, sending images has to be done separately using a multipart data system.  Multer adds the option to easily send multipart data to the API where it can be correctly stored locally.  Instead of sending the image to the MongoDB database directly, the application sends a reference to where the image is stored locally in the production version of the project.  This reference is then used to retrieve the image when requested by the frontend.

## 7. Administrator User Functionality

Adminstrator accounts also have the ability to edit user accounts and administrator privileges.  These options can be accessed by clicking on the Admin dropdown and selecting the "Users" option to navigate to the User List Page.  

<span style="display:flex;">
   <img src="frontend/src/assets/15-user-list-screenshot.png" alt="User List Page Screenshot"
   width="50%" height="auto" />
   <img src="frontend/src/assets/16-edit-user-screenshot.png" alt="User Edit Page Screenshot"
   width="50%" height="auto" />
</span>
<br />

A form similar to the Product Edit Form is used on the User Edit Page to update users as desired.

## 8. Responsive Design

In this project, I made extensive use of vanilla CSS and media queries to make the page layout responsive.  The layout is dynamic enough to accomodate all common screen types as demonstrated by the gif below:

![](frontend/src/assets/responsive-design.gif) 

## Architecture

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

### Backend Architecture

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

1. ***config:*** contains the file for connecting to the mongoDB database with mongoose.
2. ***controllers:*** contains the controller functions for all Order, Product, and User REST API requests.
3. ***data:*** contains the JSON data for all stock products and users.
4. ***middleware:*** contains all of the middleware used throughout the backend.
5. ***models:*** contains the model Schemas for Orders, Products, Product Reviews, and Users.
6. ***routes:*** contains the route files for REST API requests involing Orders, Products, Image Uploads, and Users.
7. ***utils:*** contains miscellaneous helper functions used throughout the project.
8. ***seeder.js:*** the file for programmatically seeding the database with the default data using the command line.
9. ***server.js:*** the main server output file that initializes the server and brings everything together.

# Backend Features by REST API Routes

## Order Routes ('api/orders')

### Default Route ('/')
- ***POST:*** this protected route allows users to submit an array of product items to create an Order.
- ***GET:*** this administrator route allows the administrator to view a list of all orders in the system.

### /myorders
- ***GET:*** this protected route allows a user to view all of their own orders they've submitted.

### /:id
- ***GET:*** this protected route allows a user to get the detailed information for a specific order by ID.

### /:id/pay
- ***PUT:*** this protected route updates the order status of an order with a specific ID to paid once it has been paid through the PayPal test API.

### /:id/deliver
- ***PUT:*** this administrator route allows an administrator to set the order status of an order with a specific ID to delivered.

## Product Routes ('api/products')

### Default Route ('/')
- ***GET:*** this public route allows for anyone to get a list of products from the database.  It accepts "pageNumber" as a query and returns 24 products at a time.  It also accepts "keyword" as a query parameter used for filtering search results.
- ***POST:*** this administrator route allows for an administrator to create a new product.

### /top/:num
- ***GET:*** this public route returns the specified number of products according to their rating.

### /:id
- ***GET:*** this public route returns the product with the specified ID.
- ***PUT:*** this administrator route allows an administrator to update a product in the database.
- ***DELETE:*** this administrator route allows an administrator to delete a product in the database.

### /:id/reviews
- ***POST:*** this protected route allows a user to submit a review for an individual product or to replace their review if they already submitted one.

## User Routes ('api/users')

### Default Route ('/')
- ***POST:*** this public route registers a new user in the database.
- ***GET:*** this administrator route returns a list of all users in the system.

### /logout
- ***POST:*** this public route logs out the current user.

### /login
- ***POST:*** this public route logs a user in and authorizes a user to interact with protected routes and authorizes an administrator to use administrator routes.

### /profile
- ***GET:*** this protected route returns the user's profile settings.
- ***POST:*** this protected route allows a user to update the credentials found in their user profile.

### /:id
- ***GET:*** this administrator route allows an administrator to get a specific user's profile.
- ***DELETE:*** this administrator route allows an administrator to delete a specific user.
- ***PUT:*** this administrator route allows an administrator to update a specific user's profile.

## Upload Routes ('api/uploads')

### Default Route ('/')
- ***POST:*** this route is a special route used for submitting images to the server.  I opted to use a 3rd party package called [Multer](https://www.npmjs.com/package/multer) for uploading images.  Multer works by adding a files object to the request object so that images can be easily submitted in their own format, rather than the format expected by html form submissions.

### api/config

### /paypal
- ***GET:*** gets the client ID for use with the PayPal API.

## Artvolia Features Left to Implement

- ***Messaging:*** Messaging chat functionality implemented with Websockets.
- ***Testing:*** Unit Testing, End to End Testing with Mocha, Chai, and Cypress.
- ***Continuous Integration:*** Continuous Integration testing with GitHub Actions.
- ***Accessibility Upgrade:*** Full implementation of Aria Labels and Lighthouse testing.
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


