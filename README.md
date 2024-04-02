# MERN GraphQL Tutorial

This is an implementation combining two different tutorials to produce a full-stack web application with the following stack:
- Database layer: **MongoDB Atlas**
- Server runtime: **NodeJS**
- Server framework: **Express** + **Apollo Server**
- Client framework: **React** + **Apollo Client**
- Client bundler: **Parcel**

The tutorials used as reference are:
- [How to Use MERN Stack: A Complete Guide](https://www.mongodb.com/languages/mern-stack-tutorial)
- [Teaching the MERN stack to speak GraphQL](https://www.apollographql.com/docs/apollo-server/integrations/mern/)

It was very useful to refresh my knowledge of React v18 and Hooks, also adding an introduction to MongoDB connections and GraphQL.  
One thing the tutorials don't cover is the use of a bundler to package and serve the client application, so I added in Parcel to have a quick zero-config solution useful for tutorial purposes.  

MongoDB connection methods are different from the tutorial.  

Styling is iffy. There are some issues with the default styling found in the MongoDB tutorial, and it's something I need to get more into as I keep learning. It might be due to the use of some older version of Bootstrap. 

Other changes include the use of ESM module syntax for the Node/Express code.  

## Setup

Client Terminal
```
cd client
npm install
npm run build
```

Server Terminal
```
cd server
npm install
node server.js
```

The MongoDB connection requires a config.env file in the server folder with a valid ATLAS_URI connection string.

## Setup with Docker

As part of my learning process I've added a basic configuration to replicate a production-like environment using a Docker container.  
It is nothing special as it's my first foray into Docker, so I've had to tackle serving a production-like build using **serve** (could have made a simple web server using Express, [but alas!](https://create-react-app.dev/docs/deployment/)) and configuring the application for deployment.  

Running in a different environment exposed some issues in the code and app configuration that I had to fix before deploying and testing.  

I did not use any specific tutorial for Docker configuration, just searched around for references to the use of Docker Compose and Dockerfile syntax.

To run with Docker:
```
docker-compose up
```

