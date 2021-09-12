import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import {
  getUserById,
  checkIfFriend,
  sendAquaintanceRequest,
  getReceivedRequests,
  answerAquaintanceRequest,
  getAllUsersFriends,
} from '../../store/user/actions';
import { chatActions } from '../../store/chat/slice';
import { getNextTenPosts } from '../../store/post/actions';
import { Request } from '../../types';
import OpenedChats from './components/OpenChats';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ userId: string }>();

  const { userId } = params;

  const userProfileData = useAppSelector((store) => store.user);
  const myPosts = useAppSelector((store) => store.post.cachedPosts);

  const [postsList, setPostsList] = useState<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[]
  >([]);

  const [isFriend, setIsFriend] = useState<Boolean | string>("it's you");
  const [friends, setFriends] = useState<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[]
  >([]);
  // TODO when diversify on separate components
  const [requestResponseInfo, setRequestResponseInfo] = useState<string>('');
  const [receivedRequests, setReceivedRequests] = useState<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[]
  >([]);

  useEffect(() => {
    const handleScrollToBottom = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        myPosts.length >= 10
      ) {
        window.removeEventListener('scroll', handleScrollToBottom);
        dispatch(getNextTenPosts(userId, myPosts.length));
      }
    };
    window.addEventListener('scroll', handleScrollToBottom);

    return () => {
      window.removeEventListener('scroll', handleScrollToBottom);
    };
  }, [dispatch, myPosts.length, userId]);

  useEffect(() => {
    if (myPosts) {
      const newPostsList = myPosts.map((post) => (
        <div key={post._id}>
          <h4>{`${post.author.name} ${post.author.surname}`}</h4>
          <p>{post.text}</p>
        </div>
      ));

      setPostsList(newPostsList);
    }
  }, [myPosts]);

  const createRequestsList = useCallback(
    (requests: Request[]) =>
      requests.map((request) => (
        <div key={request._id}>
          <p>Zaproszenie do znajomych od</p>
          <h4>{`${request.sender.name} ${request.sender.surname}`}</h4>
          {requestResponseInfo ? (
            <p>{requestResponseInfo}</p>
          ) : (
            <>
              <button
                onClick={() =>
                  handleAnswerAquaintanceRequest(request._id, 'accept')
                }
              >
                Akceptuj
              </button>
              <button
                onClick={() =>
                  handleAnswerAquaintanceRequest(request._id, 'reject')
                }
              >
                Odrzuć
              </button>
            </>
          )}
        </div>
      )),
    [requestResponseInfo]
  );

  const getUserRequests = useCallback(() => {
    if (localStorage.getItem('userId') !== userId) {
      (async () => {
        const isYourFriend = await checkIfFriend(userId);
        setIsFriend(isYourFriend);
      })();
    } else {
      (async () => {
        const requests = await getReceivedRequests();
        setReceivedRequests(createRequestsList(requests));
      })();
    }
  }, [createRequestsList, userId]);

  const getUserFriends = useCallback(async () => {
    const friendships = await getAllUsersFriends(userId);
    setFriends(
      friendships.map((friendship) => (
        <div
          key={friendship._id}
          onClick={() =>
            dispatch(chatActions.openChat({ chat: friendship.chat }))
          }
        >
          {`${friendship.friend.name} ${friendship.friend.surname}`}
        </div>
      ))
    );
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(getUserById(userId));
    getUserRequests();
    getUserFriends();
  }, [dispatch, userId, getUserRequests, getUserFriends]);

  const handleFriendButton = () => {
    if (!isFriend) {
      sendAquaintanceRequest(userId);
    }
  };

  const handleAnswerAquaintanceRequest = async (
    requestId: string,
    answer: string
  ) => {
    const response = await answerAquaintanceRequest(requestId, answer);
    console.log(response);
    switch (response) {
      case 'accepted':
        console.log('siema accepted');
        setRequestResponseInfo('Jesteście teraz znajomymi!');
        break;
      case 'rejected':
        setRequestResponseInfo('Zaproszenie odrzucone.');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <p>I oto mój profil</p>
      <p>{userProfileData._id}</p>
      <p>{userProfileData.name}</p>
      <p>{userProfileData.surname}</p>
      <p>{userProfileData.email}</p>
      <p>{userProfileData.username}</p>
      <p>{userProfileData.photos}</p>
      <p>{userProfileData.profilePhotos}</p>
      <p>{userProfileData.role}</p>
      {isFriend !== "it's you" && (
        <button onClick={handleFriendButton}>
          {isFriend ? 'Znajomy' : 'Dodaj do znajomych'}
        </button>
      )}
      {receivedRequests}
      {friends.length > 0 && (
        <>
          <h3>Znajomi</h3>
          {friends}
        </>
      )}
      <OpenedChats />
      {postsList}
    </div>
  );
};

export default ProfilePage;
