import React, { useState, useEffect } from "react";
import Axios from "axios";
import Search from "./Search";
import List from "./List";
import "./SearchAuc.scss";
import Helmet from "react-helmet";
import { BACK_URL, API_KEY } from "../config";
import { Link } from "react-router-dom";

const SearchAuc = ({ list }) => {
	// API 호출하여 아이템 검색
	const [items, setItems] = useState([]);
	const [freqItems, setFreqItems] = useState([]);
	const onSearch = name => {
		try {
			Axios.get(
				`https://api.neople.co.kr/df/items?itemName=${name}&wordType=full&q=trade:true&apikey=${API_KEY}`
			).then(response => {
				if (response.data.rows.length === 0) {
				} else {
					var list = [];
					response.data.rows.map(row => list.push({ id: row.itemId, name: row.itemName }));
					setItems(list);
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	// 가장 많이 검색된 아이템 조회
	useEffect(() => {
		try {
			Axios.get(`${BACK_URL}/auc/`).then(response => {
				setFreqItems(response.data);
			});
		} catch (e) {
			console.error(e);
		}
	}, []);

	return (
		<div className="SearchAuc">
			<Helmet>
				<title>경매장 검색</title>
			</Helmet>
			<div className="recent">
				<div className="title">최근 검색한 아이템</div>
				{list.map(item => (
					<div className="item" key={item.id}>
					<img src={`https://img-api.neople.co.kr/df/items/${item.id}`} alt="" />
					<Link
						style={{ textDecoration: "none", color: "black" }}
						to={`searchAuc/${item.id}`}
					>
						{item.name}
					</Link>
				</div>
				))}
			</div>
			<div className="main">
				<div className="app-title">경매장 검색</div>
				<Search onSearch={onSearch} type="아이템" />
				<List items={items} trade={true} />
			</div>
			<div className="frequently">
				<div className="title">가장 많이 검색한 아이템</div>
				{freqItems.map(item => (
					<div className="item" key={item._id.id}>
						<img src={`https://img-api.neople.co.kr/df/items/${item._id.id}`} alt="" />
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`searchAuc/${item._id.id}`}
						>
							{item._id.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchAuc;
