import React from "react";
import "./ListItem.scss";
import { Link } from "react-router-dom";

const ListItem = ({ item, trade }) => {
  const content = `${item.name}`;
  const linkto = trade ? `searchAuc/${item.id}` : `searchItem/${item.id}`;

  return (
    <div className="ListItem">
      <img src={`https://img-api.neople.co.kr/df/items/${item.id}`} alt="" />
      <Link
        style={{ color: "black", textDecoration: "none" }}
        to={linkto}
      >
        {content}
      </Link>
    </div>
  );
};

export default ListItem;
