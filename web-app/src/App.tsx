import { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import AuthPage from './pages/auth';
import MainPage from './pages/main';
import Layout from './layout';
import ProfilePage from './pages/profile';
import { useAppSelector, useAppDispatch } from './hooks';
import GuardRoute from './utils/guardRoute';

import {
  runSocket,
  setDispatch,
  runAppListeners,
  runAppEmitters,
} from './websockets';
import { getUserById } from './store/user/actions';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((store) => store.auth.isUserLoggedIn);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
      runSocket();
      setDispatch(dispatch);
      runAppListeners();
      runAppEmitters(userId);
    }
  }, [dispatch, userId]);

  return (
    <Switch>
      {!isUserLoggedIn && (
        <Route path="/" exact>
          <AuthPage />
        </Route>
      )}
      <Layout>
        {isUserLoggedIn && (
          <Route path="/" exact>
            <MainPage />
          </Route>
        )}
        <GuardRoute
          path="/:userId"
          exact={true}
          Component={ProfilePage}
          isPermitted={isUserLoggedIn}
        />
      </Layout>
    </Switch>
  );
};

export default App;
