# E-Commerce Full Stack Application

## Overview

This is a full-stack e-commerce application developed using Next.js for the frontend, Node.js with Express.js for the backend (REST API), and PostgreSQL as the database. The project allows users to sign up as sellers or buyers, with sellers being able to add, edit, and delete products, while buyers can search for products and add them to their cart.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Libraries**: Prisma ORM, NextAuth.js for authentication, Tailwind CSS for styling
- **Deployment**: (Optional: Specify AWS or other hosting service if applicable)

## Features

- **User Authentication**: Users can sign up and log in as either sellers or buyers.
- **Seller Functionality**: Sellers can add, edit, or delete products.
- **Buyer Functionality**: Buyers can search for products, add products to their cart, and remove products from the cart.
- **Input Validation**: User inputs are validated and sanitized before being stored in the database.
- **Responsive Design**: The application is responsive and works across various devices and screen sizes.
- **Error Handling**: Proper error handling is implemented for various scenarios.

## Prerequisites

- Node.js (v16.x or later)
- PostgreSQL (v12.x or later)
- npm or yarn
- postman (for api testing)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mansoor1999/my-ecommerce-web.git
cd my-ecommerce-web
cd my-e-commerce
```

# Install server dependencies
```
npm install
```
npm install
###  Set Up the Database
Make sure PostgreSQL is running on your machine.
Create a database named mydb.
   Update the .env file in the root directory with your PostgreSQL connection string:
   ```DATABASE_URL="postgresql://<username>:<password>@localhost:5432/mydb"```
## Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
## Start the Development Servers
Start the server:
```bash
npm run dev
```
## Access the Application locally by running this with proper installation
```
Open your browser and navigate to http://localhost:3000
```
## Authentication
POST /auth/signup: Sign up a new user (buyer or seller).
POST /auth/login: Log in an existing user.
##Seller Endpoints
POST /productss: Add a new product (Only for sellers).
PUT /products/:productId: Edit an existing product (Only for sellers).
DELETE /products/:productId: Delete a product (Only for sellers).
##Buyer Endpoints
GET /productss: Get a list of products (search by name or category).
POST /cart/add: Add a product to the cart.
DELETE /cart/remove/:productId: Remove a product from the cart.
DELETE /cart/empty: Empty the cart.

## Pushing the code in GitHub
To push your e-commerce project to GitHub, follow these steps. If you haven't already created a GitHub repository, you'll need to do that first. Then, use the following commands:

1. Initialize a Git Repository (if you haven't already)
Navigate to the root directory of your project and initialize a new Git repository:

```
git init
```
2. Add All Files to the Staging Area
Add all your project files to the staging area:
```
git add .
```
3. Commit Your Changes
Commit the changes with a descriptive message:
```
git commit -m "Initial commit: Set up e-commerce full-stack application"
```
5. Create a New Repository on GitHub
Go to GitHub.
Click on the New button to create a new repository.
Name your repository (e.g., ecommerce-fullstack-app).
Optionally, add a description.
Choose Public or Private based on your preference.
Click Create repository.
6. Link Your Local Repository to GitHub
Copy the remote URL from your newly created GitHub repository and add it as a remote in your local repository:

```
git remote add origin https://github.com/your-username/ecommerce-fullstack-app.git
```
Replace your-username with your GitHub username.

6. Push Your Changes to GitHub
Push the committed changes to the GitHub repository:

```
git push -u origin main
```
If your default branch is named master (instead of main), use:
```
git push -u origin master

```
7. Verify Your Changes on GitHub
Go to your GitHub repository page. You should see all your project files uploaded there.

Optional Git Commands for Further Updates
To add more changes later:

```
git add .
git commit -m "Descriptive message about the changes"
git push
```
To create a new branch and push changes:

```
git checkout -b new-feature
git add .
git commit -m "Add new feature"
git push -u origin new-feature
```

## Acces the web globally deployed in the Vercel

Deployed link:-- 
```
https://my-ecommerce-website-app.vercel.app/

```

###Summary




