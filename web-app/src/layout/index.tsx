import classes from './index.module.scss';
import Navbar from '../components/Navbar';
import OpenChats from '../components/OpenChats';

const MainLayout: React.FC = (props) => {
  return (
    <div className={classes.container}>
      <Navbar />
      <OpenChats />
      {props.children}
    </div>
  );
};

export default MainLayout;
