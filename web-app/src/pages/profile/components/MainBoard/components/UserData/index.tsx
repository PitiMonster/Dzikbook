import classes from './index.module.scss';

import { useAppSelector } from './../../../../../../hooks';

const UserData: React.FC = () => {
  const userProfileData = useAppSelector((store) => store.user);

  return (
    <div className={classes.container}>
      <h2>{`${userProfileData.name} ${userProfileData.surname}`}</h2>
      <h3>{`@${userProfileData.username}`}</h3>
      <p>{`__${userProfileData._id}`}</p>
    </div>
  );
};

export default UserData;
