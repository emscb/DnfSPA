import React, { useState, useRef } from "react";
import "./ItemDetail.scss";
import qs from "qs";
import axios from "axios";

const ItemDetail = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const id = query.itemId;
  const [i, setItemData] = useState({});
  const got = useRef(false);

  if (got.current === false) {
    axios
      .get(
        `https://api.neople.co.kr/df/items/${id}?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then(response => {
        setItemData(response.data);
        console.log(response.data);
      });
    got.current = true;
  }

  function Status({ list }) {
    if (list === undefined) {
      return <div />;
    } else {
      return (
        <div>
          {list.map(l => (
            <div key={l.name}>
              {l.name}: {l.value}
            </div>
          ))}
        </div>
      );
    }
  }

  function Thology({ list }) {
    if (list === undefined) {
      return <div />;
    } else {
      let optionList = [];
      for (let a = 0; a < list.options.length; a++) {
        optionList.push(<div key={a}>{list.options[a].explainDetail}</div>);
      }
      for (let a = 0; a < list.options.length; a++) {
        optionList.push(
          <div key={a + list.options.length}>
            {list.options[a].buffExplainDetail}
          </div>
        );
      }
      return (
        <div>
          {optionList}
          <br />
        </div>
      );
    }
  }

  function Buff({ list }) {
    if (list === undefined) {
      return <div />;
    } else {
      let buffList = [];
      buffList.push(<div key="explainDetail">{list.explainDetail}</div>);
      if (list.reinforceSkill.length) {
        buffList.push(<br key="" />);
        for (let a = 0; a < list.reinforceSkill.length; a++) {
          for (let b = 0; b < list.reinforceSkill[a].skills.length; b++) {
            buffList.push(
              <div key={list.reinforceSkill[a].skills[b].skillId}>
                {list.reinforceSkill[a].skills[b].name} +
                {list.reinforceSkill[a].skills[b].value}
              </div>
            );
          }
        }
      }
      return (
        <div>
          {buffList}
          <br />
        </div>
      );
    }
  }

  return (
    <div className="ItemDetail">
      <div className="title">아이템 상세 정보</div>
      <div className="content">
        <div className="header">
          <img src={`https://img-api.neople.co.kr/df/items/${id}`} alt="" />
          <span className="name">
            {i.itemName}
            <br />
            {i.setItemId && i.setItemName}
          </span>
        </div>
        <div className="body">
          <div className="changeDetail">
            <button>자세히 보기</button>
          </div>
          {i.itemRarity} {i.itemTypeDetail}
          <br />
          {`레벨제한: ${i.itemAvailableLevel}`}
          <br />
          <br />
          <Status list={i.itemStatus} />
          <br />
          <div style={{ whiteSpace: "pre-line" }}>{i.itemExplainDetail}</div>
          <br />
          <Buff list={i.itemBuff} />
          <Thology list={i.mythologyInfo} />
          <div style={{ whiteSpace: "pre-line" }}>{i.itemObtainInfo}</div>
          <br />
          {i.itemFlavorText}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
