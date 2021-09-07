import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import { getMe } from '../../store/me/actions';
import { getUserById } from '../../store/user/actions';
import { getNextTenPosts } from '../../store/post/actions';

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
    // if ()
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log('moje posty \n', myPosts);
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
      {postsList}
    </div>
  );
};

export default ProfilePage;
