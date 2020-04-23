import React from "react";
import SearchChar from "./SearchChar";
import Helmet from "react-helmet";

const Home = ({ history }) => {
	return (
		<div>
			<Helmet>
				<title>홈</title>
			</Helmet>
			<SearchChar history={history} />
		</div>
	);
};

export default Home;
