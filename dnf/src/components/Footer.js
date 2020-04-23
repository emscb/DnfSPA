import React from "react";
import styled from "styled-components";
import logo from "../img/기술표기_가로형_color.png";

const Footer = () => {
	const Powerby = styled.div`
		display: flex;
		padding: 1rem;
		width: 1024px;
		margin: 0 auto;
		justify-content: center;
	`;

	return (
		<div>
			<Powerby>
				<a href="http://developers.neople.co.kr">
					<img src={logo} alt="Neople 오픈 API" />
				</a>
			</Powerby>
		</div>
	);
};

export default Footer;
