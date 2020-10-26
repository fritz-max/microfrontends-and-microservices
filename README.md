# microfrontends-and-microservices
A setup of microfrontends and microservices, communicating through WAMP. 

## Running the prototype with docker-compose
The prototype can be run out of the box with docker-compose. 
Clone the repo and from the root of the project call
 
```sh
docker-compose up
```

When running for the first time, docker-compose will automatically pull non-existing images and build the images for the composite-ui and microfrontend according to their Dockerfiles. This will take a while.   

> Note: The /src folders in `composite-ui` and `instrument1-mfe` are mounted into the containers as volumes, meaning that you can see live updates when changing the React code.
> Anytime that something changes outside the src-directory (webpack-config, package.json, ...) the images have to be rebuilt using `docker-compose build`
 
Once the services are running, go to http://localhost:3001 to inspect the composite UI.
