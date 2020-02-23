import React, { useState, useRef } from "react";
import "./ItemDetail.scss";
import qs from "qs";
import axios from "axios";

const ItemDetail = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const id = query.itemId;
  const [i, setItemData] = useState({}); // TODO: 리듀서로 한번에 잡아보기
  const [list, setList] = useState([]);
  const got = useRef(false);

  if (got.current === false) {
    axios
      .get(
        `https://api.neople.co.kr/df/items/${id}?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then(response => {
        setItemData(response.data);
        console.log(response.data);
        setList(response.data.itemStatus);
        console.log(response.data.itemStatus);
      });
    got.current = true;
  }

  function Sts ({list}) {
    return (
      <div>
        {list.map(l => <div>{l.name}</div>)}
      </div>
    )
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
          {i.itemRarity} {i.itemTypeDetail}
          <br />
          {`레벨제한: ${i.itemAvailableLevel}`}
          <br />
          <br />
          <Sts list={list}></Sts>
          <div style={{whiteSpace: "pre-line"}} className="obtainInfo">{i.itemObtainInfo}</div>
          <br />

        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
