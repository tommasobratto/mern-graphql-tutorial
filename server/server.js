import "./config.js"
import express, { json } from "express";
import cors from "cors";

import recordRoutes from "./routes/record.js"
import { connectToServer } from "./db/connection.js";

import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers.js";
import { readFileSync } from "fs";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(json());

const typeDefs = gql(
    readFileSync("schema.graphql", {
        encoding: "utf-8"
    })
);

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers })
});

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