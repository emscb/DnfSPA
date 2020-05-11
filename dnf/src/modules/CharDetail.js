import React from "react";

const Reinforce = ({ info, id }) => {
	// 차원의 능력치가 없으면
	let equipments = info;
	if (equipments[id].amplificationName === null) {
		if (equipments[id].reinforce === 0) {
			if (equipments[id].refine === 0) {
				return <td />;
			} else {
				return <td>{equipments[id].refine}재련</td>;
			}
		} else {
			if (equipments[id].refine !== 0) {
				return (
					<td>
						<div style={{ color: "#68D5ED" }}>+{equipments[id].reinforce}강화</div>
						<div>{equipments[id].refine}재련</div>
					</td>
				);
			} else {
				return <td style={{ color: "#68D5ED" }}>+{equipments[id].reinforce}강화</td>;
			}
		}
	} else {
		// 증폭 있음
		if (equipments[id].refine !== 0) {
			return (
				<td>
					<div style={{ color: "#FF00FF" }}>+{equipments[id].reinforce}증폭</div>
					<div>{equipments[id].refine}재련</div>
				</td>
			);
		} else {
			return <td style={{ color: "#FF00FF" }}>+{equipments[id].reinforce}증폭</td>;
		}
	}
};

const Enchant = ({ info, id }) => {
	let equipments = info;
	if (equipments[id].enchant) {
		if (
			equipments[id].enchant.status === undefined &&
			equipments[id].enchant.reinforceSkill !== undefined
		) {
			let s = equipments[id].enchant.reinforceSkill[0];
			return (
				<td>
					{s.skills[0].name} +{s.skills[0].value}
				</td>
			);
		} else if (equipments[id].enchant.status !== undefined) {
			let s = equipments[id].enchant.status;
			let content = ``;
			for (let m = 0; m < s.length; m++) {
				content += `${s[m].name} +${s[m].value}`;
				if (m + 1 !== s.length) {
					content += `, `;
				}
			}
			return <td>{content}</td>;
		} else {
			return <td>{equipments[id].enchant.explain}</td>;
		}
	} else {
		return <td />;
	}
};

const Emblem = ({ info, id }) => {
	let e = info;
	if (e[id].emblems === []) {
		return <td />;
	} else if (e[id].emblems === undefined) {
		return <td />;
	} else {
		let rows = [];
		for (let m = 0; m < e[id].emblems.length; m++) {
			rows.push(
				<div key={`${id} ${m}`} className={e[id].emblems[m].itemRarity}>
					{e[id].emblems[m].itemName}
				</div>
			);
		}
		return <td>{rows}</td>;
	}
};

const AvatarEmblem = ({ info, id }) => {
	let e = info;
	if (e.avatar[id].emblems === []) {
		return <td />;
	} else if (e.avatar[id].emblems === undefined) {
		return <td />;
	} else {
		let rows = [];
		for (let m = 0; m < e.avatar[id].emblems.length; m++) {
			rows.push(
				<div key={`${id} ${m}`} className={e.avatar[id].emblems[m].itemRarity}>
					{e.avatar[id].emblems[m].itemName}
				</div>
			);
		}
		return <>{rows}</>;
	}
};

export { Reinforce, Enchant, Emblem, AvatarEmblem };
