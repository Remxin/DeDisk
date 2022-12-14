//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// redux
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import userReducer from "./features/user"
import appStatusReducer from "./features/appStatus"

// apollo client
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'

// variables
const client = new ApolloClient({
  uri: "http://localhost:4000",
  link: createUploadLink({uri: "http://localhost:4000", credentials: "include"}),
  cache: new InMemoryCache(),
  credentials: "include"
});

const store = configureStore({
  reducer: {
    user: userReducer,
    appStatus: appStatusReducer
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
