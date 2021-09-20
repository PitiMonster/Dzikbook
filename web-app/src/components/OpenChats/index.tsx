import { useEffect, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import classes from './Index.module.scss';

import ChatWindow from './components/ChatWindow';
import { closeChatById } from '../../store/chat/actions';

const OpenChats: React.FC = () => {
  const dispatch = useAppDispatch();

  type openedObjects = {
    [key: string]: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
  };
  const openedChats = useAppSelector((store) => store.chat.openedChats);
  const openedChatsId = useAppSelector((store) => store.chat.openedChatsId);

  const [openChatObjects, setOpenChatObjects] = useState<openedObjects>({});

  const updateOpenedChats = useCallback(
    (current: openedObjects) => {
      const newOpenedChats: {
        [key: string]: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >;
      } = {};
      Object.keys(openedChats).forEach(
        (el) => (newOpenedChats[el] = current[el])
      );
      newOpenedChats[openedChatsId[0]] = (
        <ChatWindow chat={openedChats[openedChatsId[0]]} />
      );
      if (openedChatsId.length === 4) {
        dispatch(closeChatById(openedChatsId[3]));
      }
      return newOpenedChats;
    },
    [openedChats, openedChatsId, dispatch]
  );

  useEffect(() => {
    setOpenChatObjects(updateOpenedChats);
  }, [openedChats, updateOpenedChats]);

  return (
    <div className={classes.container}>{Object.values(openChatObjects)}</div>
  );
};

export default OpenChats;
