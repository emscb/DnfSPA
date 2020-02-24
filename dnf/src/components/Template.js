import React, { useState } from "react";
import "./Template.scss";
import Search from "./Search";
import List from "./List";
import axios from "axios";

const Template = ({ children }) => {
  // API 호출하여 아이템 검색
  const [items, setItems] = useState([]);
  const onSearch = name => {
    try {
      axios
        .get(
          `https://api.neople.co.kr/df/items?itemName=${name}&wordType=front&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
        )
        .then(response => {
          if (response.data.rows === []) {
          } else {
            var list = [];
            response.data.rows.map(row =>
              list.push({id: row.itemId, name: row.itemName})
            );
            setItems(list);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="Template">
      <div className="app-title">아이템 검색</div>
      <Search onSearch={onSearch} />
      <List items={items} />
    </div>
  );
};

export default Template;
