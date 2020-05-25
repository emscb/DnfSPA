import React from "react";
import SearchAuc from "../components/SearchAuc";
import { useSelector } from "react-redux";

const SearchAucContainer = () => {
	const list = useSelector(state => state.recentSearch);
	return <SearchAuc list={list} />;
};

export default React.memo(SearchAucContainer);
