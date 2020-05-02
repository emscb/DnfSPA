import React from "react";
import SearchAuc from "../components/SearchAuc";
import { connect } from "react-redux";

const SearchAucContainer = ({ list }) => {
	return <SearchAuc list={list.reverse()}/>;
};

export default connect(state => ({ list: state.recentSearch }))(SearchAucContainer);
