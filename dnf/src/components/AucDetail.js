import React, { useRef, useState } from "react";
import Axios from "axios";
import "./AucDetail.scss";

const AucDetail = ({ match }) => {
  const { itemId } = match.params;
  const id = itemId;
  const gotData = useRef(false);
  const [list, setList] = useState([]);

  if (!gotData.current) {
    Axios.get(
      `https://api.neople.co.kr/df/auction?itemId=${id}&sort=unitPrice:asc&limit=30&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
    ).then(response => {
      console.log(response.data.rows);
      setList(response.data.rows);
    });
    gotData.current = true;
  }

  var table = [
    <thead>
      <tr>
        <th>아이템</th>
        <th></th>
      </tr>
    </thead>
  ];
  if (list.length === 0) {
    return <div>등록된 매물이 없습니다.</div>;
  } else {
    table.push()
  }

  return <div></div>;
};

export default AucDetail;
