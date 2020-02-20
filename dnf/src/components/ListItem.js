import React from 'react';
import "./ListItem.scss"
import { Link } from 'react-router-dom';

const ListItem = ({item}) => {
    const {id, name} = item;
    const content = `${name}`;

    return (
        <div className="ListItem">
            <Link to={`${name}`}>{content}</Link>
        </div>
    );
};

export default ListItem;