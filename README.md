# Ybook

This project is a React application for mobile.

## Start the project

In the project directory, you can run:

### `npm install`

This will install all necessary modules. This is only necessary the first time you run the application.

### `npm start`

This will run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.

## Start the project in PWA mode

This project can be downloaded as a PWA.

### `npm run build`

This will correctly bundle React in production mode and optimize the build for the best performance.
This is only necessary the first time you run the application.

### `npm install -g serve`

This install serve to handle environments using Node, as our backend is in Node.
This is only necessary the first time you run the application.

### `serve -s build`

This will serve the static site on port 3000.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Authentification

The authentification process uses Amazon Web Services's Cognito service.
More information here : [https://aws.amazon.com/fr/blogs/mobile/accessing-your-user-pools-using-the-amazon-cognito-identity-sdk-for-javascript/](https://aws.amazon.com/fr/blogs/mobile/accessing-your-user-pools-using-the-amazon-cognito-identity-sdk-for-javascript/)

The mail address used to authenticate must be active, as it will be verified with an email.

## Functionnalities

Once you are connected, you will have access to the social media application.
You will first see the home page, with different users' posts.
Using the navbar, you can navigate to the different pages : home, messages, friends, profile, logout.