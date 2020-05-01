import React from "react";
import SearchAuc from "../components/SearchAuc";
import { connect } from "react-redux";
import { addItem } from "../modules/recentSearch";

const SearchAucContainer = ({ list, addItem }) => {
	return <SearchAuc list={list} addItem={addItem} />;
};

export default connect(state => ({ list: state.recentSearch }), { addItem })(SearchAucContainer);
