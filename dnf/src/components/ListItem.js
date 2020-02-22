import React from "react";
import "./ListItem.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const ListItem = ({ item }) => {
  const content = `${item.name}`;

  return (
    <div className="ListItem">
      <img src={`https://img-api.neople.co.kr/df/items/${item.id}`} alt="" />
      <Link
        style={{ color: "black", textDecoration: "none" }}
        to={`itemDetail?itemId=${item.id}`}
      >
        {content}
      </Link>
    </div>
  );
};

export default ListItem;
