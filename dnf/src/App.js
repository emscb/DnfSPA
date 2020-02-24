import React, { useState, useCallback } from 'react';
import SearchItem from './components/SearchItem';
import { Route } from 'react-router-dom';
import ItemDetail from './components/ItemDetail';
import Menu from './components/Menu';

function App() {
  return (
    <div>
      <Menu />
      <Route path="/" component={SearchItem} exact />
      <Route path="/searchItem" exact component={SearchItem} />
      <Route path="/searchItem/:itemId" component={ItemDetail} />
    </div>
  );
}

export default App;
