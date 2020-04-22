import React, { useState, useRef } from "react";
import "./ItemDetail.scss";
import axios from "axios";
import Helmet from "react-helmet";
import {
  Status,
  Remodel,
  ReinforceSkill,
  Buff,
  Thology,
  CardInfo,
  SetItemList,
  SetItemOption,
} from "../modules/ItemDetail";

const ItemDetail = ({ match }) => {
  const { itemId } = match.params;
  const id = itemId;
  const [i, setItemData] = useState({});
  const [s, setSetData] = useState({});
  const gotData = useRef(false);
  const gotSetData = useRef(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [viewSet, setViewSet] = useState(true);
  const [width, setWidth] = useState({
    width: "712px",
    marginRight: "auto",
    marginLeft: "auto",
  });

  if (gotData.current === false) {
    axios
      .get(
        `https://api.neople.co.kr/df/items/${id}?wordType=full&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then((response) => {
        setItemData(response.data);
      });
    gotData.current = true;
  }

  if (!gotSetData.current && i.setItemId) {
    axios
      .get(
        `https://api.neople.co.kr/df/setitems/${i.setItemId}?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
      )
      .then((response) => {
        setSetData(response.data);
      });
    gotSetData.current = true;
  }

  const onClickDetail = () => {
    setViewDetail(!viewDetail);
  };

  const onClickSet = () => {
    setViewSet(!viewSet);
    if (!viewSet) {
      setWidth({
        width: "1012px",
        marginRight: (window.innerWidth - 712) / 2 - 300 + "px",
        marginLeft: "595.5px",
      });
    } else {
      setWidth({
        width: "712px",
        marginRight: "auto",
        marginLeft: "auto",
      });
    }
  };

  return (
    i.itemName !== undefined && (
      <div className="ItemDetail" style={width}>
        <Helmet>
          <title>{i.itemName} 상세 정보</title>
        </Helmet>
        <div className="title">아이템 상세 정보</div>
        <div className="content">
          <div className="header">
            <img src={`https://img-api.neople.co.kr/df/items/${id}`} alt="" />
            <span className="name">
              {i.itemName}
              <br />
              {i.setItemId && i.setItemName}
            </span>
          </div>
          <div className="bodyset">
            <div className="body">
              <div className="changeDetail">
                <button onClick={onClickDetail}>
                  {viewDetail ? `간단히 보기` : `자세히 보기`}
                </button>
              </div>
              {i.setItemId && (
                <div className="changeViewSet" style={{ marginTop: "10px" }}>
                  <button onClick={onClickSet}>
                    {viewSet ? "세트 옵션 숨기기" : "세트 옵션 보기"}
                  </button>
                </div>
              )}
              {i.itemRarity} {i.itemTypeDetail}
              <br />
              {`레벨제한: ${i.itemAvailableLevel}`}
              <br />
              <br />
              <Status list={i.itemStatus} />
              <br />
              <div style={{ whiteSpace: "pre-line" }}>
                {i.itemExplain !== "" && (
                  <div>
                    {viewDetail ? i.itemExplainDetail : i.itemExplain}
                    <br />
                  </div>
                )}
              </div>
              <Remodel list={i.remodelInfo} />
              <ReinforceSkill list={i.itemReinforceSkill} />
              <Buff list={i.itemBuff} />
              <Thology toggle={viewDetail} list={i.mythologyInfo} />
              <CardInfo list={i.cardInfo} />
              {i.itemObtainInfo && (
                <div style={{ whiteSpace: "pre-line" }}>
                  <br />
                  {i.itemObtainInfo}
                </div>
              )}
              {i.itemFlavorText && (
                <div>
                  <br />
                  {i.itemFlavorText}
                </div>
              )}
            </div>
            {i.setItemId && viewSet && (
              <div className="set">
                {s.setItemName}
                <div
                  style={{
                    borderBottom: "1px solid black",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                <SetItemList list={s.setItems} />
                <div
                  style={{
                    borderBottom: "1px solid black",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                <SetItemOption toggle={viewDetail} list={s.setItemOption} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ItemDetail;
