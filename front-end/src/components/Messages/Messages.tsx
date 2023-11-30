import React from 'react';

const Messages = ({ messages }: any) => {
  // console.log(messages);

  const messagesToDisplay = messages.slice(2);
  
  console.log({messagesToDisplay});

  return (
    <div>
      {messages.map((message: any, index: number) => (
        <div key={index}>{message.content}</div>
      ))}
    </div>
  );
}

export default Messages;
