## Overview
A simple Express + TypeScript backend, with Firebase Auth authentication and (WIP: connection to an external database). Very barebones, you can use this to skip the boilerplate of connecting to an authentication system and database.

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

## Creating new routes
Create a new file for your route's functionality, in `src/services`. Then, define and export your route's functionality (async, if it's doing I/O). For eg, to do basic addition: 
```
//MathServices.ts
export function addition (a: number, b: number) {return a+b;}
```

Next, Create a new file for the route in `src/routes`. For each service function, create a route function that takes *request* and *response* parameters (you can import the types from *express*). Obtain any necessary information from the request body, and append any results to the response body. For eg:
```
//MathRoutes.ts
function additionRoute (req: Request, res: Response) {
   let {a, b} = req.body;
   return res.json({result: addition(a, b)});
}
```

Import `src/constants/HTTPStatusCodes.ts`, and return `response.status(HTTPStatusCodes.OK).end()` to return an OK status for successful request. For error handling, append the appropriate status; optionally, add the error message to the response body. Then, export all of these route functions. Thus:
```
//MathRoutes.ts
export function additionRoute (req: Request, res: Response) {
   let {a, b} = req.body;

   try{
    return res.json({result: addition(a, b)})
   .status(HttpStatusCodes.OK).end(); 
   }
   catch (error) {
    return res.json({error: error.code})
    .status(HTTPStatusCodes.BAD_REQUEST).end();
   }
}
```

Go to `src/constants/Paths.ts` and create a new subsection in the object, containing a base route path + separate route paths for each functionality. Following the example:
```
//Paths.ts
export default {
    ...
    Math: {
        Base: '/math',
        Addition: '/addition'
    }
}
```

Go to `src/routes/router.ts` and import your route functions. Create a new router for your routes with `Router()`, and add each route to it. Finally, add this router to *apiRouter*. For eg:
```
//router.ts
import MathRoutes from '../routes/MathRoutes';

...

const mathRouter = new Router();
mathRouter.post(Paths.Math.Addition, MathRoutes.additionRoute);

...

apiRouter.use(Paths.Math.Base, mathRouter);
```

Congrats! You have added a new route.


## API reference
### Auth - `/auth`
POST `/register` - Register a new account with *email* and *password*  
POST `/login` - Login to the account with *email* and *password*  
GET `/logout` - Log out of the logged-in account
POST `/verifyEmail` - Send a verification email for the logged-in account

### User - `/user`
GET `/info` - Get the account info  
POST `/updateProfile` - Update the *displayName* and/or *photoURL*
POST `/updateEmail` - Update the *email*
POST - `/updatePassword` - Update the *password*
