import React, { useState, useRef } from "react";
import axios from "axios";
import "./CharDetail.scss";
import cheerio from "cheerio";
import Tabs from "./CharDetailTabs";
import Tables from "./CharDetailTables";

const CharDetail = ({ match }) => {
  const { server, charId } = match.params;
  const id = charId;
  const [e, setEquipment] = useState({});
  const [avatar, setAvatar] = useState({});
  const gotData = useRef(false);
  const [dundamInfo, setDundamInfo] = useState([]);
  const [tab, setTab] = useState(1);

  if (gotData.current === false) {
    // 장착 장비 조회
    axios
      .get(
        `https://api.neople.co.kr/df/servers/${server}/characters/${id}/equip/equipment?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then(response => {
        setEquipment(response.data);
      });

    // 장착 아바타 조회
    axios
      .get(
        `https://api.neople.co.kr/df/servers/${server}/characters/${id}/equip/avatar?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then(response => {
        setAvatar(response.data);
        console.log(response.data.avatar);
      });
    // 던담 정보 긁어오기
    axios
      .get(
        `http://dundam.xyz/view.jsp?server=${server}&name=${e.characterName}&image=${id}`
      )
      .then(response => {
        const $ = cheerio.load(response.data);
        const isBuffer = $(
          "#Present > table > tbody > tr:nth-child(5) > td:nth-child(2)"
        ).length;
        if (isBuffer === 1) {
          const list = $(
            "#Present > table > tbody > tr:nth-child(5) > td:nth-child(2)"
          );
          setDundamInfo([
            <div key="dundamBuff">버프 : {list[0].childNodes[0].data}</div>
          ]);
        } else {
          const list = $(
            "#rogen > table > tbody > tr:nth-child(13) > td:nth-child(3)"
          );
          setDundamInfo([
            <div key="dundamRogen">로젠 1시 : {list[0].childNodes[0].data}</div>
          ]);
        }
      });

    gotData.current = true;
  }

  const onClick = id => {
    // 받아온 id로 어떤 컴포넌트를 그릴지 정해야 함
    setTab(id);
  };

  return (
    e.characterName !== undefined && (
      <div>
        <div className="CharDetail">
          <div className="simpleInfo">
            {/* 사진, 직업 등 간단한 정보 */}
            <div className="charImg">
              <img
                src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${id}?zoom=2`}
                alt={`${e.characterName}`}
              />
            </div>
            <div className="info">
              {/* 직업, 길드, 로젠 1시 딜, 버프력 등 */}
              {e.adventureName}
              <br />
              {e.jobGrowName}
              <br />
              {e.guildName}
              <br />
              {dundamInfo}
            </div>
          </div>
          <div className="detailInfo">
            {/* 나머지 전부 */}
            <div className="tab">
              {/* 장착 장비, 아바타, 휘장 등 바꿀 수 있게 탭 */}
              <Tabs onClick={onClick} />
            </div>
            <div className="table">
              {/* 내용 표시 (테이블 형태) 
                내용에 따라 컴포넌트를 위에서 그려놓는게 좋을 듯*/}
              <Tables id={tab} info={e} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CharDetail;
