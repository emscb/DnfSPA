import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const menus = [
	{ name: "home", text: "홈" },
	{ name: "searchItem", text: "아이템 검색" },
	{ name: "searchChar", text: "캐릭터 검색" },
	{ name: "searchAuc", text: "경매장 검색" },
];

const MenuBlock = styled.div`
	display: flex;
	padding: 1rem;
	width: 1024px;
	margin: 0 auto;
	@media screen and (max-width: 768px) {
		width: 100%;
		overflow-x: auto;
	}
`;

const MenuItem = styled(NavLink)`
	font-size: 1.125rem;
	cursor: pointer;
	white-space: pre;
	text-decoration: none;
	color: inherit;
	padding-bottom: 0.25rem;

	&:hover {
		color: #495057;
	}

	&.active {
		font-weight: 600;
		border-bottom: 2px solid #22b8cf;
		color: #22b8cf;
		&:hover {
			color: #3bc9db;
		}
	}

	& + & {
		margin-left: 1rem;
	}
`;

const Menu = () => {
	return (
		<div>
			<MenuBlock>
				{menus.map(m => (
					<MenuItem
						key={m.name}
						activeClassName="active"
						exact={m.name === "home"}
						to={m.name === "home" ? "/" : `/${m.name}`}
					>
						{m.text}
					</MenuItem>
				))}
			</MenuBlock>
		</div>
	);
};

export default Menu;
