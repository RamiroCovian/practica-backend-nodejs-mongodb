# Práctica WEB Backend Node.js-MongoDB

## Deploy

### Install dependencies

```sh
npm install
```
On first deploy you can run next command to empty the database and create initial data:

```js
npm run initiDB
```
## Start

To start in production mode:
```sh
npm start
```

To start in development mode:
```sh
npm run dev
```
## Test
### Login
On the home screen, you will see a welcome message and a link to enter and log in.
'/login -> You must enter one of the following email and password
```js
Admin -> Email: 'admin@gmail.com', Password: '1234'
User -> Email: 'user1@gmail.com', Password: '1234'
```
Once logged in, each user will be able to view their products for sale.

### New Product
If you want to upload a new product for sale as a test, you must use one of the following paths for the images or, failing that, you must upload the paths of the images you have in your GitHub repository:
```js

T-shirt image
path: 'https://raw.githubusercontent.com/RamiroCovian/practica-backend-nodejs-mongodb/main/nodepop/resources/tshirt_girl.jpg'

Soccer shorts image 
path: 'https://raw.githubusercontent.com/RamiroCovian/practica-backend-nodejs-mongodb/main/nodepop/resources/short_football.jpg'

Ballet Shoes image 
path: 'https://raw.githubusercontent.com/RamiroCovian/practica-backend-nodejs-mongodb/main/nodepop/resources/shoes_ballet.jpg'

Soccer cleats image 
path:'https://raw.githubusercontent.com/RamiroCovian/practica-backend-nodejs-mongodb/main/nodepop/resources/shoes_under.jpg'
```