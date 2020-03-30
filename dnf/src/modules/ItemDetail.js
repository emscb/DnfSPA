/* eslint-disable array-callback-return */
import React from "react";

const Status = ({ list }) => {
  if (list === undefined) {
    return <div />;
  } else {
    return (
      <div>
        {list.map(l => (
          <div key={l.name}>
            {l.name}: {l.value}
          </div>
        ))}
      </div>
    );
  }
};

const Thology = ({ toggle, list }) => {
  if (list === undefined) {
    return <div />;
  } else {
    let optionList = [];
    optionList.push(
      <div key="">
        <br />
        {`<신화 전용 옵션>`}
        <br />
      </div>
    );
    for (let a = 0; a < list.options.length; a++) {
      optionList.push(
        <div key={a}>
          {toggle ? list.options[a].explainDetail : list.options[a].explain}
        </div>
      );
    }
    for (let a = 0; a < list.options.length; a++) {
      optionList.push(
        <div key={a + list.options.length}>
          {toggle
            ? list.options[a].buffExplainDetail
            : list.options[a].buffExplain}
        </div>
      );
    }
    return <div>{optionList}</div>;
  }
};

const ReinforceSkill = ({ list }) => {
  if (list === undefined) {
    return <div />;
  } else {
    let skillList = [];
    for (let a = 0; a < list.length; a++) {
      if (list[a].jobName === "공통") {
        if (list[a].levelRange) {
          list[a].levelRange.map(l => {
            if (l.minLevel === l.maxLevel) {
              skillList.push(
                <div key={skillList.length}>
                  {l.minLevel} Lv 스킬 +{l.value}
                </div>
              );
            } else {
              skillList.push(
                <div key={skillList.length}>
                  {l.minLevel}~{l.maxLevel} Lv 스킬 +{l.value}
                </div>
              );
            }
          });
        } else if (list[a].skills) {
          list[a].skills.map(l => {
            skillList.push(
              <div key={l.skillId}>
                {l.name} +{l.value}
              </div>
            );
          });
        }
      } else {
        if (list[a].levelRange) {
          list[a].levelRange.map(l => {
            if (l.minLevel === l.maxLevel) {
              skillList.push(
                <div key={skillList.length}>
                  {list[a].jobName} {l.minLevel} Lv 스킬 +{l.value}
                </div>
              );
            } else {
              skillList.push(
                <div key={skillList.length}>
                  {list[a].jobName} {l.minLevel}~{l.maxLevel} Lv 스킬 +{l.value}
                </div>
              );
            }
          });
        } else if (list[a].skills) {
          list[a].skills.map(l => {
            skillList.push(
              <div key={l.skillId}>
                {list[a].jobName} {l.name} +{l.value}
              </div>
            );
          });
        }
      }
    }
    return <div key="">{skillList}</div>;
  }
};

const Buff = ({ list }) => {
  if (list === undefined) {
    return <div />;
  } else {
    let buffList = [];
    buffList.push(<div key="explainDetail">{list.explainDetail}</div>);
    if (list.reinforceSkill.length) {
      buffList.push(<br key="" />);
      for (let a = 0; a < list.reinforceSkill.length; a++) {
        for (let b = 0; b < list.reinforceSkill[a].skills.length; b++) {
          buffList.push(
            <div key={list.reinforceSkill[a].skills[b].skillId}>
              {list.reinforceSkill[a].skills[b].name} +
              {list.reinforceSkill[a].skills[b].value}
            </div>
          );
        }
      }
    }
    return <div>{buffList}</div>;
  }
};

const Remodel = ({ list }) => {
  if (list === undefined) {
    return <div />;
  } else {
    let stepList = [];
    stepList.push(
      <div key="remodelExplain">
        <br />
        {list.explain}
      </div>
    );
    for (let a = 0; a < list.stepInfo.length; a++) {
      let info = list.stepInfo[a];
      if (a !== list.stepInfo.length) {
        stepList.push(<br key={`${a}br`} />);
      }
      stepList.push(
        <div key={info.step}>
          {`<장비개조 ${info.step}단계>`}
          <br />
          {info.explain}
        </div>
      );
    }
    return <div>{stepList}</div>;
  }
};

const SetItemList = ({ list }) => {
  if (list === undefined) {
    return <div />;
  } else {
    let itemList = [];
    for (let a = 0; a < list.length; a++) {
      itemList.push(
        <div key={list[a].itemId}>
          <a
            href={list[a].itemId}
            style={{ color: "black", textDecoration: "none" }}
          >
            {list[a].itemName}
          </a>
        </div>
      );
    }
    return <div>{itemList}</div>;
  }
};

const SetItemOption = ({ toggle, list }) => {
  if (list === undefined) {
    return <div />;
  } else {
    let optionList = [];
    for (let a = 0; a < list.length; a++) {
      optionList.push(
        <div key={list[a].optionNo}>
          {`<${list[a].optionNo}세트 효과>`}
          <br />
          {toggle
            ? list[a].detailExplain
              ? list[a].detailExplain
              : list[a].explain
            : list[a].explain}
        </div>
      );
      if (list[a].status) {
        for (let b = 0; b < list[a].status.length; b++) {
          let n = list[a].status[b];
          optionList.push(
            <div key={`${n.name} ${list[a].optionNo}`}>
              {n.name} +{n.value}
            </div>
          );
        }
      } else if (list[a].reinforceSkill) {
        optionList.push(<ReinforceSkill list={list[a].reinforceSkill} />);
      }

      if (a !== list.length - 1) {
        optionList.push(
          <div key={`${a}`}>
            <br />
          </div>
        );
      }
    }
    return <div>{optionList}</div>;
  }
};

const CardInfo = ({ list }) => {
  if (list === undefined) {
    return <div />;
  } else {
    let optionList = [];
    // 어느 부위인지
    for (let a = 0; a < list.slots.length; a++) {
      optionList.push(<div>{list.slots[a].slotName} 마법부여</div>);
      optionList.push(<br />);
    }
    // 업그레이드가 가능한지
    if (list.enchant[0].explain !== undefined) {
      // 업글 불가능
      optionList.push(<div>{list.enchant[0].explain}</div>);
    } else {
      // 업글에 따른 옵션
      for (let a = 0; a < list.enchant.length; a++) {
        optionList.push(
          <div>
            {list.enchant[a].upgrade}/{list.enchant.length - 1} 업그레이드
          </div>
        );
        list.enchant[a].status.map(m => {
          optionList.push(
            <div>
              {m.name} +{m.value}
            </div>
          );
        });
        if (a !== list.enchant.length - 1) {
          optionList.push(<br />);
        }
      }
    }

    return <div>{optionList}</div>;
  }
};

export {
  Status,
  Thology,
  ReinforceSkill,
  Buff,
  Remodel,
  CardInfo,
  SetItemList,
  SetItemOption
};
