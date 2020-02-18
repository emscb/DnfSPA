import React from 'react';
import "./ListItem.scss"

const ListItem = ({item}) => {
    const {id, name} = item;
    const content = `${id} : ${name}`

    return (
        <div className="ListItem">
            {content}
        </div>
    );
};

export default ListItem;