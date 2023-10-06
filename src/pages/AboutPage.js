// Imports
import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import aboutImg from '../assets/hero-bcg.jpeg';

// Component
const AboutPage = () => {

	// Return
	return(
		<main>
			<PageHero title="about"/>
			<Wrapper className="page section section-center">
				<img src={ aboutImg } alt="nice desk"/>
				<article>
					<div className="title">
						<h2>Our story</h2>
						<div className="underline"/>
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam ea fuga in impedit voluptatem amet, 
							explicabo accusantium fugiat consectetur dignissimos aliquid voluptate optio quaerat delectus. 
							Quasi praesentium maiores eius rerum exercitationem temporibus vitae ad officiis possimus 
							adipisci aspernatur omnis hic, architecto qui laboriosam sed. Vel vitae facilis ducimus, 
							eveniet beatae officiis recusandae ?</p>
					</div>
				</article>
			</Wrapper>
		</main>
	);

};

// Styled
const Wrapper = styled.section`
	display: grid;
	gap: 4rem;
	img {
		width: 100%;
		display: block;
		border-radius: var(--radius);
		height: 500px;
		object-fit: cover;
	}
	p {
		line-height: 2;
		max-width: 45em;
		margin: 0 auto;
		margin-top: 2rem;
		color: var(--clr-grey-5);
	}
	.title {
		text-align: left;
	}
	.underline {
		margin-left: 0;
	}
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	}
`;

// Export
export default AboutPage;