# Online Shop Mockup 🛍️
### Work in progress 🛠️
This is a full-stack e-commerce website mockup, built with **React.js** for frontend and **Node.js** for backend. I used **TailwindCSS** for styling and **MySQL Workbench** for the database.

## Tech Stack
### Front-end
- React.js
- React Router DOM
- Axios for API calls
- TailwindCSS and Bootstrap Icons for styling
  
### Back-end
- Node.js
- Express.js
- **Modules:** bcrypt, mysql2, express-session, CORS, dotenv 

#### Dev Tools
- nodemon
- MySQL Workbench

## Database
I started by creating a database in **mySQL workbench**. It consists of 8 main and 2 junction tables, as seen in the ER model below:
![Database ER model](/github_assets/db.png)  
The *cart-items* table was added later, when I remembered I needed to keep the cart persistent and linked to the user.
For the sake of the project, the products, colors and sizes (as well as the junction tables) are *hard-coded* into the database. Since I didn't do role-based authentification, the app only works from a customer's perspective.

## Front-end (React.js)
The whole project is made up of 13 components. The main ones are:
- **App.jsx**
- **AppRoutes.jsx**
- **main.jsx**  
The **AppRoutes** component connects all the other components together and passes global variables or functions to those that need them (e.g. the user). It also handles *routes* and navigating.
Every page has an **AppHeader.jsx** component, that displays the main title and nav buttons: *account, saved* and *cart* (but the 'saved' button is there only for display, it doesn't actually do anything).

### Products Display and Filtering
The **App.jsx** component is basically the 'main page'. Each product is displayed in a **Card.jsx** component, which shows its primary image, name and price. When hovered, the image fades into the secondary image.  
The filtering logic is the same as in my "Cocktails" project: made with **useState** and **useMemo** hooks. (https://github.com/tjasika/Cocktails)  
I do not own the images, I downloaded them from Pinterest and stored them in a cloud with **Cloudinary**, then just stored those links in my database for the image src.
![Screenshot of the project](/github_assets/ss1.png)

### Details Page
The **Details.jsx** displays the product in detail, showing its image, name, price, as well as available colors and sizes, from which the user chooses.
![Screenshot of the project](/github_assets/ss3.png)
(I still need to add the feature of displaying multiple images)

### Shopping Cart
**ShoppingCart.jsx** displays the items the user placed in the cart. They can be added, removed, or have their quantity changed. Of course, quantity cannot go below zero. The user can also only open the shopping cart page if they're logged in - if they're not, it either sends an alert or redirects them to the login page.  
On the right side I have displayed the money amounts: *subtotal, discount, shipping fee* and in the bottom the *total* amount. The user can add a coupon code to get a discount - this doesn't save in the database, I only made it for the fun of it, to make it more 'real-life' like. The codes are hard-coded inside the component.  
![Screenshot of the project](/github_assets/ss4.png)

The styling and the design are definitely not the most UX friendly - it was not my main focus for this project.

## Back-end (Node.js with Express)
I put all the API routes in a **server.js** file, like I am used to from previous full-stack projects.
### Products
- *GET /api/products* - gets all the products with their categories
- *GET /api/products/:id* - gets single product details
- *GET /api/products/:id/sizes* - gets all available sizes for one product
- *GET /api/products/:id/colors* - gets all available colors for one product

### Authentification
![Screenshot of the project](/github_assets/ss2.png)
- *POST /api/signup* - registers new user into the database (password is hashed), checks if it already exists
- *POST /api/login* - logs the user in, checks for matching password, starts session
- *POST /api/logout* - logs the user out, destroys session
- *GET /api/check-session* - checks if the user is logged in

### Shopping Cart
- *POST /api/cart* - inserts the selected item in the cart (if already there, it updates quantity)
- *DELETE /api/cart/:cartItemId* - removes item from the cart
- *PUT /api/cart/:cartItemId* - updates item quantity
- *DELETE /api/cart/clear/:customerId* - clears cart after checkout


## Next Steps ➡️
The next step is enabling the shopping cart and checkout.

  


