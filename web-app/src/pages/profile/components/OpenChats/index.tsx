import { useEffect, useState, useCallback } from 'react';
import { useAppSelector } from '../../../../hooks';
import classes from './Index.module.scss';

import ChatWindow from './components/ChatWindow';

const OpenChats: React.FC = () => {
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
      return newOpenedChats;
    },
    [openedChats, openedChatsId]
  );

  useEffect(() => {
    console.log('siema repeat');
    setOpenChatObjects(updateOpenedChats);
  }, [openedChats, updateOpenedChats]);

  return (
    <div className={classes.container}>{Object.values(openChatObjects)}</div>
  );
};

export default OpenChats;
