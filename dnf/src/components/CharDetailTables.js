import React from "react";
import "./styles/CharDetailTables.scss";
import "../modules/CharDetail";
import { Reinforce, Enchant, Emblem, AvatarEmblem } from "../modules/CharDetail";

const itemOrder = [
	"WEAPON",
	"SHOULDER",
	"JACKET",
	"PANTS",
	"WAIST",
	"SHOES",
	"WRIST",
	"AMULET",
	"RING",
	"SUPPORT",
	"MAGIC_STON",
	"EARRING",
	"TITLE",
	"CREATURE",
];

const Tables = ({ id, info, history }) => {
	var table = [];
	if (id === 1) {
		// 장착 장비 탭
		let equipments = info;
		let setInfo = info.setItemInfo;
		table.push(
			<thead key={id}>
				<tr>
					<th className="image"></th>
					<th>이름</th>
					<th>강화 / 증폭 / 재련</th>
					<th>마법 부여</th>
				</tr>
			</thead>
		);

		let rows = [];
		itemOrder.map(position => {
			rows.push(
				<tr key={`${position}`}>
					<td>
						<img
							src={`https://img-api.neople.co.kr/df/items/${equipments[position].itemId}`}
							alt={equipments[position].itemName}
							style={{ cursor: "pointer" }}
							onClick={() => {
								history.push(`/searchItem/${equipments[position].itemId}`);
							}}
						/>
					</td>
					<td className={equipments[position].itemRarity}>
						<div>{equipments[position].itemName}</div>
						{equipments[position].upgradeInfo && (
							<div className="sirocoUpgrade">{equipments[position].upgradeInfo.itemName}</div>
						)}
					</td>
					<Reinforce info={equipments[position]} />
					<Enchant info={equipments[position]} />
				</tr>
			);
			return 0;
		});

		table.push(
			<tbody key="equipments">
				{rows}
				<tr id="setInfo">
					<td colSpan="4">
						<div>{`<세트 아이템 정보>`}</div>
						{setInfo.map(s => (
							<div key={s.setItemName}>
								{s.setItemName} {s.activeSetNo}셋
							</div>
						))}
					</td>
				</tr>
			</tbody>
		);
	} else if (id === 2) {
		// 아바타 탭
		let avatars = info;
		table.push(
			<thead key={id}>
				<tr key={id}>
					<th className="image"></th>
					<th>이름</th>
					<th>엠블렘</th>
				</tr>
			</thead>
		);

		if (avatars[0] !== null) {
			let rows = [];
			for (let i = 0; i < avatars.length; i++) {
				rows.push(
					<tr key={avatars[i].itemName}>
						<td>
							<img
								src={`https://img-api.neople.co.kr/df/items/${avatars[i].itemId}`}
								alt={avatars[i].itemName}
								style={{ cursor: "pointer" }}
								onClick={() => {
									history.push(`/searchItem/${avatars[i].itemId}`);
								}}
							/>
						</td>
						<td className={`${e[a].itemRarity}`}>{e[a].itemName}</td>
						<Emblem info={e} id={a} />
					</tr>
				);
			}

			table.push(<tbody key={`${id} tbody`}>{rows}</tbody>);
		}
	} else if (id === 3) {
		// 버프 강화 탭
		let equipments = info;
		table.push(
			<caption>
				<div>
					{equipments.skillInfo.name} Lv.{equipments.skillInfo.option.level}
				</div>
			</caption>
		);
		table.push(
			<thead key={id}>
				<tr>
					<th className="image"></th>
					<th>이름</th>
					<th>강화 / 증폭 / 재련</th>
					<th>마법 부여</th>
				</tr>
			</thead>
		);

		let rows = [];
		itemOrder.map(position => {
			rows.push(
				<tr key={`${position}`}>
					<td>
						<img
							src={`https://img-api.neople.co.kr/df/items/${equipments[position].itemId}`}
							alt={equipments[position].itemName}
							style={{ cursor: "pointer" }}
							onClick={() => {
								history.push(`/searchItem/${equipments[position].itemId}`);
							}}
						/>
					</td>
					<td className={equipments[position].itemRarity}>
						<div>{equipments[position].itemName}</div>
						{equipments[position].upgradeInfo && (
							<div className="sirocoUpgrade">{equipments[position].upgradeInfo.itemName}</div>
						)}
					</td>
					<Reinforce info={equipments[position]} />
					<Enchant info={equipments[position]} />
				</tr>
			);
			return 0;
		});

		rows.push(<tr></tr>);

		let avatars = info.avatar;
		if (avatars[0] !== null) {
			for (let i = 0; i < avatars.length; i++) {
				rows.push(
					<tr key={avatars[i].itemName}>
						<td>
							<img
								src={`https://img-api.neople.co.kr/df/items/${avatars[i].itemId}`}
								alt={avatars[i].itemName}
								style={{ cursor: "pointer" }}
								onClick={() => {
									history.push(`/searchItem/${avatars[i].itemId}`);
								}}
							/>
						</td>
						<td className={`${avatars[i].itemRarity}`}>
							<div>{avatars[i].itemName}</div>
						</td>
						<td>
							<div>{avatars[i].optionAbility}</div>
						</td>
						<Emblem info={avatars} id={i} />
					</tr>
				);
			}
		}
		table.push(<tbody key={`${id} tbody`}>{rows}</tbody>);
	}

	return (
		<div>
			<table>{table}</table>
		</div>
	);
};

export default Tables;
