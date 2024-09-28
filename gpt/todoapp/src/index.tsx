import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // GraphQLサーバーのURI
  cache: new InMemoryCache(), // クエリの結果をキャッシュするための設定
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

