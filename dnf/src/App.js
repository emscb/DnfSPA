import React from "react";
import SearchItem from "./components/SearchItem";
import { Route } from "react-router-dom";
import ItemDetail from "./components/ItemDetail";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <div style={{ flex: "1" }}>
        <Menu />
        <Route path="/" component={SearchItem} exact />
        <Route path="/searchItem" exact component={SearchItem} />
        <Route path="/searchItem/:itemId" component={ItemDetail} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
