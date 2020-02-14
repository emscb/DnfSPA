import React, { useState, useRef } from 'react';
import Template from './components/Template';
import List from './components/List';
import Insert from './components/Insert';

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "머리어깨"
    },
    {
      id: 2,
      name: "상의"
    },
    {
      id: 3,
      name: "하의"
    },
    {
      id: 4,
      name: "벨트"
    },
    {
      id: 5,
      name: "신발"
    }
  ]);
  const nextId = useRef(6);

  const onInsert = (name) => {
    setItems(items.concat(
      {
        id: nextId.current,
        name
      })
    );
    nextId.current += 1;
  }
  
  return (
    <div>
      <Template>
        <Insert onInsert={onInsert}/>
        <List items={items}/>
      </Template>
    </div>
  );
}

export default App;
