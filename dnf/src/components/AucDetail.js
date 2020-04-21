import React, { useRef, useState, useEffect } from "react";
import Axios from "axios";
import "./AucDetail.scss";
import Helmet from "react-helmet";

var reslist, reslist2;
const crawl = async (id) => {
  try {
    reslist = await Axios.get(
      `https://api.neople.co.kr/df/auction?itemId=${id}&sort=unitPrice:asc&limit=400&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
    );
    console.log(reslist.data.rows);

    reslist2 = await Axios.get(
      `https://api.neople.co.kr/df/items/${id}?apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
    );
    console.log(reslist2.data);
  } catch (e) {
    console.error(e);
  }
};

const AucDetail = ({ match, history }) => {
  const { itemId } = match.params;
  const id = itemId;
  const [list, setList] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);
  const [upgrade, setUpgrade] = useState(-1);

  // DB에 데이터 쌓기
  const date = new Date();
  let thatday;
  if (date.getHours() < 6) {
    thatday = `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getDate() - 2
    }`;
  } else {
    thatday = `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getDate() - 1
    }`;
  }

  const saveToDB = () => {
    try {
      Axios.post(`http://localhost:4000/api/auc/${id}`, {
        date: thatday,
        itemName: itemInfo.itemName,
        itemId: itemInfo.itemId,
        avgPrice: list[0].averagePrice,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    crawl(id).then(() => {
      setList(reslist.data.rows);
      setItemInfo(reslist2.data);
      saveToDB();
    });
  }, [id]);

  const ItemImg = () => (
    <img
      src={`https://img-api.neople.co.kr/df/items/${itemId}`}
      alt=""
      style={{ cursor: "pointer" }}
      onClick={() => {
        history.push(`/searchItem/${itemId}`);
      }}
    />
  );

  // 그래프 그리기

  // 가장 싼 요일, 가장 비싼 요일 계산하기

  var isStackable = itemInfo.itemType === "스태커블";
  if (list.length === 0) {
    return (
      <div
        style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "400" }}
      >
        등록된 매물이 없습니다.
      </div>
    );
  } else {
    const Table = ({ upgrade }) => {
      var table = [
        <thead key="thead">
          <tr>
            <th></th>
            <th>아이템</th>
            {isStackable && <th>개수 (EA)</th>}
            <th>개당 가격</th>
            <th>총 가격</th>
            <th>어제 평균가</th>
            <th>남은 시간</th>
          </tr>
        </thead>,
      ];

      table.push(
        <tbody key="tbody">
          {list.map(
            (l) =>
              (upgrade === -1 ? true : upgrade === l.upgrade) && (
                <tr key={`${l.auctionNo}`}>
                  <td>
                    <ItemImg />
                  </td>
                  <td>
                    <span style={{ margin: "0px 5px" }}>
                      {itemInfo.itemName}
                    </span>
                    {/* 만약 업그레이드가 가능한 카드라면 */}
                    {itemInfo.cardInfo !== undefined &&
                      itemInfo.cardInfo.enchant[0].explain === undefined && (
                        <span>
                          {l.upgrade}/{itemInfo.cardInfo.enchant.length - 1}
                        </span>
                      )}
                  </td>
                  {isStackable && <td>{l.count}</td>}
                  <td>{l.unitPrice.toLocaleString()}</td>
                  <td>{l.currentPrice.toLocaleString()}</td>
                  <td>{l.averagePrice.toLocaleString()}</td>
                  <td>
                    {parseInt(
                      (Date.parse(l.expireDate) - Date.now()) / 3600000
                    )}
                    시간
                  </td>
                </tr>
              )
          )}
        </tbody>
      );
      return <table>{table}</table>;
    };

    const ButtonList = () => {
      if (
        itemInfo.cardInfo !== undefined &&
        itemInfo.cardInfo.enchant[0].explain === undefined
      ) {
        let buttonList = [
          <button key="all" onClick={() => setUpgrade(-1)}>
            전체
          </button>,
        ];
        for (let u = 0; u < itemInfo.cardInfo.enchant.length; u++) {
          buttonList.push(
            <button key={u} onClick={() => setUpgrade(u)}>
              {u === itemInfo.cardInfo.enchant.length - 1
                ? `풀업글`
                : `${u}업글`}
            </button>
          );
        }
        return <div>{buttonList}</div>;
      } else {
        return <div />;
      }
    };

    return (
      itemInfo.itemName !== undefined && (
        <div>
          <Helmet>
            <title>{itemInfo.itemName} 검색 결과</title>
          </Helmet>
          {itemInfo.cardInfo !== undefined &&
            itemInfo.cardInfo.enchant[0].explain === undefined && (
              <div className="chooseUpgrade">
                <ButtonList />
              </div>
            )}
          <div className="auclist">
            <Table upgrade={upgrade} />
          </div>
        </div>
      )
    );
  }
};

export default AucDetail;
