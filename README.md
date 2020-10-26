# microfrontends-and-microservices
A setup of microfrontends and microservices, communicating through WAMP. 

## Running the prototype with docker-compose
The prototype can be run out of the box with docker-compose. 
Clone the repo and from the root of the project call
 
```sh
docker-compose up
```

When running for the first time, docker-compose will automatically pull non-existing images and build the images for the composite-ui and microfrontend according to their Dockerfiles. This will take a while.   

> Note: The /src folder in each of the two directories is mounted into the containers as a volume, meaning that you can see live updates when changing the React code.
> Anytime that something changes outside the src-directory (webpack-config, package.json, ...) the images have to be rebuilt using `docker-compose build`
 
Once the services are running, go to http://localhost:3001 to inspect the composite UI.

## Running the UI-services individually
You can also run the services individually. In that case you need node-js and npm installed locally.

### Prerequisites
- Install Node.js and npm in the LTS version: https://nodejs.org/en/download/   

### Install node modules
- You have to install node_modules in the `instrument1-mfe` and the `composite-ui` folder. 

Run:
```sh
cd composite-ui
npm install
```

```sh
cd instrument1-mfe
npm install
```

### Run services individually
To run services locally, call

```sh
npm start
```
from within the `./composite-ui` or `./instrument1-mfe` folder. 
