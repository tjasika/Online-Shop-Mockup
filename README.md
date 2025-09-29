# Online Shop Mockup 🛍️
### Work in progress 🛠️
This is a full-stack e-commerce website mockup, built with **React.js** for frontend and **Node.js** for backend. I used **TailwindCSS** for styling and **MySQL Workbench** for the database.

## Tech Stack
#### Front-end
- React.js
- React Router DOM
- Axios for API calls
- TailwindCSS and Bootstrap Icons for styling
  
#### Back-end
- Node.js
- Express.js
- **Modules:** bcrypt, mysql2, express-session, CORS, dotenv 

#### Dev Tools
- nodemon
- MySQL Workbench

## Database
I started by creating a database in **mySQL workbench**. It consists of 7 main and 2 junction tables, as seen in the ER model below:
![Database ER model](github_assets/db.png)
For the sake of the project, the products, colors and sizes (as well as the junction tables) are *hard-coded* into the database. Since I didn't do role-based authentification, the app only works from a customer's perspective.

## Front-end (React.js)
The whole project is made up of 13 components. The main ones are:
- **App.jsx**
- **AppRoutes.jsx**
- **main.jsx**
The **AppRoutes** component connects all the other components together and passes global variables or functions to those that need them (e.g. the user). It also handles *routes* and navigating.
Every page has an **AppHeader.jsx** component, that displays the main title and nav buttons: *account, saved* and *cart* (but the 'saved' button is there only for display, it doesn't actually do anything).

#### Products Display and Filtering
The **App.jsx** component is basically the 'main page'. Each product is displayed in a **Card.jsx** component, which shows its primary image, name and price. When hovered, the image fades into the secondary image.
The filtering logic is the same as in my "Cocktails" project: made with **useState** and **useMemo** hooks.
![Screenshot of the project](github_assets/ss1.png)

