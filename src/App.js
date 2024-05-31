import './App.css';
import React from 'react';
import Header from "./component/header";
import SearchGroup from './component/search_group';
import UpdateAlert from './component/update_alert';

function App() {

  return (
    <React.Fragment>
      <Header />
      <UpdateAlert />
      <SearchGroup />
    </React.Fragment>
  );
}

export default App;