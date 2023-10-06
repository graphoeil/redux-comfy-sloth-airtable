// Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Component
const Error = ({ redirect }) => {

	// State
	const [timer, setTimer] = useState(5);
	const [text, setText] = useState('seconds');

	// Countdown
	const navigate = useNavigate();
	useEffect(() => {
		let countDown;
		if (timer >= 1 && redirect){
			countDown = setTimeout(() => {
				setTimer(timer - 1);
			}, 1000);
		}
		if (timer === 1){
			setText('second');
		}
		if (timer <= 0 && redirect){
			navigate('/');
		}
		// Clean up
		return() => {
			clearTimeout(countDown);
		}
	}, [timer, navigate, redirect]);

	// Return
	return(
		<div className="section section-center text-center">
			<h2>There was an error...</h2>
			{
				redirect && <h3>Redirect to homepage in { timer } { text }...</h3>
			}
		</div>
	);
	
};

// Export
export default Error;