import React from 'react';
import Template from './components/Template';
import { Route } from 'react-router-dom';
import ItemDetail from './components/ItemDetail';

function App() {
  return (
    <div>
      <Route path="/" component={Template} exact={true} />
      <Route path="/itemDetail" component={ItemDetail} />
    </div>
  );
}

export default App;
