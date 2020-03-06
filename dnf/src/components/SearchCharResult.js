import React, { useState, useRef } from "react";
import axios from "axios";
import "./SearchCharResult.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect } from "react";

const SearchCharResult = ({ match, history }) => {
  /* 제일 위에 "____ 서버에 대한 _____ 검색 결과입니다."
    서버는 콤보 박스로. 바꾸면 페이지 다시 그리게

    목록에는 캐릭터 이미지와 서버, 이름만 나오게
    */
  const { server, name } = match.params;
  const [charServer, setCharServer] = useState(server);
  const [charName, setCharName] = useState(name);
  const [list, setList] = useState([]);
  const gotData = useRef(false);
  const servers = {
    anton: "안톤",
    bakal: "바칼",
    cain: "카인",
    casillas: "카시야스",
    diregie: "디레지에",
    hilder: "힐더",
    prey: "프레이",
    siroco: "시로코",
    all: "모든"
  };

  useEffect(() => {
    gotData.current = false;
  }, [charServer, charName]);

  if (gotData.current === false) {
    axios
      .get(
        `https://api.neople.co.kr/df/servers/${charServer}/characters?characterName=${charName}&wordType=full&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then(response => {
        console.log(response.data.rows);
        setList(response.data.rows);
      });

    gotData.current = true;
  }

  function Dropdown({ serverList }) {
    return (
      <div>
        {Object.keys(serverList).map(s => (
          <div>{serverList[s]}</div>
        ))}
      </div>
    );
  }

  function ResultList({ list }) {
    var lists = [];
    for (let a = 0; a < list.length; a++) {
      lists.push(
        <div
          className="char"
          key={`char${a}`}
          onClick={e => {
            history.push(
              `/searchChar/info/${list[a].serverId}/${list[a].characterId}`
            );
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="charImage" key="charImage">
            <img
              src={`https://img-api.neople.co.kr/df/servers/${list[a].serverId}/characters/${list[a].characterId}?zoom=1`}
              alt={`${list[a].characterName}`}
            />
          </div>
          <div className="charSimpleInfo" key="charSimpleInfo">
            <b>{servers[list[a].serverId]}</b> {list[a].characterName}
            <br />
            Lv.{list[a].level} {list[a].jobGrowName}
          </div>
        </div>
      );
    }
    return <div className="results">{lists}</div>;
  }

  return (
    <div className="ResultPage">
      <div className="combobox">
        <span className="dropdown">
          {servers[charServer]}
          <IoIosArrowDown />{" "}
          <div className="dropdown-content">
            <Dropdown serverList={servers} />
          </div>
        </span>
        서버에 대한{" "}
        <input
          className="input"
          value={charName}
          onChange={e => {
            setCharName(e.target.value);
          }}
        />{" "}
        검색 결과입니다.
      </div>
      <div>
        <ResultList list={list} />
      </div>
    </div>
  );
};

export default SearchCharResult;
