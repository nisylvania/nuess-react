import './App.css';
import React from 'react';
import Header from "./component/header";
import SearchGroup from './component/search_group';
import UpdateAlert from './component/update_alert';

function App() {

  return (
    <div className="App">
      <Header />
      <UpdateAlert />
      <SearchGroup />
    </div>
  );
}

export default App;