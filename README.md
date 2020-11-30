# microfrontends-and-microservices
A setup of microfrontends and microservices, communicating through WAMP. 

## Running the prototype with docker-compose
The prototype can be run with docker-compose. Clone the repo and from the root of the project call
 
```sh
docker-compose up
```

When running for the first time, docker-compose will automatically pull non-existing images and build the images for the composite-ui and microfrontend according to their Dockerfiles. This will take a while.   

> Note: The /src folders in `composite-ui` and `instrument1-mfe` are mounted into the containers as volumes, meaning that you can see live updates when changing the React code.
> Anytime that something changes outside the src-directory (webpack-config, package.json, ...) the images have to be rebuilt using `docker-compose build`
 
Once the services are running, go to http://localhost:3001 to inspect the composite UI.

## Adding a new service and microfrontend

### 1. Cloning the repos
Go into the project directory and clone a new Service and Microfrontend, using the template Repos.

```sh
git clone --depth 1 https://github.com/OsvaldFrisk/ms-prototype.git [NAME OF YOUR NEW MFE]
git clone --depth 1 https://github.com/fritz-max/mfe-template.git [NAME OF YOUR NEW SERVICE]
```

### 2. Configurate services
Access the directories and change the `config.json` and `model.json` of mfe and service respectively. Note that for both services to communicate, the `publishTopics` and `subscribeTopics`, as well as `caller` and `callee` topices for the RPCs have to match. The imu_mfe and imu_service provide examples for this.  

Besides the new services, the composite UI (`airvisor`) also needs to include the new microfrontend. To include it, add it into the `config.json` in the composite ui directory. 

### 3. Add new Docker-Compose configuration
In the `docker-compose.yml` file in project root, the two new services have to be added. For now, the easiest way to do this is to copy the configurations of `imu_mfe` and `imu_service` and change the names and links in them. 

### 4. Add your source code
Now, the service and mfe can be programmed to your liking. For the MFE, the source code lives in the `/src´ directory, with `Service.js` being the entrypoint to the application and the component that is exposed to the composite UI. For the service it is the `service.py` file. 

## Checkout the alternative branch 
The setup with 2 MFEs and 2 Services, as well as the second chart library can be seen in the branch "extended". 


- add your code to mfe (src dir) and the service
- inspect services by docker-compose up
