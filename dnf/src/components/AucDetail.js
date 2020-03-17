import React, { useRef, useState } from "react";
import Axios from "axios";
import "./AucDetail.scss";

const AucDetail = ({ match }) => {
  const { itemId } = match.params;
  const id = itemId;
  const gotData = useRef(false);
  const [list, setList] = useState([]);
  const [itemInfo, setItemInfo] = useState({});

  if (!gotData.current) {
    Axios.get(
      `https://api.neople.co.kr/df/auction?itemId=${id}&sort=unitPrice:asc&limit=30&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
    ).then(response => {
      console.log(response.data.rows);
      setList(response.data.rows);
    });

    Axios.get(
      `https://api.neople.co.kr/df/items/${id}?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
    ).then(response => {
      console.log(response.data);
      setItemInfo(response.data);
    });

    gotData.current = true;
  }

  const ItemImg = ({ id }) => (
    <img src={`https://img-api.neople.co.kr/df/items/${itemId}`} alt="" />
  );

  var isStackable = itemInfo.itemType === "스태커블";
  var table = [
    <thead key="thead">
      <tr>
        <th>아이템</th>
        {isStackable && <th>개수 (EA)</th>}
        <th>개당 가격</th>
        <th>총 가격</th>
        <th>어제 평균가</th>
      </tr>
    </thead>
  ];
  if (list.length === 0) {
    return <div>등록된 매물이 없습니다.</div>;
  } else {
    table.push(
      <tbody>
        {list.map(l => (
          <tr>
            <td>
              <ItemImg /> {itemInfo.itemName}
            </td>
            {isStackable && <td>{l.count}</td>}
            <td>{l.unitPrice}</td>
            <td>{l.currentPrice}</td>
            <td>{l.averagePrice}</td>
          </tr>
        ))}
      </tbody>
    );
    return <table className="auclist">{table}</table>;
  }
};

export default AucDetail;
