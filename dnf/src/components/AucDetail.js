import React, { useRef, useState } from "react";
import Axios from "axios";
import "./AucDetail.scss";
import Helmet from "react-helmet";

const AucDetail = ({ match }) => {
  const { itemId } = match.params;
  const id = itemId;
  const gotData = useRef(false);
  const [list, setList] = useState([]);
  const [itemInfo, setItemInfo] = useState({});

  if (!gotData.current) {
    Axios.get(
      `https://api.neople.co.kr/df/auction?itemId=${id}&sort=unitPrice:asc&limit=50&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
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

  // 그래프 그리기

  // 가장 싼 요일, 가장 비싼 요일 계산하기

  var isStackable = itemInfo.itemType === "스태커블";
  var table = [
    <thead key="thead">
      <tr>
        <th></th>
        <th>아이템</th>
        {isStackable && <th>개수 (EA)</th>}
        <th>개당 가격</th>
        <th>총 가격</th>
        <th>어제 평균가</th>
        <th>남은 시간</th>
      </tr>
    </thead>
  ];
  if (list.length === 0) {
    return (
      <div
        style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "400" }}
      >
        등록된 매물이 없습니다.
      </div>
    );
  } else {
    table.push(
      <tbody key="tbody">
        {list.map(l => (
          <tr key={`${l.auctionNo}`}>
            <td>
              <ItemImg />
            </td>
            <td>
              <span style={{ margin: "0px 5px" }}>{itemInfo.itemName}</span>
              {/* 만약 업그레이드가 가능한 카드라면 */}
              {itemInfo.cardInfo !== undefined &&
                itemInfo.cardInfo.enchant[0].explain === undefined && (
                  <span>
                    {l.upgrade}/{itemInfo.cardInfo.enchant.length - 1}
                  </span>
                )}
            </td>
            {isStackable && <td>{l.count}</td>}
            <td>{l.unitPrice.toLocaleString()}</td>
            <td>{l.currentPrice.toLocaleString()}</td>
            <td>{l.averagePrice.toLocaleString()}</td>
            <td>
              {parseInt((Date.parse(l.expireDate) - Date.now()) / 3600000)}
              시간
            </td>
          </tr>
        ))}
      </tbody>
    );
    return <div>
      <Helmet>
        <title>
          {itemInfo.itemName} 검색 결과
        </title>
      </Helmet>
      <table className="auclist">{table}</table>
    </div>
  }
};

export default AucDetail;
