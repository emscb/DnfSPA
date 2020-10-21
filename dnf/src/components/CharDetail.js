import React, { useState, useRef } from "react";
import axios from "axios";
import "./styles/CharDetail.scss";
import Tabs from "./CharDetailTabs";
import Tables from "./CharDetailTables";
import Helmet from "react-helmet";
import { API_KEY } from "../config";

const CharDetail = ({ match, history }) => {
	const { server, charId } = match.params;
	const id = charId;
	const [info, setInfo] = useState({});
	const [equipment, setEquipment] = useState({});
	const [avatar, setAvatar] = useState([]);
	const [creature, setCreature] = useState([]);
	const [buffEquipment, setBuffEquipment] = useState({});
	const [buffAvatar, setBuffAvatar] = useState({});
	const [buffCreature, setBuffCreature] = useState({});
	const gotData = useRef(false);
	const [tab, setTab] = useState(1);

	if (gotData.current === false) {
		// 기본 정보 조회
		axios
			.get(`https://api.neople.co.kr/df/servers/${server}/characters/${id}?apikey=${API_KEY}`)
			.then(response => {
				setInfo({
					adventureName: response.data.adventureName,
					characterName: response.data.characterName,
					guildId: response.data.guildId,
					guildName: response.data.guildName,
					jobGrowId: response.data.jobGrowId,
					jobGrowName: response.data.jobGrowName,
					level: response.data.level,
				});
			});

		// 장착 장비 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/equip/equipment?apikey=${API_KEY}`
			)
			.then(response => {
				let equipments = {};
				for (let i = 0; i < response.data.equipment.length; i++) {
					let e = response.data.equipment[i];
					Object.assign(equipments, { [e.slotId]: e, setItemInfo: response.data.setItemInfo });
				}
				setEquipment(equipments);
			});

		// 장착 아바타 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/equip/avatar?apikey=${API_KEY}`
			)
			.then(response => {
				setAvatar(response.data.avatar);
			});

		// 장착 크리쳐 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/equip/creature?apikey=${API_KEY}`
			)
			.then(response => {
				setCreature(response.data.creature);
			});

		// 버프 강화 장비 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/skill/buff/equip/equipment?apikey=${API_KEY}`
			)
			.then(response => {
				setBuffEquipment(response.data.skill.buff);
			});

		// 버프 강화 아바타 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/skill/buff/equip/avatar?apikey=${API_KEY}`
			)
			.then(response => {
				setBuffAvatar(response.data.skill.buff);
			});

		// 버프 강화 크리쳐 조회
		axios
			.get(
				`https://api.neople.co.kr/df/servers/${server}/characters/${id}/skill/buff/equip/creature?apikey=${API_KEY}`
			)
			.then(response => {
				setBuffCreature(response.data.skill.buff);
			});

		gotData.current = true;
	}

	const onClick = id => {
		// 받아온 id로 어떤 컴포넌트를 그릴지 정해야 함
		setTab(id);
	};

	return (
		info.characterName !== undefined && (
			<div>
				<Helmet>
					<title>{info.characterName} 상세 정보</title>
				</Helmet>
				<div className="CharDetail">
					<div className="simpleInfo">
						{/* 사진, 직업 등 간단한 정보 */}
						<div className="charImg">
							<img
								src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${id}?zoom=2`}
								alt={`${info.characterName}`}
							/>
						</div>
						<div className="info">
							{/* 직업, 길드, 바로가기 */}
							{info.adventureName}
							<br />
							<b>{info.characterName}</b>
							<br />
							Lv.{info.level} {info.jobGrowName}
							<br />
							{info.guildName !== null ? info.guildName : "길드 없음"}
							<br />
							<br />
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`http://dundam.xyz/view.jsp?server=${server}&name=${info.characterName}&image=${id}`}
							>
								<b>던담 바로 가기</b>
							</a>
							<br />
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`https://dunfaoff.com/SearchResult.df?server=${server}&characterid=${id}`}
							>
								<b>던오프 바로 가기</b>
							</a>
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
							{equipment.WEAPON !== undefined && (
								<Tables
									id={tab}
									history={history}
									info={
										tab === 1
											? Object.assign(equipment, {"CREATURE": creature})
											: tab === 2
											? avatar
											: Object.assign(buffEquipment, buffAvatar, buffCreature)
									}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default CharDetail;
