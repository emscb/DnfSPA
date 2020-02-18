import React from 'react';
import "./Template.scss"

const Template = ({children}) => {
    return (
        <div className="Template">
            <div className="app-title">아이템 목록</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default Template;