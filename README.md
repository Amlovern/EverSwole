# GetSwole

EverSwole is a web application where users can create and track workouts and exercises as they work towards their fitness goals. It is inspired by Evernote where users can sign up and keep notes and notebooks.

Welcome to check out a live version of EverSwole here: [EverSwole.com](https://theeverswole.herokuapp.com/)

![home](https://user-images.githubusercontent.com/97067452/167227093-baee2f2a-b41e-4807-8ea6-5b4f69a58a1a.PNG)

The frontend of EverSwole is handled with React, Redux, CSS, and Javascript. The backend is built on express.js with a PostgresSQL database. Sequelize is used to manage the database.

## Getting Started

  1. Clone this repository

    `git clone https://github.com/Amlovern/EverSwole.git`
  
  2. Install dependencies

    `npm install`
    
  3. Create a .env file based on the .env.example given

  4. Setup your username and database based on what you setup in your .env

  5. Migrate and Seed models

    `npm dotenv sequelize db:migrate` && `npx dotenv sequelize db:seed:all`
    
  6. Start the app using:

    `npm start` in both the frontend and backend folders
    
  7. You can use the Demo user or create an account

## Features

  - Landing Page
    - All visitors are able to see what EverSwole has to offer, regardless of login status.
    - If a visitor is not logged in, they will be prompted to do so.
  -  Registration / Login Pages
    - Users are able to register for an account to track their workouts and exercises.
    - Users are able to sign in to access their account.
    - Users are able to log in as a Demo User account to test the features of the site before signing up.
  -  Exercises Page (User's Full CRUD Operations)
    - Users are able to create exercises to add to their workouts.
    - Users are able to look at all of their exercises which displays the exercise title, description, and associated workout.
    - Users are able to edit the title and description of their exercises.
    - Users are able to delete an exercise.
    - Buttons have AJAX functionality.
  -  Workouts Page (User's 3/4 CRUD Operations)
    - Users are able to create workouts to track their progress.
    - Users are able to look at all of their workouts.
    - Users are able to delete a workout, which will also delete all associated exercises.

## Snapshots
### Register
![Register](https://user-images.githubusercontent.com/97067452/167227132-a7ec8fc1-3e7a-49c1-a6d6-f7e095b43ec1.PNG)
### Login
![Login](https://user-images.githubusercontent.com/97067452/167227142-511bf974-f5b7-4d1d-81f8-834d0e08dd48.PNG)
### Workouts
![Workouts](https://user-images.githubusercontent.com/97067452/167227149-6eaa6269-27f6-4394-a49d-e1976545992f.PNG)
### Exercises
![Exercises](https://user-images.githubusercontent.com/97067452/167227160-0bd71ec8-c576-4509-8ff2-54e3752b2e96.PNG)

## Future Features

  - Dark Mode
  - Search functionality
  - Scaling workouts that all users can look at and perform if they wish.
