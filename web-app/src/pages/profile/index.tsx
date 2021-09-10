import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import {
  getUserById,
  checkIfFriend,
  sendAquaintanceRequest,
  getReceivedRequests,
  answerAquaintanceRequest,
} from '../../store/user/actions';
import { getNextTenPosts } from '../../store/post/actions';
import { Request } from '../../types';

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
    dispatch(getUserById(userId));
    if (localStorage.getItem('userId') !== userId) {
      (async () => {
        const isYourFriend = await checkIfFriend(userId);
        setIsFriend(isYourFriend);
      })();
    } else {
      (async () => {
        const requests = await getReceivedRequests();
        console.log('siema elo byq');
        console.log(requests);

        setReceivedRequests(createRequestsList(requests));
      })();
    }
  }, [dispatch, userId]);

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

  const createRequestsList = (requests: Request[]) =>
    requests.map((request) => {
      return (
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
      );
    });

  return (
    <div>
      <p>I oto mój profil</p>
      <p>{userProfileData.id}</p>
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
      {postsList}
    </div>
  );
};

export default ProfilePage;
