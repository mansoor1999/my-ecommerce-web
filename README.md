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

## Acces the web globally deployed in the Vercel

Deployed link:-- 
```
https://my-ecommerce-website-app.vercel.app/

```


