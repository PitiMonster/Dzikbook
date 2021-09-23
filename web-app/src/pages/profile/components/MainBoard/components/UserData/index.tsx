import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './index.module.scss';

import { useAppSelector } from './../../../../../../hooks';

import {
  checkIfFriend,
  sendAquaintanceRequest,
} from '../../../../../../store/user/actions';

const UserData: React.FC = () => {
  const params = useParams<{ userId: string }>();

  const { userId } = params;

  const userProfileData = useAppSelector((store) => store.user);

  const [isFriend, setIsFriend] = useState<Boolean | string>("it's you");
  const [sendRequestBtnText, setSendRequestBtnText] = useState<string>('');
  const handleFriendButton = () => {
    if (sendRequestBtnText === 'Dodaj do znajomych') {
      sendAquaintanceRequest(userId);
      setSendRequestBtnText('Wysłano zaproszenie');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userId') !== userId) {
      (async () => {
        const isYourFriend = await checkIfFriend(userId);
        setIsFriend(isYourFriend);
        setSendRequestBtnText(isYourFriend ? 'Znajomi!' : 'Dodaj do znajomych');
      })();
    }
  }, [userId]);

  return (
    <div className={classes.container}>
      <h2>{`${userProfileData.name} ${userProfileData.surname}`}</h2>
      <h3>{`@${userProfileData.username}`}</h3>
      <p>{`__${userProfileData._id}`}</p>
      {isFriend !== "it's you" && (
        <button onClick={handleFriendButton}>{sendRequestBtnText}</button>
      )}
    </div>
  );
};

export default UserData;
