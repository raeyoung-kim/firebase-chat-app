import React from 'react';
import { MainPanel, SidePanel } from 'src/containers';

const MainPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 300, minWidth: 275 }}>
        <SidePanel />
      </div>
      <div style={{ width: '100%' }}>
        <MainPanel />
      </div>
    </div>
  );
};

export default MainPage;
