import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { getMe } from '../../store/me/actions';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const myProfileData = useAppSelector((store) => store.me);
  useEffect(() => {
    if (!myProfileData.id) dispatch(getMe());
  }, [dispatch, myProfileData.id]);
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
    </div>
  );
};

export default ProfilePage;
