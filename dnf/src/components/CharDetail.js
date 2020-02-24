import React, { useState, useRef } from "react";
import axios from "axios";
import "./CharDetail.scss"

const CharDetail = ({ match }) => {
  const { charId } = match.params;
  const id = charId;
  const [c, setCharData] = useState({});
  const gotData = useRef(false);

  if (gotData.current === false) {
    axios.get(`${id}`).then(response => {
      setCharData(response.data);
      console.log(response.data);
    });
    gotData.current = true;
  }

  return c.charName !== undefined && (<div>
      <div className="CharDetail">
          <div className="simpleInfo"> {/* 사진, 직업 등 간단한 정보 */}
            {/* 캐릭터 이미지 */}
            <img src={``} alt="캐릭터 이름" />
            {/* 직업, 길드, 로젠 1시 딜, 버프력 등 */}
          </div>
          <div className="detailInfo"> {/* 나머지 전부 */}
            <div className="">
                {/* 장착 장비, 아바타, 휘장 등 바꿀 수 있게 탭 */}
            </div>
            <div className="">
                {/* 내용 표시 (테이블 형태) 
                내용에 따라 컴포넌트를 위에서 그려놓는게 좋을 듯*/}
            </div>
          </div>
      </div>
  </div>);
};

export default CharDetail;
