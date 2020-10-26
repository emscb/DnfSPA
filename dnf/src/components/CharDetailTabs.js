import React from "react";
import "./styles/CharDetailTabs.scss";

const Tabs = ({ onClick, activeTab }) => {
	const tabs = [
		{ id: 1, name: "장착 장비" },
		{ id: 2, name: "아바타" },
		{ id: 3, name: "버프 강화" },
		{ id: 4, name: "탈리스만" },
		{ id: 5, name: "휘장" },
	];
	return (
		<div className="tabs">
			{tabs.map(i => (
				<button
					key={i.id}
					onClick={() => {
						onClick(i.id);
					}}
					className={activeTab === i.id ? "active" : "deactivated"}
				>
					{i.name}
				</button>
			))}
		</div>
	);
};

export default Tabs;
