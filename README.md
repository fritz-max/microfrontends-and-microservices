# microfrontends-and-microservices
A setup of microfrontends and microservices, communicating through WAMP. 

## Development:
The instrument1 service in docker-compose is commented out. 

- Rebuild the composite-ui image.
- if you want to run it: 
  - call docker-compose up for the 3 services other than the microfrontend
  - run `yarn build && yarn serve` (or with npm) in instrument1-mfe

## Running the prototype with docker-compose

### Build Docker Images

**Composite UI:**  
```sh
cd composite-ui
docker build -t composite-ui:v2 .
```

**Microfrontend Service:**  
```sh
cd instrument1-mfe
docker build -t instrument1-mfe:v3 .
```

### Run Docker Compose
Then go into the project root and call docker-compose:
```sh
docker-compose up
```

Once the services are running, go to `http://localhost:3001` to inspect the composite UI. You should see the "Hello World" count increasing, as the frontend is receiving the messages on its subscription.
