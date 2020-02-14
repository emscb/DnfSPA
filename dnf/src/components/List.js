import React from 'react';
import "./List.scss"
import ListItem from './ListItem';

const List = ({ items }) => {
    
    
    return (
        <div className="List">
            {items.map(item => (<ListItem item={item} key={item.id}/>))}        
        </div>
    );
};

export default List;