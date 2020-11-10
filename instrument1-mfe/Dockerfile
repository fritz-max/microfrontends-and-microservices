FROM node:12

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
 
# Copies package.json and installs
COPY package.json ./
# COPY yarn.lock ./
RUN yarn install

# Copies everything over to Docker environment
COPY . ./

# Finally runs the application
CMD [ "yarn", "start" ]