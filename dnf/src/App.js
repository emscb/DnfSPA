import React from "react";
import SearchItem from "./components/SearchItem";
import { Route } from "react-router-dom";
import ItemDetail from "./components/ItemDetail";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SearchChar from "./components/SearchChar";
import SearchCharResult from "./components/SearchCharResult";
import CharDetail from "./components/CharDetail";

function App() {
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <div style={{ flex: "1" }}>
        <Menu />
        <Route path="/" component={SearchChar} exact />
        <Route path="/searchItem" exact component={SearchItem} />
        <Route path="/searchItem/:itemId" component={ItemDetail} />
        <Route path="/searchChar" exact component={SearchChar} />
        <Route path="/searchChar/result" component={SearchCharResult} />
        <Route path="/searchChar/:charId" component={CharDetail} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
