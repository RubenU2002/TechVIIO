# Backend Documentation

## Register users
Path to register users: http://localhost:5000/register
Method type post: You must send a JSON object with the structure `{ "email": "user", "password": "password" }`. The content type must be `application/json`.

## Login users
Path to login users: http://localhost:5000/login
Method type post: You must send a JSON object with the structure `{ "email": "user", "password": "password" }`. The content type must be `application/json`.
The response will be a JSON object with the structure `{ "token": "<JWT_token>" }`. This token must be used in the header of the requests to the protected routes.

## Get Products
Path to get products: http://localhost:5000/products
Method type get: You must send the token in the header of the request. The response will be a JSON object with the structure `{ "products": [ { "id": 1, "name": "product", "price": 10.0, "stock": 10 }, ... ] }`.

## Get Product filtered by between price range
Path to get products filtered by price range: http://localhost:5000/products?min_price=0&max_price=10
Method type get: You must send the token in the header of the request. The response will be a JSON object with the structure `{ "products": [ { "id": 1, "name": "product", "price": 10.0, "stock": 10 }, ... ] }`.

## Get Product by name
Path to get products by name: http://localhost:5000/products?name=product
Method type get: You must send the token in the header of the request. The response will be a JSON object with the structure `{ "products": [ { "id": 1, "name": "product", "price": 10.0, "stock": 10 }, ... ] }`.

## Steps to run the backend
- Run the backend with nodemon:
1. Enter the backend folder.
2. Install the dependencies with `pip install`.
3. Run the backend with `nodemon index.js`.
4. The backend will be running in the port 5000.

- Run the backend with docker-compose:
1. Run the command `docker-compose up --build` in the backend folder.
2. The backend will be running in the port 5000.

# Frontend Documentation

## Register users
Path to register users: http://localhost:3000/register

## Login users
Path to login users: http://localhost:3000/login

## HomePage
Path to home page: http://localhost:3000/home

## SearchPage
Path to search page: http://localhost:3000/search

## Steps to run the frontend
- Run the frontend with npm:
1. Enter the frontend folder.
2. Install the dependencies with `npm install`.
3. Run the frontend with `npm start`.
4. The frontend will be running in the port 3000.

- Run the frontend with docker-compose:
1. Run the command `docker-compose up --build` in the frontend folder.
2. The frontend will be running in the port 3000.
