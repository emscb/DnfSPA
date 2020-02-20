import React from 'react';
import Template from './components/Template';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route path="/" component={Template} exact={true} />
      <Route path="/:kind" component={Template} />
    </div>
  );
}

export default App;
