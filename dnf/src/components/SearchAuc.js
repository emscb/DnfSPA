import React, { useState, useEffect } from "react";
import Axios from "axios";
import Search from "./Search";
import List from "./List";
import "./SearchAuc.scss";
import Helmet from "react-helmet";
import { BACK_URL } from "../config";

const SearchAuc = ({ list, addItem }) => {
	// API 호출하여 아이템 검색
	const [items, setItems] = useState([]);
	const [freqItems, setFreqItems] = useState([]);
	const onSearch = name => {
		try {
			Axios.get(
				`https://api.neople.co.kr/df/items?itemName=${name}&wordType=full&q=trade:true&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
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
			</div>
			<div className="main">
				<div className="app-title">경매장 검색</div>
				<Search onSearch={onSearch} type="아이템" />
				<List items={items} trade={true} />
			</div>
			<div className="frequently">
				<div className="title">가장 많이 검색한 아이템</div>
				{console.log(freqItems)}
			</div>
		</div>
	);
};

export default SearchAuc;
