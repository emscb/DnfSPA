import React from "react";
import "./CharDetailTables.scss";
import "../modules/CharDetail";
import { Reinforce, Enchant, Emblem, AvatarEmblem } from "../modules/CharDetail";

const Tables = ({ id, info, history }) => {
	var table = [];
	if (id === 1) {
		// 장착 장비 탭
		let equipments = info.equipment;
		let setInfo = info.setItemInfo;
		table.push(
			<thead key={id}>
				<tr>
					<th className="image"></th>
					<th>이름</th>
					<th>강화 / 증폭 / 재련</th>
					<th>마법부여</th>
				</tr>
			</thead>
		);

		let rows = [];
		for (let a = 0; a < equipments.length; a++) {
			rows.push(
				<tr key={equipments[a].slotId}>
					<td>
						<img
							src={`https://img-api.neople.co.kr/df/items/${equipments[a].itemId}`}
							alt={equipments[a].itemName}
							style={{ cursor: "pointer" }}
							onClick={() => {
								history.push(`/searchItem/${equipments[a].itemId}`);
							}}
						/>
					</td>
					<td className={equipments[a].itemRarity}>{equipments[a].itemName}</td>
					<Reinforce info={equipments} id={a} />
					<Enchant info={equipments} id={a} />
				</tr>
			);
		}
		table.push(
			<tbody key={`${id}body`}>
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
		let e = info;
		table.push(
			<thead key={id}>
				<tr key={id}>
					<th className="image"></th>
					<th>이름</th>
					<th>엠블렘</th>
				</tr>
			</thead>
		);

		if (e[0] !== null) {
			let rows = [];
			for (let a = 0; a < e.length; a++) {
				rows.push(
					<tr key={e[a].itemName}>
						<td>
							<img
								src={`https://img-api.neople.co.kr/df/items/${e[a].itemId}`}
								alt={e[a].itemName}
								style={{ cursor: "pointer" }}
								onClick={() => {
									history.push(`/searchItem/${e[a].itemId}`);
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
		let e = info;
		console.log(e);
		table.push(
			<caption key="caption">
				{e.skillInfo.name} Lv.{e.skillInfo.option.level}
			</caption>
		);
		table.push(
			<thead key={id}>
				<tr>
					<th className="image"></th>
					<th>이름</th>
					<th className="image"></th>
					<th>이름</th>
				</tr>
			</thead>
		);

		let rows = [];
		if (e.equipment !== null) {
			for (let a = 0; a < parseInt(e.equipment.length / 2) + 1; a++) {
				rows.push(
					<tr key={2 * a}>
						{e.equipment[2 * a] !== undefined && (
							<>
								<td>
									<img
										src={`https://img-api.neople.co.kr/df/items/${e.equipment[2 * a].itemId}`}
										alt={e.equipment[2 * a].itemName}
										style={{ cursor: "pointer" }}
										onClick={() => {
											history.push(`/searchItem/${e.equipment[2 * a].itemId}`);
										}}
									/>
								</td>
								<td className={e.equipment[2 * a].itemRarity}>{e.equipment[2 * a].itemName}</td>
							</>
						)}
						{e.equipment[2 * a + 1] !== undefined && (
							<>
								<td>
									<img
										src={`https://img-api.neople.co.kr/df/items/${e.equipment[2 * a + 1].itemId}`}
										alt={e.equipment[2 * a + 1].itemName}
										style={{ cursor: "pointer" }}
										onClick={() => {
											history.push(`/searchItem/${e.equipment[2 * a + 1].itemId}`);
										}}
									/>
								</td>
								<td className={e.equipment[2 * a + 1].itemRarity}>
									{e.equipment[2 * a + 1].itemName}
								</td>
							</>
						)}
					</tr>
				);
			}
		}

		if (e.avatar !== null) {
			for (let a = 0; a < e.avatar.length; a++) {
				rows.push(
					<tr key={`avatar ${a}`}>
						<td>
							<img
								src={`https://img-api.neople.co.kr/df/items/${e.avatar[a].itemId}`}
								alt={e.equipment[a].itemName}
								style={{ cursor: "pointer" }}
								onClick={() => {
									history.push(`/searchItem/${e.avatar[a].itemId}`);
								}}
							/>
						</td>
						<td className={e.avatar[a].itemRarity}>{e.avatar[a].itemName}</td>
						<td colSpan={2}>
							<AvatarEmblem info={e} id={a} />
						</td>
					</tr>
				);
			}
		}

		if (e.creature !== null) {
			rows.push(
				<tr key="creature">
					<td>
						<img
							src={`https://img-api.neople.co.kr/df/items/${e.creature[0].itemId}`}
							alt={e.creature[0].itemName}
							style={{ cursor: "pointer" }}
							onClick={() => {
								history.push(`/searchItem/${e.creature[0].itemId}`);
							}}
						/>
					</td>
					<td className={e.creature[0].itemRarity}>{e.creature[0].itemName}</td>
					<td colSpan={2} />
				</tr>
			);
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
