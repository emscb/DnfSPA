import React, { useState, useEffect, useReducer, useRef } from "react";
import "./ItemDetail.scss";
import qs from "qs";
import axios from "axios";

const ItemDetail = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const id = query.itemId;
  const [itemData, setItemData] = useState({});
  const got = useRef(false);

  if (got.current === false) {
    axios
      .get(
        `https://api.neople.co.kr/df/items/${id}?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then(response => {
        setItemData(response.data);
      });
      got.current = true;
  }

  return (
    <div className="ItemDetail">
      <div className="title">아이템 상세 정보</div>
      <div className="content">
        <div className="header">
          <img src={`https://img-api.neople.co.kr/df/items/${id}`} alt="" />
          {itemData.itemName}
          {itemData.setItemId && itemData.setItemName}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
