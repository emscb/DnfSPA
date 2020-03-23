import React, { useState } from "react";
import "./SearchChar.scss";
import Search from "./Search";
import axios from "axios";
import Helmet from "react-helmet";

// 캐릭터 검색 창 (세부 정보x)
const SearchChar = ({ history }) => {
  const [message, setMessage] = useState("");
  const onSearch = name => {
    try {
      axios
        .get(
          `https://api.neople.co.kr/df/servers/all/characters?characterName=${name}&wordType=full&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
        )
        .then(response => {
          if (response.data.rows.length === 0) {
            setMessage("검색 결과가 없습니다.");
          } else if (response.data.rows.length === 1) {
            // 바로 캐릭터 상세 페이지로
            setMessage("");
            history.push(
              `/searchChar/info/${response.data.rows[0].serverId}/${response.data.rows[0].characterId}`
            );
          } else {
            // 검색 결과 캐릭터 목록 페이지로
            setMessage("");
            history.push(`/searchChar/result/all/${name}`);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="SearchChar">
      <Helmet>
        <title>캐릭터 검색</title>
      </Helmet>
      <div className="app-title">캐릭터 검색</div>
      <Search onSearch={onSearch} type="캐릭터" />
      <div className="message">
        <u>{message}</u>
      </div>
    </div>
  );
};

export default SearchChar;
