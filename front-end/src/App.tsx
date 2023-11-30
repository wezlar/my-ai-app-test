import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.css';

import Messages from './components/Messages/Messages';

interface IAskTheBot {
  previousMessages?: object[];
  newMessage?: string;
}

const AskTheBot = async ({previousMessages, newMessage}: IAskTheBot = {}) => {
  const res = await fetch('http://localhost:3001', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ previousMessages, newMessage }),
  });

  const data = await res.json();
  return data;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState([]);

  // get initial message from the back-end
  useEffect(() => {
    async function fetchData() {
      const data = await AskTheBot();
      setMessages(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    // load spinner so we can see something is happening
    const spinner = document.querySelector('.lds-hourglass') as HTMLElement;
    spinner.style.display = 'block';
    
    // disable the submit button while the bot is working
    const submitButton = document.querySelector('#submitButton') as HTMLElement;
    submitButton.setAttribute('disabled', 'true');
    
    const newMessageInput = document.getElementById('newMessage') as HTMLInputElement;
    const data = await AskTheBot({ previousMessages: messages, newMessage: newMessageInput?.value });
    setMessages(data);

    // reset everythin
    newMessageInput.value = '';
    spinner.style.display = 'none';
    submitButton.setAttribute('disabled', 'false');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Botty</h1>
      </header>
      <main>
        <div><Messages messages={messages} /></div>
        <div className="lds-hourglass" />
        <label>
          Ask: <input type="text" placeholder="Ask me something" id="newMessage" />
        </label>
        <button id="submitButton" onClick={handleSubmit}>Submit</button>
      </main>
    </div>
  );
}

export default App;