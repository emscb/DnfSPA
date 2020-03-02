import React from "react";
import "./CharDetailTables.scss";

const Tables = ({ id, info }) => {
  var e = info.equipment;
  var table = [];
  if (id === 1) {
    table.push(
      <thead key={id}>
        <tr>
          <th></th>
          <th>이름</th>
          <th>강화 / 증폭</th>
          <th>마법부여</th>
        </tr>
      </thead>
    );

    function Reinforce({ id }) {
      if (e[id].amplificationName === null) {
        if (e[id].reinforce === 0) {
          return <td></td>;
        } else {
          return <td style={{ color: "#68D5ED" }}>+{e[id].reinforce}강화</td>;
        }
      } else {
        return <td style={{ color: "#FF00FF" }}>+{e[id].reinforce}증폭</td>;
      }
    }

    function Enchant({ id }) {
      if (e[id].enchant) {
        if (e[id].enchant.status === undefined && e[id].enchant.reinforceSkill !== undefined) {
            let s = e[id].enchant.reinforceSkill[0];
            return <td>{s.skills[0].name} +{s.skills[0].value}</td>;
        } else if (e[id].enchant.status !== undefined) {
          let s = e[id].enchant.status;
          let content = ``;
          for (let m = 0; m < s.length; m++) {
            content += `${s[m].name} +${s[m].value}`;
            if (m + 1 !== s.length) {
              content += `, `;
            }
          }
          return <td>{content}</td>;
        } else {
            return <td>{e[id].enchant.explain}</td>
        }
      } else {
        return <td />;
      }
    }

    for (let a = 0; a < e.length; a++) {
      let rows = [];
      rows.push(
        <tr key={`${e[a].slotId}`}>
          <td>
            <img
              src={`https://img-api.neople.co.kr/df/items/${e[a].itemId}`}
              alt={`${e[a].itemName}`}
            />
          </td>
          <td className={`${e[a].itemRarity}`}>{e[a].itemName}</td>
          <Reinforce id={a} />
          <Enchant id={a} />
        </tr>
      );
      table.push(<tbody key={`${id} ${a}`}>{rows}</tbody>);
    }
  } else if (id === 2) {
    table.push(
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
    );
  }

  return (
    <div>
      <table>{table}</table>
    </div>
  );
};

export default Tables;
