import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { getMe } from '../../store/me/actions';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const myProfileData = useAppSelector((store) => store.me);
  const myPosts = useAppSelector((store) => store.post.cachedPosts);

  const [postsList, setPostsList] = useState<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[]
  >([]);

  useEffect(() => {
    if (!myProfileData.id) dispatch(getMe());
  }, [dispatch, myProfileData.id]);

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
      <p>{myProfileData.id}</p>
      <p>{myProfileData.name}</p>
      <p>{myProfileData.surname}</p>
      <p>{myProfileData.email}</p>
      <p>{myProfileData.username}</p>
      <p>{myProfileData.photos}</p>
      <p>{myProfileData.profilePhotos}</p>
      <p>{myProfileData.role}</p>
      {postsList}
    </div>
  );
};

export default ProfilePage;
