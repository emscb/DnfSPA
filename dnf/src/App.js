import React from "react";
import SearchItem from "./components/SearchItem";
import { Route } from "react-router-dom";
import ItemDetail from "./components/ItemDetail";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SearchChar from "./components/SearchChar";
import SearchCharResult from "./components/SearchCharResult";
import CharDetail from "./components/CharDetail";
import Home from "./components/Home";
import SearchAuc from "./components/SearchAuc";
import AucDetail from "./components/AucDetail";
import SearchAucContainer from "./containers/SearchAucContainer";

function App() {
	return (
		<div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
			<div style={{ flex: "1" }}>
				<Menu />
				{/* 메뉴 누르면 커서가 바로 잡히게 할 수 있을까 */}
				<Route path="/" component={Home} exact />
				<Route path="/searchItem" exact component={SearchItem} />
				<Route path="/searchItem/:itemId" component={ItemDetail} />
				<Route path="/searchChar" exact component={SearchChar} />
				<Route path="/searchChar/result/:server/:name" component={SearchCharResult} />
				<Route path="/searchChar/info/:server/:charId" component={CharDetail} />
				<Route path="/searchAuc" exact component={SearchAucContainer} />
				<Route path="/searchAuc/:itemId" component={AucDetail} />
			</div>
			<Footer />
		</div>
	);
}

export default App;
