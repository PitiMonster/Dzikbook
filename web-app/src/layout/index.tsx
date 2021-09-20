import classes from './index.module.scss';
import Navbar from '../components/Navbar';
import MainPage from '../pages/main';

const MainLayout: React.FC = (props) => {
  return (
    <div className={classes.container}>
      <Navbar />
      {props.children}
    </div>
  );
};

export default MainLayout;
