import classes from './index.module.scss';

import UserData from './components/UserData';
import PostsList from './components/PostsList';

const MainBoard: React.FC = () => {
  return (
    <div className={classes.container}>
      <UserData />
      <PostsList />
    </div>
  );
};

export default MainBoard;
