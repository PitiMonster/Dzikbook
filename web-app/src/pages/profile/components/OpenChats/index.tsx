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
  const chatsId = useAppSelector((store) => store.chat.openedChats);

  const [openChatObjects, setOpenChatObjects] = useState<openedObjects>({});

  const updateOpenedChats = useCallback(
    (current: openedObjects) => {
      const newOpenedChats: {
        [key: string]: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >;
      } = {};
      chatsId.forEach((el) => (newOpenedChats[el] = current[el]));
      newOpenedChats[chatsId[0]] = <ChatWindow chatId={chatsId[0]} />;
      return newOpenedChats;
    },
    [chatsId]
  );

  useEffect(() => {
    setOpenChatObjects(updateOpenedChats);
  }, [chatsId, updateOpenedChats]);

  return (
    <div className={classes.container}>{Object.values(openChatObjects)}</div>
  );
};

export default OpenChats;
