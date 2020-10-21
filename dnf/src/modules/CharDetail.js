import React from "react";

const Reinforce = ({ info }) => {
	let item = info;
	if (item.amplificationName === null || item.amplificationName === undefined) {
		// 차원의 능력치가 없으면
		if (item.reinforce === 0 || item.reinforce === undefined) {
			if (item.refine === 0 || item.refine === undefined) {
				return <td />;
			} else {
				return <td>{item.refine}재련</td>;
			}
		} else {
			if (item.refine !== 0) {
				return (
					<td>
						<div style={{ color: "#68D5ED" }}>+{item.reinforce}강화</div>
						<div>{item.refine}재련</div>
					</td>
				);
			} else {
				return <td style={{ color: "#68D5ED" }}>+{item.reinforce}강화</td>;
			}
		}
	} else {
		// 증폭 있음
		if (item.refine !== 0) {
			return (
				<td>
					<div style={{ color: "#FF00FF" }}>+{item.reinforce}증폭</div>
					<div>{item.refine}재련</div>
				</td>
			);
		} else {
			return <td style={{ color: "#FF00FF" }}>+{item.reinforce}증폭</td>;
		}
	}
};

const Enchant = ({ info }) => {
	let item = info;
	if (item.enchant) {
		if (
			item.enchant.status === undefined &&
			item.enchant.reinforceSkill !== undefined
		) {
			let s = item.enchant.reinforceSkill[0];
			return (
				<td>
					{s.skills[0].name} +{s.skills[0].value}
				</td>
			);
		} else if (item.enchant.status !== undefined) {
			let s = item.enchant.status;
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
