# BIoT Project - Hoity Toity 

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

Per default, only the IMU service and Micro Frontend are run. If you want to run the service with an additional service, i.e. the ACC service, simply uncomment the services in the `docker-compose.yml` file and restart the prototype. The composite UI then includes both MFEs. 

## How to add a new service and MFE

### Using the template prototype code
Together with this Repo, three template prototype repos are handed in, which allow an easy addition of composite-uis, microfrontends and services. These can simply be pasted into the project. The steps to configure each of these services can be found in their respective Readmes. 

After including a new service, the `docker-compose.yml` has to changed to include the new services. To do this, configurations of the already existing services can simply be pasted in, and changed in terms of name/port/etc. 

Of course it is also possible to run e.g. the microservices on Raspberry Pis. Instructions for this can be found in the ms-prototype readme. 