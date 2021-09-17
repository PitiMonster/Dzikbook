import React, { useEffect, useState, useRef } from 'react';

import {
  sendMessage,
  closeChatById,
} from '../../../../../../store/chat/actions';
import { Chat as ChatType } from '../../../../../../types';
import { useAppDispatch } from '../../../../../../hooks';
import Message from '../Message';

import classes from './index.module.scss';

const Chat: React.FC<{ chat: ChatType }> = (props) => {
  const dispatch = useAppDispatch();

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
      const newChat = props.chat;
      setChatObject(newChat);
    })();
  }, [props.chat]);

  useEffect(() => {
    if (!chatObject) return;
    const newMessages = [...chatObject!.messages]
      .reverse()
      .map((el) => <Message message={el} key={el._id} />);
    setMessages(newMessages);
  }, [chatObject]);

  const sendTextMessage = () => {
    if (!messageInputValue) return;

    sendMessage(props.chat._id, messageInputValue);
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
        <button onClick={() => dispatch(closeChatById(props.chat._id))}>
          Zamknij
        </button>
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
