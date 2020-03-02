import React from "react";

const Tabs = ({ onClick }) => {
  const tabs = [
    { id: 1, name: "장착 장비" },
    { id: 2, name: "아바타" },
    { id: 3, name: "버프 강화" }
  ];
  return <div className="tabs">
      {tabs.map(i => (<button key={i.id} onClick={() => {onClick(i.id)}}>{i.name}</button>))}
  </div>;
};

export default Tabs;
