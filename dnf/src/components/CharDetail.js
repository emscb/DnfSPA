import React, { useState, useRef } from "react";
import axios from "axios";
import "./CharDetail.scss";
import cheerio from "cheerio";
import Tabs from "./CharDetailTabs";
import Tables from "./CharDetailTables";
import Helmet from "react-helmet";

const CharDetail = ({ match, history }) => {
	const { server, charId } = match.params;
	const id = charId;
	const [equipment, setEquipment] = useState({});
	const [avatar, setAvatar] = useState([]);
	const [creature, setCreature] = useState([]);
	const [buffEquipment, setBuffEquipment] = useState({});
	const [buffAvatar, setBuffAvatar] = useState({});
	const [buffCreature, setBuffCreature] = useState({});
	const gotData = useRef(false);
	const [dundamInfo, setDundamInfo] = useState([]);
	const [tab, setTab] = useState(1);

	if (gotData.current === false) {
		// 장착 장비 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/equip/equipment?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
			)
			.then(response => {
				setEquipment(response.data);
			});

		// 장착 아바타 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/equip/avatar?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
			)
			.then(response => {
				setAvatar(response.data.avatar);
			});

		// 장착 크리쳐 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/equip/creature?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
			)
			.then(response => {
				setCreature(response.data.creature);
			});

		// 버프 강화 장비 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/skill/buff/equip/equipment?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
			)
			.then(response => {
				setBuffEquipment(response.data.skill.buff);
			});

		// 버프 강화 아바타 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/skill/buff/equip/avatar?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
			)
			.then(response => {
				setBuffAvatar(response.data.skill.buff);
			});

		// 버프 강화 크리쳐 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/skill/buff/equip/creature?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
			)
			.then(response => {
				setBuffCreature(response.data.skill.buff);
			});

		// 던담 정보 긁어오기
		axios
			.get(
				`http://dundam.xyz/view.jsp?server=${server}&name=${equipment.characterName}&image=${id}`
			)
			.then(response => {
				const $ = cheerio.load(response.data);
				const isBuffer = $("#Present > table > tbody > tr:nth-child(5) > td:nth-child(2)").length;
				if (isBuffer === 1) {
					const list = $("#Present > table > tbody > tr:nth-child(5) > td:nth-child(2)");
					try {
						setDundamInfo([<div key="dundamBuff">버프 : {list[0].childNodes[0].data}</div>]);
					} catch (TypeError) {
						setDundamInfo([<div key="dundamBuff">버프 : 정보 없음</div>]);
					}
				} else {
					let list = $("#rogen > table > tbody > tr:nth-child(13) > td:nth-child(3)");
					try {
						setDundamInfo([<div key="dundamRogen">로젠 1시 : {list[0].childNodes[0].data}</div>]);
					} catch (TypeError) {
						try {
							list = $("#rogen > table > tbody > tr:nth-child(12) > td:nth-child(3)");
							setDundamInfo([<div key="dundamRogen">로젠 1시 : {list[0].childNodes[0].data}</div>]);
						} catch (TypeError) {
							setDundamInfo([<div key="dundamRogen">로젠 1시 : 정보 없음</div>]);
						}
					}
				}
			});

		gotData.current = true;
	}

	const onClick = id => {
		// 받아온 id로 어떤 컴포넌트를 그릴지 정해야 함
		setTab(id);
	};

	return (
		equipment.characterName !== undefined && (
			<div>
				<Helmet>
					<title>{equipment.characterName} 상세 정보</title>
				</Helmet>
				<div className="CharDetail">
					<div className="simpleInfo">
						{/* 사진, 직업 등 간단한 정보 */}
						<div className="charImg">
							<img
								src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${id}?zoom=2`}
								alt={`${equipment.characterName}`}
							/>
						</div>
						<div className="info">
							{/* 직업, 길드, 로젠 1시 딜, 버프력 등 */}
							{equipment.adventureName}
							<br />
							<b>{equipment.characterName}</b>
							<br />
							Lv.{equipment.level} {equipment.jobGrowName}
							<br />
							{equipment.guildName !== null ? equipment.guildName : "길드 없음"}
							<br />
							{dundamInfo}
						</div>
					</div>
					<div className="detailInfo">
						{/* 나머지 전부 */}
						<div className="tab">
							{/* 장착 장비, 아바타, 휘장 등 바꿀 수 있게 탭 */}
							<Tabs onClick={onClick} activeTab={tab} />
						</div>
						<div className="table">
							{/* 내용 표시 (테이블 형태) */}
							<Tables
								id={tab}
								history={history}
								info={
									tab === 1
										? equipment
										: tab === 2
										? avatar.concat(creature)
										: Object.assign(buffEquipment, buffAvatar, buffCreature)
								}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default CharDetail;
