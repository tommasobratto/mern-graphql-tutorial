import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import * as bootstrap from 'bootstrap'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql/",
    cache: new InMemoryCache()
});

createRoot(
    document.getElementById("root"),
).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
);
