import React from 'react';
import { MessageForm, MessageHeader } from 'src/components';

const MainPanel = () => {
  return (
    <div style={{ padding: '2rem 2rem 0 2rem' }}>
      <MessageHeader />
      <div
        style={{
          width: '100%',
          height: '450px',
          border: '.2rem solid #ececec',
          borderRadius: '4px',
          overflowY: 'auto',
        }}
      />
      <MessageForm />
    </div>
  );
};

export default MainPanel;
