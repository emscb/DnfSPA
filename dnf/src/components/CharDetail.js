import React, { useState, useRef } from "react";
import axios from "axios";
import "./CharDetail.scss";

const CharDetail = ({ match }) => {
  const { server, charId } = match.params;
  const id = charId;
  const [c, setCharData] = useState({});
  const gotData = useRef(false);

  if (gotData.current === false) {
    axios
      .get(
        `https://api.neople.co.kr/df/servers/${server}/characters/${id}?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then(response => {
        setCharData(response.data);
        console.log(response.data);
      });
    // 던담 정보 긁어오기
    gotData.current = true;
  }

  return (
    c.characterName !== undefined && (
      <div>
        <div className="CharDetail">
          <div className="simpleInfo">
            {/* 사진, 직업 등 간단한 정보 */}
            <div className="charImg">
              <img
                src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${id}?zoom=2`}
                alt={`${c.characterName}`}
                style={{margin: "0px"}}
              />
            </div>
            <div className="info">
            {/* 직업, 길드, 로젠 1시 딜, 버프력 등 */}
            {c.adventureName}<br />
            {c.jobGrowName}<br />
            {c.guildName}
            </div>
          </div>
          <div className="detailInfo"> {/* 나머지 전부 */}
            <div className="tab">
              {/* 장착 장비, 아바타, 휘장 등 바꿀 수 있게 탭 */}
            </div>
            <div className="table">
              {/* 내용 표시 (테이블 형태) 
                내용에 따라 컴포넌트를 위에서 그려놓는게 좋을 듯*/}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CharDetail;
