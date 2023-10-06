// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

// Redux
import { Provider } from "react-redux";
import store from "./store/store";

// ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider 
		domain={ process.env.REACT_APP_AUTH0_DOMAIN }
		clientId={ process.env.REACT_APP_AUTH0_CLIENTID }
		redirectUri={ window.location.origin }
		cacheLocation="localstorage">
		<Provider store={ store }>
			<App />
		</Provider>
	</Auth0Provider>
);