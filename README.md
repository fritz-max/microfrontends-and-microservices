# microfrontends-and-microservices
A setup of microfrontends and microservices, communicating through WAMP. 

## Running the prototype with docker-compose

### Build Docker Images
As docker-compose is set up currently, it needs pre-built docker images. The images for the crossbar router and instrument service app come prebuilt (crossbario and autobahn-python), but the images for the composite ui and the microfronted have to be built first.  

**Composite UI:**  
```sh
cd composite-ui
docker build -t composite-ui:v1 .
```

**Microfrontend Service:**  
```sh
cd instrument1-mfe
docker build -t instrument1-mfe:v1 .
```

### Run Docker Compose
Then go into the project root and call docker-compose:
```sh
docker-compose up
```

Once the services are running, go to `http://localhost:3001` to inspect the composite UI. You should see the "Hello World" count increasing, as the frontend is receiving the messages on its subscription.
