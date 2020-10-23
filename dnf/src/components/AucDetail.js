import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./styles/AucDetail.scss";
import Helmet from "react-helmet";
import { BACK_URL, API_KEY } from "../config";

var registered_list, itemInfo_response, priceList;
const crawl = async id => {
	try {
		// 경매장 등록 목록 검색
		registered_list = await Axios.get(
			`https://api.neople.co.kr/df/auction?itemId=${id}&sort=unitPrice:asc&limit=400&apikey=${API_KEY}`
		);

		// 아이템 정보 검색
		itemInfo_response = await Axios.get(
			`https://api.neople.co.kr/df/items/${id}?apikey=${API_KEY}`
		);

		priceList = await Axios.get(`${BACK_URL}/auc/${id}`);
	} catch (e) {
		console.error(e);
	}
};

const AucDetail = ({ match, history, add }) => {
	const { itemId } = match.params;
	const id = itemId;
	const [list, setList] = useState([]);
	const [itemInfo, setItemInfo] = useState([]);
	const [upgrade, setUpgrade] = useState(-1);

	// 정보 초기화
	useEffect(() => {
		crawl(id).then(() => {
			if (registered_list !== undefined && itemInfo_response !== undefined) {
				setList(registered_list.data.rows);
				setItemInfo(itemInfo_response.data);
			}
		});
	}, [id]);

	// 최근 검색한 아이템 목록에 추가
	useEffect(() => {
		if (itemInfo.itemName !== undefined) {
			add(id, itemInfo.itemName);
		}
	}, [id, add, itemInfo]);

	// DB에 데이터 쌓기
	const date = new Date();
	let thatday;
	if (date.getHours() < 6) {
		date.setDate(date.getDate() - 2);
	} else {
		date.setDate(date.getDate() - 1);
	}
	thatday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 09:00:00`;

	useEffect(() => {
		if (list[0] !== undefined && itemInfo.length !== 0) {
			try {
				Axios.post(`${BACK_URL}/auc/${id}`, {
					date: thatday,
					itemName: itemInfo.itemName,
					itemId: itemInfo.itemId,
					avgPrice: list[0].averagePrice,
				});
			} catch (e) {
				console.error(e);
			}
		}
	}, [list, itemInfo, id, thatday]);

	const ItemImg = () => (
		<img
			src={`https://img-api.neople.co.kr/df/items/${itemId}`}
			alt=""
			style={{ cursor: "pointer" }}
			onClick={() => {
				history.push(`/searchItem/${itemId}`);
			}}
		/>
	);

	// 그래프 그리기

	// 가장 싼 요일, 가장 비싼 요일 계산하기

	const isStackable = itemInfo.itemType === "스태커블";
	const isCard = itemInfo.cardInfo !== undefined;
	const isUpgradable =
		itemInfo.cardInfo !== undefined && itemInfo.cardInfo.enchant[0].explain === undefined;
	if (list.length === 0) {
		return (
			<div style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "400" }}>
				등록된 매물이 없습니다.
			</div>
		);
	} else {
		const Table = ({ upgrade }) => {
			var table = [
				<thead key="thead">
					<tr>
						<th></th>
						<th>아이템</th>
						{isStackable && <th>개수 (EA)</th>}
						<th>개당 가격</th>
						<th>총 가격</th>
						<th>어제 평균가</th>
						<th>남은 시간</th>
					</tr>
				</thead>,
			];

			table.push(
				<tbody key="tbody">
					{/* 카드 외에 너무 많은 결과를 보여주는 걸 방지 */}
					{(isCard ? list : list.slice(0, 50)).map(
						l =>
							(upgrade === -1 ? true : upgrade === l.upgrade) && (
								<tr key={`${l.auctionNo}`}>
									<td>
										<ItemImg />
									</td>
									<td>
										<span style={{ margin: "0px 5px" }}>{itemInfo.itemName}</span>
										{/* 만약 업그레이드가 가능한 카드라면 */}
										{isUpgradable && (
											<span>
												{l.upgrade}/{itemInfo.cardInfo.enchant.length - 1}
											</span>
										)}
									</td>
									{isStackable && <td>{l.count}</td>}
									<td>{l.unitPrice.toLocaleString()}</td>
									<td>{l.currentPrice.toLocaleString()}</td>
									<td>{l.averagePrice.toLocaleString()}</td>
									<td>
										{parseInt((Date.parse(l.expireDate) - Date.now()) / 3600000)}
										시간
									</td>
								</tr>
							)
					)}
				</tbody>
			);
			return <table>{table}</table>;
		};

		const ButtonList = () => {
			if (isUpgradable) {
				let buttonList = [
					<button key="all" onClick={() => setUpgrade(-1)}>
						전체
					</button>,
				];
				for (let u = 0; u < itemInfo.cardInfo.enchant.length; u++) {
					buttonList.push(
						<button key={u} onClick={() => setUpgrade(u)}>
							{u === itemInfo.cardInfo.enchant.length - 1 ? `풀업글` : `${u}업글`}
						</button>
					);
				}
				return <div>{buttonList}</div>;
			} else {
				return <div />;
			}
		};

		return (
			itemInfo.itemName !== undefined && (
				<div>
					<Helmet>
						<title>{itemInfo.itemName} 검색 결과</title>
					</Helmet>
					{isUpgradable && (
						<div className="chooseUpgrade">
							<ButtonList />
						</div>
					)}
					<div className="auclist">
						<Table upgrade={upgrade} />
					</div>
				</div>
			)
		);
	}
};

export default AucDetail;
