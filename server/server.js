import "./config.js"
import express, { json } from "express";
import cors from "cors";

import recordRoutes from "./routes/record.js"
import { connectToServer } from "./db/connection.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(json());

const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

app.use(recordRoutes);
app.use(
    "/graphql", 
    cors(),
    express.json(),
    expressMiddleware(server)
);

app.listen(port, () => {
    connectToServer(err => {
        if (err) console.error(err);
    });

    console.log(`Server is running on port: ${port}`);
});