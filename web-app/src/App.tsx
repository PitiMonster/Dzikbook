import { Switch, Route, Link } from 'react-router-dom';

import AuthPage from './pages/auth';
import MainPage from './pages/main';
import ProfilePage from './pages/profile';
import { useAppSelector, useAppDispatch } from './hooks';
import GuardRoute from './utils/guardRoute';

import { runSocket, setDispatch } from './websockets';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((store) => store.auth.isUserLoggedIn);

  runSocket();
  setDispatch(dispatch);

  return (
    <Switch>
      {!isUserLoggedIn && (
        <Route path="/" exact>
          <AuthPage />
        </Route>
      )}
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
    </Switch>
  );
};

export default App;
