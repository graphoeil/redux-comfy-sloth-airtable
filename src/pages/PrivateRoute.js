// Imports
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

// Component
const PrivateRoute = ({ children }) => {

	// Auth0 user
	const { user } = useAuth0();

	// Return
	if (!user){
		return <Navigate to="/"/>
	} else {
		return children;
	}

};

// Export
export default PrivateRoute;