## Overview
A simple Express + TypeScript backend, with Firebase Auth authentication and (WIP: connection to an external database). Very barebones, you can use this to skip all the boilerplate of connecting to an authentication system and database.

## Usage
Install node modules:  
```
npm install
```

Create an app on [Firebase](https://console.firebase.google.com/) (create app => project settings => create app => web app), and copy the configuration info in the setup codeblock to `secret/firebase.env`.  

WIP: external DB

Run as dev (with nodemon):
```
npm run dev
```

## API reference
### Auth - `/auth`
POST `/register` - Register a new account with `email` and `password`  
POST `/login` - Login to the account with `email` and `password`  
GET `/logout` - Log out of the logged-in account

### User - `/user`
GET `/info` - Get the account info  
POST `/updateprofile` - Update the `displayName` and/or `photoURL`
