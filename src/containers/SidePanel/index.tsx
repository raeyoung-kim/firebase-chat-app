import React from 'react';
import { ChatRooms, DirectMessage, Favorited, User } from 'src/components';

const SidePanel = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgb(79, 98, 148)',
        padding: '2rem',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <User />
      <Favorited />
      <ChatRooms />
      <DirectMessage />
    </div>
  );
};

export default SidePanel;
