# RelxAssessment

The assessement solution is based on using a server application to proxy to the endpoint while the angular application calls the server app. The angular project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9 and the server project was built on **Express** server. While this might not be an ideal solution, proxying directly to the endpoint seems blocked even with leveraging on **angular/webpack** proxy functionality. Using the **Vite** server for proxying on the other hand, works perfectly.

## Development server for Server App

Run `cd server` to access server app directory
Run `npm i` to install dependencies
Run `npm start` for a dev server.

## Development server for Angular App

Run `cd angular` to access angular app directory
Run `npm i` to install dependencies
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `cd angular` to access angular app directory
Run `npm run test` to execute the unit tests via [Jest].
