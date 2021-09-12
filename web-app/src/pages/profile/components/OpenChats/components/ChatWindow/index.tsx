import React, { useEffect, useState, useRef } from 'react';

import { getChatById, sendMessage } from '../../../../../../store/chat/actions';
import { Chat as ChatType } from '../../../../../../types';
import Message from '../Message';

import classes from './index.module.scss';

const Chat: React.FC<{ chatId: string }> = (props) => {
  const [chatObject, setChatObject] = useState<ChatType | null>();
  const [messages, setMessages] = useState<
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >[]
    | undefined
  >([]);
  const [messageInputValue, setMessageInputValue] = useState<string>('');

  useEffect(() => {
    (async () => {
      const newChat = await getChatById(props.chatId);
      console.log(newChat);
      setChatObject(newChat);
    })();
  }, [props.chatId]);

  useEffect(() => {
    const newMessages = chatObject?.messages
      .reverse()
      .map((el) => <Message message={el} key={el._id} />);
    setMessages(newMessages);
  }, [chatObject?.messages]);

  const sendTextMessage = () => {
    if (!messageInputValue) return;

    sendMessage(props.chatId, messageInputValue);
    setMessageInputValue('');
  };

  if (!chatObject) return <></>;

  return (
    <div className={classes.container}>
      <div className={classes.userData}>
        <p>
          Nazwa:{' '}
          {localStorage.getItem('userId') === chatObject.members[0]._id
            ? chatObject.members[1].name
            : chatObject.members[0].name}
        </p>
      </div>
      <div className={classes.messages}>{messages}</div>
      <div className={classes.textInput}>
        <input
          type="text"
          value={messageInputValue}
          onChange={(event) => setMessageInputValue(event.target.value)}
        />
        <button onClick={sendTextMessage}>Wyślij</button>
      </div>
    </div>
  );
};

export default Chat;
