# ITCrowd

[Demo](https://spardutti.github.io/ITCrowd/#/)

## Description

RESTfull webapp, fully responsive (or at least i hope so!)  where the user can navigate and search for different products,
each product have a detailed view where it display all the product information.

As an Admin you will be able to create products and brands, delete and edit products.

The Front End was made with react-query for fetching, ChakraUi to style it, Axios to make requests,
Framer-Motion for animations, React Hot Toast for toasts messages, React Router, React Search, React Select.

Back End was made using Multer for file uploads, Cloudinary as image hosting, Passport and Jwt for authentication, BcryptJs for encription of passwords, MongoDb as the database.

The api workflow is: you log in as admin, create a brand (you cant create a product without a brand ), create a product.
As an user you can browse the products and search products by name.

The client is hosted in GitHub, and the server is hosted in Heroku.

## ENDPOINTS

The api expose various endpoints, as requested all are /products/${endpoint}

## GET ENDPOINTS

/brands - get a list of all brands

/get all products

/product/:id - get a specific product by its id

/user - get the current logged user info

## POST ENDPOINTS

/brand - creates a new brand

/product - creates a new product

/newuser - creates a new user
/localuser - log in user

## PUT ENDPOINTS

/product - updates selected product.

## DELETE ENDPOINTS

/delete/:id - deletes a specific product by its id

## Getting Started

To run the project locally:

1- clone the repo


1.1- ask the owner for the .env file


2- open the server folder in VsCode or any other IDE
```
npm i // to install all dependencies
npm run dev // to run the server locally
```
3 - open the client folder in VsCode or any other IDE
```
npm i // to install dependencies. this will take a while
npm start
```
if your browser does not open automatocally, navigate to  [localhost:3000](http://localhost:3000) (CTRL + CLICK ) to open in a new tab

