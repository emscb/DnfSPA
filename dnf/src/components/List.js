import React from "react";
import "./styles/List.scss";
import ListItem from "./ListItem";

const List = ({ items, trade }) => {
	return (
		<div className="List">
			{items.map(item => (
				<ListItem item={item} key={item.id} trade={trade} />
			))}
		</div>
	);
};

export default List;
