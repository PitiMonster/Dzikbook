import { useState, useEffect, useCallback } from 'react';

import classes from './index.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../hooks';

import { getAllUsersFriends } from '../../../../store/user/actions';
import { getChatById } from '../../../../store/chat/actions';

const FriendsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((store) => store.user._id) ?? '';
  const openedChatsId = useAppSelector((store) => store.chat.openedChatsId);

  const [friends, setFriends] = useState<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >[]
  >([]);

  const getUserFriends = useCallback(async () => {
    const friendships = await getAllUsersFriends(userId);
    setFriends(
      friendships.map((friendship) => (
        <li
          key={friendship._id}
          onClick={() => {
            console.log('siema otwieram');
            if (!openedChatsId.includes(friendship.chat))
              dispatch(getChatById(friendship.chat));
          }}
        >
          {`${friendship.friend.name} ${friendship.friend.surname}`}
        </li>
      ))
    );
  }, [userId, openedChatsId, dispatch]);

  useEffect(() => {
    if (userId) getUserFriends();
  }, [dispatch, userId, getUserFriends]);

  return (
    <div className={classes.container}>
      <h3>Znajomi</h3>
      <ul className={classes.friendsList}>{friends}</ul>
    </div>
  );
};

export default FriendsList;
