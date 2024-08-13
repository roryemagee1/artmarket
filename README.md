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

## ArtMarket MVP Features

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

1. **public/images:** contains the publicly available stock images used for the products in the project.
2. **src/assets:** contains the images used as functional assets within the project and the README.md file.
3. **src/components:** contains all of the non-page-speicific React components with each component in a folder bearing the same name if the component also has CSS file associated with it.
4. **src/pages:** contains the individual page components which each have their own route in main.tsx.
5. **src/slices:** contains the individual slice files for Redux Toolkit functionality.
6. **src/types:** contains the type files for Typescript.
7. **src/utils:** contains miscellaneous helper functions used throughout the project.
8. **App.tsx:** contains the styling for the vieport, including the Header, body, and Footer.
9. **index.css:** contains global style classes and CSS variables.
10. **store.ts:** contains the code for configuring the Redux Toolkit store.
11. **main.tsx:** contains the React Router DOM routes used in the project.

### Frontend Features by User Story

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

### Backend Architecture

### Backend Features by REST API Routes

### Backend Technology

- Node and Express
- Bcrypt
- Mongoose
- Multer
- JSON Web Tokens

## Artvolia Features Left to Implement

- New grid layout
- Messaging chat functionality implemented with Websockets
- Unit Testing, End to End Testing with Mocha, Chai, and Cypress
- Continuous Integration testing with GitHub Actions
- Individual user store functionality and administration
- Individual public user profile pages for featuring art
- Social Media functionality, including liking, commenting, and subscribing
- Notification functionality for all user site interactions
- Email integration for account information and password reset functionality
- Comprehensive Settings functionality including profile customization and privacy
- Search engine optimization

### Features

### Technology

## Credits

<img src="https://avatars.githubusercontent.com/u/92283709?v=4" alt="Rory Magee GitHub"
 width="150" height="auto" />

