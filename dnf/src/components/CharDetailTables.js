import React from "react";
import "./CharDetailTables.scss";

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

    const Reinforce = ({ id }) => {
      // 차원의 능력치가 없으면
      if (equipments[id].amplificationName === null) {
        if (equipments[id].reinforce === 0) {
          if (equipments[id].refine === 0) {
            return <td></td>;
          } else {
            return <td>{equipments[id].refine}재련</td>;
          }
        } else {
          if (equipments[id].refine !== 0) {
            return (
              <td>
                <div style={{ color: "#68D5ED" }}>
                  +{equipments[id].reinforce}강화
                </div>
                <div>{equipments[id].refine}재련</div>
              </td>
            );
          } else {
            return (
              <td style={{ color: "#68D5ED" }}>
                +{equipments[id].reinforce}강화
              </td>
            );
          }
        }
      } else {
        // 증폭 있음
        if (equipments[id].refine !== 0) {
          return (
            <td>
              <div style={{ color: "#FF00FF" }}>
                +{equipments[id].reinforce}증폭
              </div>
              <div>{equipments[id].refine}재련</div>
            </td>
          );
        } else {
          return (
            <td style={{ color: "#FF00FF" }}>
              +{equipments[id].reinforce}증폭
            </td>
          );
        }
      }
    };

    const Enchant = ({ id }) => {
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
          <Reinforce id={a} />
          <Enchant id={a} />
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

    const Emblem = ({ id }) => {
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
            <Emblem id={a} />
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

    const Emblem = ({ id }) => {
      if (e.avatar[id].emblems === []) {
        return <td />;
      } else if (e.avatar[id].emblems === undefined) {
        return <td />;
      } else {
        let rows = [];
        for (let m = 0; m < e.avatar[id].emblems.length; m++) {
          rows.push(
            <div
              key={`${id} ${m}`}
              className={e.avatar[id].emblems[m].itemRarity}
            >
              {e.avatar[id].emblems[m].itemName}
            </div>
          );
        }
        return <>{rows}</>;
      }
    };
    let rows = [];
    if (e.equipment !== null) {
      for (let a = 0; a < parseInt(e.equipment.length / 2) + 1; a++) {
        rows.push(
          <tr key={2 * a}>
            {e.equipment[2 * a] !== undefined && (
              <>
                <td>
                  <img
                    src={`https://img-api.neople.co.kr/df/items/${
                      e.equipment[2 * a].itemId
                    }`}
                    alt={e.equipment[2 * a].itemName}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push(`/searchItem/${e.equipment[2 * a].itemId}`);
                    }}
                  />
                </td>
                <td className={e.equipment[2 * a].itemRarity}>
                  {e.equipment[2 * a].itemName}
                </td>
              </>
            )}
            {e.equipment[2 * a + 1] !== undefined && (
              <>
                <td>
                  <img
                    src={`https://img-api.neople.co.kr/df/items/${
                      e.equipment[2 * a + 1].itemId
                    }`}
                    alt={e.equipment[2 * a + 1].itemName}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push(
                        `/searchItem/${e.equipment[2 * a + 1].itemId}`
                      );
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
              <Emblem id={a} />
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
