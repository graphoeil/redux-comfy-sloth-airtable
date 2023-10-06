// Imports
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { Loading } from "../components";

// Export
const AuthWrapper = ({ children }) => {

	// Auth0 user
	const { isLoading, error } = useAuth0();

	// Returns
	if (isLoading){
		return(
			<Wrapper>
				<Loading center/>
			</Wrapper>
		);
	}
	if (error){
		return(
			<Wrapper>
				<h1>{ error.message }</h1>
			</Wrapper>
		);
	}
	return(
		<React.Fragment>
			{ children }
		</React.Fragment>
	);

};

// Styled
const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
`;

// Export
export default AuthWrapper;