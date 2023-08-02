# React NestJS Movies DB Application

This repository contains a full-stack TypeScript application built with <a href="https://react.dev/">React</a> and <a href="https://nestjs.com/">NestJS</a> , using <a href="https://www.prisma.io/">Prisma</a> as the ORM to interact with a  <a href="https://www.postgresql.org/">PostgreSQL</a> database. The application offers a range of features, including user authentication with login and sign-up functionalities. Users can also utilize The Movie Database <a href="https://www.themoviedb.org/">(TMDB)</a> API to search for movies and access detailed information about them.

The highlight of the application is the ability for users to manage their own list of movies. Once logged in, users can add, edit, and delete movies from their personalized collection. They have the option to create new entries manually or utilize information from TMDB to add movies based on their preferences.

Key Features:

- User Authentication: Secure login and sign-up functionalities allow users to create an account and access personalized movie management features.

- Movie Search: Integration with The Movie Database (TMDB) API enables users to search for movies and view detailed information about each movie.

- Personalized Movie List: Users can create, read, update, and delete movies in their own collection, making it easy to manage their favorite movies.

- Flexible Data Entry: Users can manually add information about movies or use TMDB data to populate movie details automatically.

## Table of Contents

- [Prerequisites](#Prerequisites)
- [Getting Started](#getting-started)
    - [Server Setup (Backend)](#1-server-setup-backend)
    - [Accessing the Database](#2-accessing-the-database)
    - [Client Setup (Frontend)](#3-client-setup-frontend)
    - [Access The Application](#4-access-the-application)
- [Application Features](#application-features)
- [Contributing](#contributing)
- [License (Optional)](#license-optional)
- [Credits](#credits)

## Prerequisites

Before running the application, ensure you have the following dependencies installed:

- Node.js (v14 or higher) is required to execute the JavaScript and TypeScript code for both the backend and frontend components. To check if Node.js is installed, run the following command in your terminal or command prompt:
```
node -v
```
If Node.js is not installed, you can download it from the official <a href="https://nodejs.org/en">website</a>.

- npm (Node Package Manager): npm is used to manage packages and dependencies for the project. To check if npm is installed, run the following command in your terminal or command prompt:
```
npm -v
```

- Docker: Docker is needed to create, manage, and run containers for the PostgreSQL database. To check if Docker is installed, run the following command:
```
docker --version
```
If Docker is not installed, you can download it from the official <a href="https://www.docker.com/products/docker-desktop/">Docker</a>.

Please ensure you have all the prerequisites installed before proceeding with the application setup.

## Getting Started

To clone and run the application, follow these steps:

Clone the repository to your local machine:
```
git clone https://github.com/RaimondasSileikis/react-nestjs-movies-db.git
cd react-nestjs-movies-db
```
### 1. Server Setup (Backend)

a. Navigate to the backend directory:
```
cd movies-db-server
```
b. Install the dependencies:
```
npm install
```
c. Create a .env file in the movies-db-server directory and add the following content:
```
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:PORT/DATABASE_NAME?schema=public"
JWT_SECRET="YOUR_JWT_SECRET_KEY"
```
Replace the placeholders as follows:

- USERNAME: Use the default username for PostgreSQL, which is usually "postgres."
- PASSWORD: Use the default password for PostgreSQL, which is specified as "password123" in the docker-compose.yml.
- PORT: Use the port number specified in the docker-compose.yml. In this case, it's set to 5435.
- DATABASE_NAME: Use the name of your PostgreSQL database, which is "movies" as specified in the docker-compose.yml.
- YOUR_JWT_SECRET_KEY: Replace this with your desired secure key that will be used for JWT token encryption.

After making these changes, your .env file in the movies-db-server directory should look like this:
```
DATABASE_URL="postgresql://postgres:password123@localhost:5435/movies?schema=public"
JWT_SECRET="your_secure_jwt_secret_key_here"
```

d. Start the PostgreSQL database using Docker Compose and create a new database:
```
docker-compose up -d
```
e. Run the database migrations and set up the database schema:
```
npm run db:dev:restart
```
f. Start the backend server to run the application:
```
npm run start:dev
```

### 2. Accessing the Database

After setting up the database using Docker Compose, you might want to explore and interact with the database using a visual interface. To do this, you can use Prisma Studio.

Prisma Studio is a web-based database management tool that allows you to visualize and interact with your PostgreSQL database. It provides a convenient way to browse tables, examine data, and perform CRUD operations.

To launch Prisma Studio, follow these steps:

a. Open a new terminal or command prompt window.

b. In the new terminal window, navigate to the movies-db-server directory.

c. Run the following command to start Prisma Studio:
```
npx prisma studio
```
d. Prisma Studio should now be accessible at http://localhost:5555 in your web browser.

e. In Prisma Studio, you can explore the database schema, view and edit data, and perform various database operations.


### 3. Client Setup (Frontend)

a. Navigate to the frontend directory:
```
cd ../movies-db
```
b. Install the dependencies:
```
npm install
```
c. Obtain TMDB API Key
To use the TMDB API for movie searches, you need an API key, which is required to authenticate your requests. Here's how you can obtain an API key:

- Go to the TMDB Developer website.

- Click on the "Get API Key" button, and it will direct you to the registration page.

- Sign up for a new account or log in if you already have one.

- Once you are logged in, you will be able to create a new API key.

- Select the type of application you are building (e.g., Personal, Commercial).

- Agree to the terms and conditions, and you will receive your API key.

Add TMDB API Key to .env file
After obtaining the TMDB API key, add it to the .env file in the frontend directory (movies-db) like this:
```
REACT_APP_DB_API_KEY=YOUR_TMDB_API_KEY
```

Replace YOUR_TMDB_API_KEY with the actual API key you obtained from the TMDB website.

By adding the TMDB API key to the .env file, the frontend application will be able to access the TMDB API and perform movie searches. The key will be read and used by the api.ts file in the frontend to make requests to the TMDB API.

### 4. Access the application:

Open your web browser and visit http://localhost:3000 to access the application.


## Application Features
The application provides the following features:

Login and Sign Up: Users can log in or sign up to create an account.
TMDB Search: Users can search for movies using The Movie Database (TMDB) API.
My Movies: Users can view, add, edit, and delete movies from their personal list.
## Contributing
Feel free to contribute to this project by creating pull requests. Any improvements and bug fixes are welcome!

## License (Optional)
This project is solely for learning purposes and is not intended for distribution or commercial use. All rights are reserved by the project's author. Feel free to explore, learn, and experiment with the code for educational purposes. For any questions or collaborations, please reach out to the author.

## Credits
This application was developed by Raimondas Sileikis.
Find me on <a href="https://github.com/RaimondasSileikis">Github</a>.

