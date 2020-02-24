import React, { useState, useCallback } from 'react';
import Template from './components/Template';
import { Route } from 'react-router-dom';
import ItemDetail from './components/ItemDetail';
import Menu from './components/Menu';

function App() {
  return (
    <div>
      <Menu />
      <Route path="/" component={Template} exact={true} />
      <Route path="/searchItem/" exact component={Template} />
      <Route path="/searchItem/:itemId" component={ItemDetail} />
    </div>
  );
}

export default App;
